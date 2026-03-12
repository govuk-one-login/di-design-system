async function useSpinner(containerId, pollingFunction, successFunction, errorFunction) {
    const element = document.getElementById(containerId);
    if (element && element instanceof HTMLDivElement) {
        let spinner;
        try {
            spinner = new Spinner(element, pollingFunction, successFunction, errorFunction);
        }
        catch (e) {
            const errorText = document.createElement("p");
            errorText.textContent = "Error configuring spinner: " + e;
            element.replaceChildren(errorText);
            return;
        }
        await spinner.init();
    }
    else {
        console.error(`Attempting to initiate a spinner on a page with no '#${containerId}' div element.`);
    }
}
var PollResult;
(function (PollResult) {
    PollResult[PollResult["Success"] = 0] = "Success";
    PollResult[PollResult["Failure"] = 1] = "Failure";
    PollResult[PollResult["Pending"] = 2] = "Pending";
    PollResult[PollResult["Backoff"] = 3] = "Backoff";
})(PollResult || (PollResult = {}));
var SpinnerState;
(function (SpinnerState) {
    SpinnerState[SpinnerState["Waiting"] = 0] = "Waiting";
    SpinnerState[SpinnerState["LongWaiting"] = 1] = "LongWaiting";
    SpinnerState[SpinnerState["Error"] = 2] = "Error";
    SpinnerState[SpinnerState["Complete"] = 3] = "Complete";
})(SpinnerState || (SpinnerState = {}));
class Spinner {
    constructor(domContainer, pollingFunction, onSuccess, onError) {
        this.state = SpinnerState.Waiting;
        this.backOffCount = 0;
        this.handleAbort = () => {
            this.abortController.abort();
        };
        this.initTimer = (initTime) => {
            this.updateDomTimer = setInterval(() => {
                this.updateStateAccordingToTimeElapsed(initTime);
                this.updateDom();
            }, this.config.msBetweenDomUpdate);
        };
        this.reflectSuccess = () => {
            this.state = SpinnerState.Complete;
            sessionStorage.removeItem("spinnerInitTime");
        };
        this.reflectError = () => {
            this.state = SpinnerState.Error;
            sessionStorage.removeItem("spinnerInitTime");
            this.abortController.abort();
        };
        this.updateStateAccordingToTimeElapsed = (initTime) => {
            const elapsedMilliseconds = Date.now() - initTime;
            if (this.hasCompleted()) {
                // If we've already finished waiting then there's no need to update again.
                return;
            }
            if (elapsedMilliseconds >= this.config.msBeforeAbort) {
                this.reflectError();
            }
            else if (elapsedMilliseconds >= this.config.msBeforeInformingOfLongWait) {
                this.reflectLongWait();
            }
        };
        this.updateDom = () => {
            if (this.hasCompleted()) {
                // We've reached an end state so stop updating the DOM after this
                clearInterval(this.updateDomTimer);
            }
            if (this.displayState === this.state) {
                // No need to update anything
                return;
            }
            this.displayState = this.state;
            const newElementsToDisplay = [];
            switch (this.displayState) {
                case SpinnerState.Waiting:
                    newElementsToDisplay.push(this.createSpinnerElement(""));
                    this.cloneAndAddIfExists(newElementsToDisplay, this.waitContent);
                    break;
                case SpinnerState.LongWaiting:
                    newElementsToDisplay.push(this.createSpinnerElement(""));
                    this.cloneAndAddIfExists(newElementsToDisplay, this.longWaitContent);
                    break;
                case SpinnerState.Complete:
                    newElementsToDisplay.push(this.createSpinnerElement("spinner__finished"));
                    this.cloneAndAddIfExists(newElementsToDisplay, this.successContent);
                    break;
                case SpinnerState.Error:
                    if (!this.config.hideSpinnerOnError) {
                        newElementsToDisplay.push(this.createSpinnerElement("spinner__finished"));
                    }
                    this.cloneAndAddIfExists(newElementsToDisplay, this.errorContent);
                    break;
            }
            this.visibleElementsContainer.replaceChildren(...newElementsToDisplay);
            if (this.displayState === SpinnerState.Complete) {
                if (this.onSuccess) {
                    this.onSuccess();
                }
                this.updateAriaAlert(this.config.ariaAlertCompletionText);
            }
            if (this.displayState === SpinnerState.Error && !!this.onError) {
                this.onError();
            }
        };
        this.container = domContainer;
        this.pollingFunction = pollingFunction;
        if (!pollingFunction) {
            throw new Error("Polling function must be provided");
        }
        this.onSuccess = onSuccess;
        this.onError = onError;
        this.noJsContent = this.getElementOrThrow("no-js-content");
        this.noJsContent.style.display = "none";
        this.waitContent =
            this.container.querySelector("#wait-content") || undefined;
        this.longWaitContent =
            this.container.querySelector("#long-wait-content") || undefined;
        this.successContent =
            this.container.querySelector("#success-content") || undefined;
        this.errorContent =
            this.container.querySelector("#error-content") || undefined;
        if (!this.successContent && !onSuccess) {
            throw new Error("One of success-content or successFunction must be provided");
        }
        if (!this.errorContent && !onError) {
            throw new Error("One of error-content or errorFunction must be provided");
        }
        this.config = this.getConfig(this.container);
        this.visibleElementsContainer = document.createElement("div");
        this.container.appendChild(this.visibleElementsContainer);
        this.ariaLiveContainer = this.createAriaLiveContainer();
        this.container.appendChild(this.ariaLiveContainer);
        this.abortController = this.createAbortController();
    }
    async init() {
        const initTime = this.getInitTime();
        this.updateStateAccordingToTimeElapsed(initTime);
        this.updateDom();
        this.initTimer(initTime);
        await this.callPollingFunction(initTime);
    }
    getElementOrThrow(elementId) {
        const element = this.container.querySelector(`#${elementId}`);
        if (element === null || !(element instanceof HTMLElement)) {
            throw new Error(`HTML Element with id ${elementId} must be provided`);
        }
        return element;
    }
    getConfig(element) {
        return {
            msBeforeInformingOfLongWait: element.dataset.msBeforeInformingOfLongWait
                ? parseInt(element.dataset.msBeforeInformingOfLongWait)
                : 5000,
            msBeforeAbort: element.dataset.msBeforeAbort
                ? parseInt(element.dataset.msBeforeAbort)
                : 30000,
            msBetweenRequests: element.dataset.msBetweenRequests
                ? parseInt(element.dataset.msBetweenRequests)
                : 2000,
            msBetweenDomUpdate: element.dataset.msBetweenDomUpdate
                ? parseInt(element.dataset.msBetweenDomUpdate)
                : 1000,
            ariaAlertCompletionText: element.dataset.ariaAlertCompletionText
                ? element.dataset.ariaAlertCompletionText
                : undefined,
            hideSpinnerOnError: element.dataset.hideSpinnerOnError
                ? (element.dataset.hideSpinnerOnError === 'true')
                : false,
            maxBackoffTries: element.dataset.maxBackoffTries
                ? parseInt(element.dataset.maxBackoffTries)
                : 3,
        };
    }
    createAbortController() {
        const abortController = new AbortController();
        window.removeEventListener("beforeunload", this.handleAbort);
        window.addEventListener("beforeunload", this.handleAbort);
        return abortController;
    }
    getInitTime() {
        const storedSpinnerInitTime = sessionStorage.getItem("spinnerInitTime");
        let spinnerInitTime;
        if (storedSpinnerInitTime === null) {
            spinnerInitTime = Date.now();
            sessionStorage.setItem("spinnerInitTime", spinnerInitTime.toString());
        }
        else {
            spinnerInitTime = parseInt(storedSpinnerInitTime, 10);
        }
        return spinnerInitTime;
    }
    hasCompleted() {
        return (this.state === SpinnerState.Error || this.state === SpinnerState.Complete);
    }
    reflectLongWait() {
        if (!this.hasCompleted()) {
            this.state = SpinnerState.LongWaiting;
        }
    }
    createSpinnerElement(spinnerStateClass) {
        const spinner = document.createElement("div");
        spinner.id = "spinner";
        spinner.classList.add("spinner", "centre");
        if (spinnerStateClass) {
            spinner.classList.add(spinnerStateClass);
        }
        return spinner;
    }
    cloneAndAddIfExists(list, element) {
        if (element) {
            const cloned = element.cloneNode(true);
            cloned.style.display = "";
            cloned.removeAttribute("id");
            list.push(cloned);
        }
    }
    async callPollingFunction(initTime) {
        if (Date.now() - initTime >= this.config.msBeforeAbort) {
            return;
        }
        await this.pollingFunction(this.abortController.signal)
            .then((response) => {
            if (response === PollResult.Success) {
                this.reflectSuccess();
            }
            else if (response === PollResult.Failure) {
                this.reflectError();
            }
            else if (!this.hasCompleted()) {
                let timeToNextPoll = this.config.msBetweenRequests;
                if (response === PollResult.Backoff) {
                    this.backOffCount++;
                    if (this.backOffCount > this.config.maxBackoffTries) {
                        this.reflectError();
                        return;
                    }
                    timeToNextPoll = this.calculateBackoffTime(this.backOffCount);
                }
                else {
                    this.backOffCount = 0;
                }
                setTimeout(async () => {
                    if (Date.now() - initTime >= this.config.msBeforeAbort) {
                        return;
                    }
                    await this.callPollingFunction(initTime);
                }, timeToNextPoll);
            }
        })
            .catch((error) => {
            if (error.name !== "AbortError") {
                console.error("Error in polling function: ", error);
                this.reflectError();
            }
        })
            .finally(() => {
            this.updateDom();
        });
    }
    calculateBackoffTime(backOffCount) {
        const extraDelay = Math.pow(2, backOffCount - 2) * this.config.msBetweenRequests;
        return this.config.msBetweenRequests + extraDelay;
    }
    createAriaLiveContainer() {
        // For the Aria alert to work reliably we need to create its container once and then update the contents
        // https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/
        const container = document.createElement("div");
        container.setAttribute("aria-live", "assertive");
        container.classList.add("govuk-visually-hidden");
        return container;
    }
    updateAriaAlert(messageText) {
        if (messageText) {
            while (this.ariaLiveContainer.firstChild) {
                this.ariaLiveContainer.removeChild(this.ariaLiveContainer.firstChild);
            }
            /* Create new message and append it to the live region */
            const messageNode = document.createTextNode(messageText);
            this.ariaLiveContainer.appendChild(messageNode);
        }
    }
}

const DEFAULT_ERROR_TIMEOUT = 10000; // 10 seconds
function initialiseProgressButtons(document = window.document, customErrorTimeout) {
    // Create a single live region for button status announcements
    const statusRegion = document.createElement('div');
    statusRegion.setAttribute('aria-live', 'assertive');
    statusRegion.setAttribute('role', 'status');
    statusRegion.className = 'govuk-visually-hidden';
    document.body.appendChild(statusRegion);
    const progressButtons = Array.prototype.slice.call(document.querySelectorAll('[data-frontendui="di-progress-button"]'));
    function findClosestForm(element) {
        let el = element;
        while (el && el.nodeName !== 'FORM') {
            el = el.parentElement;
        }
        return el;
    }
    progressButtons.forEach(function (button) {
        const form = findClosestForm(button);
        let isSubmitting = false;
        // Handle spacebar press for anchor tags
        if (button.tagName.toLowerCase() === 'a') {
            button.addEventListener('keydown', function (event) {
                if (event.code === 'Space') {
                    event.preventDefault();
                    button.click();
                }
            });
        }
        button.addEventListener('click', function (event) {
            if (isSubmitting) {
                event.preventDefault();
                return;
            }
            const waitingText = button.getAttribute('data-waiting-text');
            const longWaitingText = button.getAttribute('data-long-waiting-text');
            const errorPage = button.getAttribute('data-error-page');
            if (button.hasAttribute('data-error-timeout')) {
                customErrorTimeout = parseInt(button.getAttribute('data-error-timeout'));
            }
            const isInput = button.tagName.toLowerCase() === 'input';
            if (!waitingText || !longWaitingText || !errorPage) {
                console.error('Progress button is missing required data attributes.');
                return;
            }
            isSubmitting = true;
            // Always handle the button click, regardless of form presence
            handleProgressButtonClick(button, waitingText, longWaitingText, errorPage, isInput, customErrorTimeout || DEFAULT_ERROR_TIMEOUT);
            // If no form, we're done. If there is a form, the form submit handler will take over
            if (!form) {
                return;
            }
            // For form buttons, let the click propagate to trigger form submission
        });
        if (form) {
            form.addEventListener('submit', function (event) {
                // The button click handler has already set isSubmitting and handled the button state
                if (isSubmitting) {
                    // Allow the first submission, prevent subsequent ones
                    if (event.target === form && event.submitter === button) {
                        return; // Allow the first submission to proceed
                    }
                    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
                    return;
                }
                // If the form is submitted through another method (not our button),
                // prevent double submission but don't show progress state
                isSubmitting = true;
            });
        }
    });
}
function handleProgressButtonClick(element, waitingText, longWaitingText, errorPage, isInput, errorTimeoutDuration = DEFAULT_ERROR_TIMEOUT) {
    var originalText = isInput && element instanceof HTMLInputElement ? element.value : element.innerText;
    const statusRegion = document.querySelector('.govuk-visually-hidden[role="status"]');
    if (typeof element.blur === 'function') {
        element.blur();
    }
    element.setAttribute('data-prevent-double-click', 'true');
    if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) {
        // When the button is disabled immediately it prevents the initial form submission.
        // TODO: We should revisit this. It would be better to trigger the button actions from the form submission rather than the button click when a form is present.
        setTimeout(() => {
            element.disabled = true;
        }, 0);
    }
    else if (element.tagName.toLowerCase() === 'a') {
        element.setAttribute('aria-disabled', 'true');
        element.style.pointerEvents = 'none';
    }
    element.classList.add('govuk-progress-button--disabled');
    var classes = element.className.split(' ');
    if (classes.indexOf('govuk-button--progress-loading') === -1) {
        classes.push('govuk-button--progress-loading');
        element.className = classes.join(' ');
    }
    if (isInput && element instanceof HTMLInputElement) {
        element.value = waitingText;
    }
    else {
        element.innerText = waitingText;
    }
    // Announce the initial waiting state
    if (statusRegion) {
        statusRegion.textContent = waitingText;
    }
    var longWaitTimeout = window.setTimeout(function () {
        if (isInput && element instanceof HTMLInputElement) {
            element.value = longWaitingText;
        }
        else {
            element.innerText = longWaitingText;
        }
        // Announce the long wait state
        if (statusRegion) {
            statusRegion.textContent = longWaitingText;
        }
    }, 5000);
    var errorTimeout = window.setTimeout(function () {
        window.location.href = errorPage;
    }, errorTimeoutDuration);
    function resetButton() {
        var classes = element.className.split(' ');
        var loadingIndex = classes.indexOf('govuk-button--progress-loading');
        if (loadingIndex !== -1) {
            classes.splice(loadingIndex, 1);
            element.className = classes.join(' ');
        }
        if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement) {
            element.disabled = false;
        }
        else if (element.tagName.toLowerCase() === 'a') {
            element.removeAttribute('aria-disabled');
            element.style.pointerEvents = '';
        }
        element.classList.remove('govuk-progress-button--disabled');
        element.setAttribute('data-prevent-double-click', 'false');
        if (isInput && element instanceof HTMLInputElement) {
            element.value = originalText;
        }
        else {
            element.innerText = originalText;
        }
        // Clear status region without announcement
        const statusRegion = document.querySelector('.govuk-visually-hidden[role="status"]');
        if (statusRegion) {
            statusRegion.textContent = '';
        }
        window.clearTimeout(errorTimeout);
        window.clearTimeout(longWaitTimeout);
    }
    element.resetProgressButton = resetButton;
    return resetButton;
}

export { PollResult, initialiseProgressButtons, useSpinner };

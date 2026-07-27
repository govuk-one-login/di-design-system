---
layout: component-detail
title: Progress button
description: Help users understand that they need to wait for something to finish happening.
componentMacro: progress-button
exampleUrl: /progress-button/example/
htmlCode: |
  &lt;a href="#" role="button" draggable="false" class="govuk-button govuk-button--progress" data-module="govuk-button" data-frontendui="di-progress-button" data-waiting-text="Wait" data-long-waiting-text="Keep waiting" data-error-page="/error"&gt;
    Continue
  &lt;/a&gt;
nunjucksCode: |
  {% from 'build/components/progress-button/macro.njk' import frontendUiProgressButton %}
  {{ frontendUiProgressButton({
    translations: {
      text: 'Continue',
      waitingText: 'Wait',
      longWaitingText: 'Keep waiting',
      noJavascriptMessage: 'JavaScript is required to use this service.'
    },
    href: '#',
    errorPage: '/error'
  }) }}
figmaUrl: "#"
navLabel: Components
sideNav:
  - text: Progress button
    active: true
  - text: Component name 2
    href: "#"
  - text: Component name 3
    href: "#"
---

## When to use this component

Use this component when there is more than a 2 second delay between the user clicking a button and seeing the result, such as a page loading.

**2 seconds is a short delay, so use this component with care.** Overusing it, especially on standard transactional steps, can make the service feel slower than it really is. This component is better suited to things like submitting information to an external API or performing a short backend process.

## When not to use this component

Try to make your service respond quickly, so you don't need to use a progress button.

Do not use this component when the user needs to take further action, such as checking their email, opening another app, or retrieving a security code. The progress button is only for situations where the user is expected to wait, not when they need to do something else.

Do not use this component when there is less than a 2 second delay between the user clicking a button and seeing the result. Users may notice a brief delay, but they stay focused and do not need reassurance. Using a progress button here can confuse the user or make the service feel slower than it is.

Do not use this component when there is more than a 10 second delay between the user clicking a button and seeing the result. After about 10 seconds, the average attention span is maxed out and users don't retain enough short-term memory to easily continue when the result appears. Focus on reducing that time, or use another technique – for example, showing determinate progress on an interstitial page or allowing the user to continue and be notified when the action is complete.

## How it works

A progress button gives users immediate, contextual feedback after they click. It helps reassure them that something is happening and reduces the risk of repeated submissions.

The component builds on the default GOV.UK Button to show an active loading state when clicked.

After a user clicks the button:

- The button changes to <span class="app-colour-chip">govuk-colour("dark-grey") (#505a5f)</span> to keep the user's focus
- A spinner appears to indicate that something is happening
- The button text updates at specific points to reassure something is still happening:

<table class="govuk-table">
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Response time</th>
      <th scope="col" class="govuk-table__header">Button text</th>
      <th scope="col" class="govuk-table__header">Welsh translation of button text</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">0.1 seconds</th>
      <td class="govuk-table__cell">Wait</td>
      <td class="govuk-table__cell">Aros</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">5 seconds</th>
      <td class="govuk-table__cell">Keep waiting</td>
      <td class="govuk-table__cell">Parhau i aros</td>
    </tr>
  </tbody>
</table>

When the loading state appears, the updated text focuses on reassuring the user that the action is still happening, rather than repeating or explaining it. This reassurance is also announced by screen readers as the button text updates.

## Accessibility

Example section...

## Technical guidance

Example section...

## Research on this component

Example section...

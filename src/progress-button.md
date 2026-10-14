---
layout: component-detail
title: Progress button
description: Help users understand that they need to wait. Builds on the [Button component](https://design-system.service.gov.uk/components/button/) from the GOV.UK Design System.

If a user does not have Javascript enabled, the standard Button component is shown. Body copy helps those users understand they need to wait.
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
  - text: Toggle to Welsh
    href: /toggle-to-welsh/
  - text: Component name 2
    href: "#"
  - text: Component name 3
    href: "#"
---

## When to use this component

Use this component when the user has to wait more than 2 seconds and less than 10 seconds for something to happen after selecting a button.

This will usually be for things like:
* the system submitting information to an external API
* a short backend process like a fraud check

## When not to use this component

Use this component sparingly. Using it on standard transactional steps can make the service feel slower than it really is.

It’s better to make your service respond quickly so that you do not need a progress button.

### If the user needs to do something else away from the page

The progress button is only for situations where the user is expected to stay on the page and wait.

Do not use a progress button if the user needs to go and do something else like:
* check their email
* open another app
* get a security code

### If the user has to wait less than 2 seconds

Do not use this component if the user has to wait less than 2 seconds, because:

* users usually stay on the page and do not need reassurance if the wait is less than 2 seconds
* a progress button before 2 seconds could make the service feel slower than it is

### If the user has to wait more than 10 seconds
The progress button is not designed for long or uncertain waits.

Do not use this component if the user has to wait more than 10 seconds for something to happen.

After 10 seconds:
* the user’s attention starts to drift or their memory of what they were doing fades
* people tend to question if the service is still working

This means that with longer waits it’s better to reduce the waiting time, if you can.

If that’s not possible, communicate progress in other ways such as:
* a new page that explains things to the user with clear next steps
* letting users continue and sending them an account or email notification later

## How it works

The progress button reassures users that something is happening and makes them more likely to keep waiting.

It builds on the Button component from the GOV.UK Design System to show that something is loading or processing.

After a user selects the button the:
* button changes colour and a spinner appears
* button text updates to **Wait** to reassure the user something is still happening, and updates again after 5 seconds to **Keep waiting** if they need to wait longer

<table class="govuk-table">
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Response time</th>
      <th scope="col" class="govuk-table__header">Button text</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">0.1 seconds</th>
      <td class="govuk-table__cell">Wait</td>
    </tr>
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">5 seconds</th>
      <td class="govuk-table__cell">Keep waiting</td>
    </tr>
  </tbody>
</table>

The button colour is <span class="app-colour-chip">govuk-colour("dark-grey") (#505a5f)</span> which has high colour contrast with white text, making it more accessible.

Users who cannot see the colour changes, but can see the text, will be able to get information from the button text changes.

Screen readers should announce the button text updates.

### If users try to send information more than once

Sometimes users select buttons more than once, for reasons outlined in the GOV.UK Design System [Button component](https://design-system.service.gov.uk/components/button/).

You can configure the progress button to ignore multiple clicks by setting **data-prevent-double-click** to **true** as described in the Design System.

### If a user does not have JavaScript enabled

The progress button uses JavaScript. A standard [Button component](https://design-system.service.gov.uk/components/button/) is shown if a user does not have JavaScript enabled.

Add body copy above the button to help non-JavaScript users understand they need to wait, and for how long.

## Research on this component

Research into progress indicators in public and private sector services found that the most important thing is to provide users with appropriate feedback about the delay.

### Known issues and gaps

This component still needs to be fully tested for accessibility.

Screen readers should pick up the button text updates automatically if the button remains in focus.

However, we need to understand whether screen readers reliably announce the button text updates in all assistive technology and browser combinations.

If screen readers do not always announce the button text, we may need to explore using ARIA live regions or other techniques.

We also need to test the spinner when users have **prefers-reduced-motion** enabled and decide whether to adapt how the component works for those users.

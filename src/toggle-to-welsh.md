---
layout: component-detail
title: Toggle to Welsh
description: Let users change the language used in a service from English to Welsh and from Welsh to English.
componentMacro: language-select
exampleUrl: /toggle-to-welsh/example/
htmlCode: |
  &lt;nav class="language-select" aria-label="Language switcher" role="navigation"&gt;
    &lt;ul class="govuk-list language-select__list govuk-body-s govuk-!-margin-0" role="list"&gt;
      &lt;li class="language-select__list-item" role="listitem"&gt;
        &lt;span aria-current="true"&gt;English&lt;/span&gt;
      &lt;/li&gt;
      &lt;li class="language-select__list-item" role="listitem"&gt;
        &lt;a class="govuk-link govuk-link--no-visited-state" href="?lng=cy" rel="alternate" hreflang="cy" lang="cy"&gt;Cymraeg&lt;span class="govuk-visually-hidden"&gt;Newid yr iaith ir Gymraeg&lt;/span&gt;&lt;/a&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;
nunjucksCode: |
  {% from 'build/components/language-select/macro.njk' import frontendUiLanguageSelect %}
  {{ frontendUiLanguageSelect({
    translations: {
      ariaLabel: 'Language switcher'
    },
    activeLanguage: 'en',
    url: currentUrl
  }) }}
figmaUrl: "#"
navLabel: Components
sideNav:
  - text: Progress button
    href: /progress-button/
  - text: Toggle to Welsh
    active: true
  - text: Component name 2
    href: "#"
  - text: Component name 3
    href: "#"
---

## When to use this component

Example section...

## When not to use this component

Example section...

## How it works

Example section...

## Accessibility

Example section...

## Technical guidance

Example section...

## Research on this component

Example section...

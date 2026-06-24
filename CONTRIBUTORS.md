# Contributors

Thank you to everyone who has contributed to the GDS Design System.

## How to contribute

We welcome contributions from the community. If you have a question, idea or suggestion, please get in touch through Slack or open an issue on [GitHub](https://github.com/govuk-one-login/di-design-system/issues).

### Submitting changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

### Code style

- Follow the existing code conventions
- Ensure all tests pass before submitting (`npm test`)
- Keep pull requests focused on a single change

### How to add pages

- In the `src` folder create a `.md` file with the title of the page and layout
- Create a new page with the following template:

```md
---
layout: component-detail
title: Progress button
description: Help users understand that they need to wait for something to finish happening.
componentMacro: progress-button
exampleUrl: /progress-button/example/
htmlCode: '<button class="govuk-button">Continue</button>'
nunjucksCode: "{{ govukButton({ text: 'Continue' }) }}"
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

[your content goes here]
```

## Contributors list

<!-- Add contributors below in alphabetical order -->

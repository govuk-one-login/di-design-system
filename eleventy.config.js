import { govukEleventyPlugin } from "@x-govuk/govuk-eleventy-plugin";
import path from "node:path";

export default function (eleventyConfig) {
  const appRoot = process.cwd();

  eleventyConfig.addWatchTarget("./node_modules/@govuk-one-login/frontend-ui/");

  eleventyConfig.addPlugin(govukEleventyPlugin, {
    serviceName: "One Login",
    titleSuffix: "GDS Design System | GOV.UK One Login",
    homeKey: "Home",
    header: {
      productName: "One Login",
    },
    stylesheets: [
      "/assets/application.css",
      "/assets/app-restyle.css",
      "/assets/frontend-ui.css",
    ],
    serviceNavigation: {
      serviceName: "Design hub",
      navigation: [
        { text: "Components", href: "/components/" },
        // { text: "Patterns", href: "/patterns/" },
      ],
    },
    footer: {
      meta: {
        items: [{ text: "Accessibility statement", href: "https://signin.account.gov.uk/accessibility-statement" }],
      },
    },
  });

  eleventyConfig.addGlobalData("htmlClasses", "govuk-template--rebranded");

  eleventyConfig.addPassthroughCopy({
    "node_modules/@govuk-one-login/frontend-ui/build/esm/frontend/index.js":
      "assets/frontend-ui.js",
    "node_modules/@govuk-one-login/frontend-ui/build/all.css":
      "assets/frontend-ui.css",
  });

  eleventyConfig.on("eleventy.config", (cfg) => {
    const njkLib = cfg.userConfig?.libraryOverrides?.njk;
    if (njkLib?.loaders?.[0]?.searchPaths) {
      njkLib.loaders[0].searchPaths.push(
        path.join(appRoot, "node_modules/@govuk-one-login/frontend-ui"),
        path.join(
          appRoot,
          "node_modules/@x-govuk/govuk-eleventy-plugin/node_modules/govuk-frontend/dist",
        ),
      );
    }
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      layouts: "_layouts",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

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
      serviceUrl: "/",
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
    "node_modules/@x-govuk/govuk-eleventy-plugin/node_modules/govuk-frontend/dist/govuk/assets/images/favicon.svg":
      "assets/images/favicon.svg",
    "node_modules/@x-govuk/govuk-eleventy-plugin/node_modules/govuk-frontend/dist/govuk/assets/images/favicon.ico":
      "assets/images/favicon.ico",
  });

  eleventyConfig.on("eleventy.config", (cfg) => {
    const njkLib = cfg.userConfig?.libraryOverrides?.njk;
    if (njkLib?.addGlobal) {
      // Stand-in for the frontend-ui middleware helper, so components
      // that build language-switch URLs can render as static examples
      njkLib.addGlobal("addLanguageParam", (code, url) => {
        const base = url || "";
        return `${base}${base.includes("?") ? "&" : "?"}lng=${code}`;
      });
    }
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

  // Transform rendered markdown HTML into a GOV.UK accordion.
  // Only <h2> sections whose id is a single letter (a-z) become accordion drawers.
  // Content before the first letter <h2> renders as a preamble.
  // The first <h2> that is NOT a single letter (e.g. "Words to avoid") ends the
  // accordion; from that point onward content renders plainly after it.
  eleventyConfig.addFilter("accordionify", (html) => {
    if (!html) return "";
    const h2Re = /<h2\b[^>]*>[\s\S]*?<\/h2>/g;
    const matches = [];
    let m;
    while ((m = h2Re.exec(html)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, tag: m[0] });
    }
    if (matches.length === 0) return html;

    const isLetter = (tag) => {
      const idMatch = tag.match(/\bid="([^"]+)"/);
      return idMatch ? /^[a-z]$/i.test(idMatch[1]) : false;
    };

    // Find the first h2 that is NOT a single letter — that's where the
    // accordion stops and plain content takes over.
    let stopIndex = matches.length;
    for (let i = 0; i < matches.length; i++) {
      if (!isLetter(matches[i].tag)) {
        stopIndex = i;
        break;
      }
    }

    const letterSections = matches.slice(0, stopIndex);
    const preamble = html.slice(0, matches[0].start);
    const postamble =
      stopIndex < matches.length ? html.slice(matches[stopIndex].start) : "";

    let output = preamble;

    if (letterSections.length > 0) {
      output +=
        '\n<div class="govuk-accordion" data-module="govuk-accordion" id="accordion-style-guide">\n';

      for (let i = 0; i < letterSections.length; i++) {
        const { tag, end } = letterSections[i];
        const next = letterSections[i + 1] || matches[stopIndex];
        const sectionEnd = next ? next.start : html.length;
        const body = html.slice(end, sectionEnd);

        const idMatch = tag.match(/\bid="([^"]+)"/);
        const headingTextMatch = tag.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/);
        const id = idMatch ? idMatch[1] : `section-${i + 1}`;
        const headingText = headingTextMatch
          ? headingTextMatch[1]
          : `Section ${i + 1}`;

        output += `  <div class="govuk-accordion__section">\n`;
        output += `    <div class="govuk-accordion__section-header">\n`;
        output += `      <h2 class="govuk-accordion__section-heading">\n`;
        output += `        <span class="govuk-accordion__section-button" id="accordion-style-guide-heading-${id}">${headingText}</span>\n`;
        output += `      </h2>\n`;
        output += `    </div>\n`;
        output += `    <div id="accordion-style-guide-content-${id}" class="govuk-accordion__section-content">\n`;
        output += body;
        output += `    </div>\n`;
        output += `  </div>\n`;
      }

      output += "</div>\n";
    }

    output += postamble;
    return output;
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

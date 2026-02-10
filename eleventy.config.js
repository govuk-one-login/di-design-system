import { govukEleventyPlugin } from "@x-govuk/govuk-eleventy-plugin";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(govukEleventyPlugin, {
    serviceName: "Design System",
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

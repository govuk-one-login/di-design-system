import { govukEleventyPlugin } from "@x-govuk/govuk-eleventy-plugin";

export default function (eleventyConfig) {
  // Register the plugin
  eleventyConfig.addPlugin(govukEleventyPlugin);

  return {
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      // The folder where all your content will live:
      input: "docs",
    },
  };
}

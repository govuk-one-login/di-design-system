import { govukEleventyPlugin } from "@x-govuk/govuk-eleventy-plugin";
// import __dirname from "node:__dirname";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(govukEleventyPlugin, {
    serviceName: "Design System",
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      layouts: "./_includes/base.njk",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

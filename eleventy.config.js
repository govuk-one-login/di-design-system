import { govukEleventyPlugin } from "@x-govuk/govuk-eleventy-plugin";
// import __dirname from "node:__dirname";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(govukEleventyPlugin, {
    serviceName: "One Login",
    homeKey: "Home",
    header: {
      productName: "One Login",
      // search: { indexPath: "/search.json" },
    },
    serviceNavigation: {
      serviceUrl: "/",
      // search: {
      //   indexPath: "/search-index.json",
      //   sitemapPath: "/sitemap",
      // },
      navigation: [
        {
          text: "Get started",
          href: "/get-started/",
        },
        {
          text: "Features",
          href: "/features/",
        },
        {
          text: "Layouts",
          href: "/layouts/",
        },
      ],
    },
  });

  return {
    dir: {
      input: "src/index.njk",
      output: "docs",
      layouts: "_layouts",
      includes: "../node_modules/@x-govuk/govuk-eleventy-plugin/layouts",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

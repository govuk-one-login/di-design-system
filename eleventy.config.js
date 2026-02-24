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
          text: "Design hub",
          href: "/",
        },
        {
          text: "Components",
          href: "/components/",
        },
        {
          text: "Patterns",
          href: "/patterns/",
        },
      ],
    },
  });

  return {
    dir: {
      input: "src",
      output: "docs",
      layouts: "_layouts",
      includes: "../node_modules/@x-govuk/govuk-eleventy-plugin/layouts",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

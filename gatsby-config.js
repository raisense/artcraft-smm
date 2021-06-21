require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "artcraft-smm",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: `artcraft-smm`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: () => () => "/",
        schemas: {
          configuration: require("./prismic_types/configuration.json"),
          contacts: require("./prismic_types/contacts.json"),
          package: require("./prismic_types/package.json"),
          partners: require("./prismic_types/partners.json"),
          portfolio: require("./prismic_types/portfolio.json"),
          service: require("./prismic_types/service.json"),
        },
      },
    },
  ],
};

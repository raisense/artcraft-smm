require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Artcraft SMM",
    description: "Artcraft SMM services",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/favicon.svg",
      },
    },
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

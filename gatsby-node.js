exports.createPages = async function ({ actions, graphql }) {
  const props = await graphql(`
    query prismicData {
      allPrismicConfiguration(
        sort: { fields: last_publication_date, order: ASC }
      ) {
        nodes {
          lang
          id
          type
          dataRaw
        }
      }
      allPrismicContacts(sort: { fields: last_publication_date, order: ASC }) {
        nodes {
          type
          lang
          id
          dataRaw
        }
      }
      allPrismicPackage(sort: { fields: last_publication_date, order: ASC }) {
        nodes {
          type
          lang
          dataRaw
          id
        }
      }
      allPrismicPartners(sort: { fields: last_publication_date, order: ASC }) {
        nodes {
          dataRaw
          id
          lang
          type
        }
      }
      allPrismicPortfolio(sort: { fields: last_publication_date, order: ASC }) {
        nodes {
          dataRaw
          id
          lang
          type
        }
      }
      allPrismicService(sort: { fields: last_publication_date, order: ASC }) {
        nodes {
          dataRaw
          id
          lang
          type
        }
      }
    }
  `);
  const Models = require("./src/models/AppModels.js");
  /** @type {Models.PageMisc[]}*/
  const configsData = props.data.allPrismicConfiguration.nodes.map((e) =>
    Models.PageMisc.fromPrismic(e)
  );

  /** @type {Models.Contacts[]}*/
  const contactsData = props.data.allPrismicContacts.nodes.map((e) =>
    Models.Contacts.fromPrismic(e)
  );

  /** @type {Models.PackageItem[]}*/
  const packagesData = props.data.allPrismicPackage.nodes.map((e) =>
    Models.PackageItem.fromPrismic(e)
  );

  /** @type {Models.Partners[]}*/
  const partnersData = props.data.allPrismicPartners.nodes.map((e) =>
    Models.Partners.fromPrismic(e)
  );

  /** @type {Models.PortfolioItem[]}*/
  const portfoliosData = props.data.allPrismicPortfolio.nodes.map((e) =>
    Models.PortfolioItem.fromPrismic(e)
  );

  /** @type {Models.Service[]}*/
  const servicesData = props.data.allPrismicService.nodes.map((e) =>
    Models.Service.fromPrismic(e)
  );

  /**
   * @template T[]
   * @param {T[]} a
   * @param {String} l
   * @returns {T[]}
   */
  const filterLang = (a, l) => {
    const result = [];
    for (var i = 0; i < a.length; i++) {
      const e = a[i];
      if (Array.isArray(e)) {
        const sub = filterLang(e, l);
        if (sub.length != 0) result.push(sub);
      } else if (e.lang == l) result.push(e);
    }
    return result;
  };

  const languages = configsData.map((e) => e.lang);
  languages.map((locale) => {
    actions.createPage({
      path: `/${locale}`,
      component: require.resolve(`./src/templates/LocalizedIndex.js`),
      context: {
        locale: locale,
        languages: languages,
        packages: filterLang(packagesData, locale),
        portfolios: filterLang(portfoliosData, locale),
        services: filterLang(servicesData, locale),
        config: filterLang(configsData, locale)[0],
        partners: filterLang(partnersData, locale)[0],
        contacts: filterLang(contactsData, locale)[0],
      },
    });
  });
  actions.createPage({
    path: "/",
    component: require.resolve("./src/templates/index.js"),
    context: {},
  });
};

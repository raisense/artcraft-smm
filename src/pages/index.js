import "../styles/main.scss";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { graphql } from "gatsby";
import NavbarSection from "../components/NavBar";
import * as Models from "../models/AppModels";
import MainSection from "../components/MainSection";
import PortfolioSection from "../components/PortfolioSection";
import ServicesSection from "../components/ServicesSection";
import PackagesSection from "../components/PackagesSection";
import PartnersSection from "../components/PartnersSection";
import ContactsSection from "../components/ContactsSection";
import FooterSection from "../components/FooterSection";
import mainStripe from "../assets/main-stripe.png";

const IndexPage = (props) => {
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
   * @template T
   * @param {T} a
   * @param {String} l
   * @returns {T}
   */
  const filterLang = (a, l) => a.filter((e) => e.lang === l);
  const languages = configsData.map((e) => e.lang);
  const lang = reactLocalStorage.get("lang", "ru");

  const [locale, setLocale] = useState(lang);
  const packagesRef = useRef(null);
  const [packagesPadding, setPackagesPadding] = useState(0);

  const resize = () => {
    const p2f = (value) => parseFloat(value.slice(0, -2));
    if (packagesRef.current != null) {
      const style = window.getComputedStyle(packagesRef.current);
      const padding = p2f(style.marginLeft) + p2f(style.paddingLeft);
      setPackagesPadding(padding);
    }
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  const changeLang = (lang) => {
    setLocale(lang);
    reactLocalStorage.set("lang", lang);
  };

  const packages = filterLang(packagesData, locale);
  const portfolios = filterLang(portfoliosData, locale);
  const services = filterLang(servicesData, locale);
  const config = filterLang(configsData, locale)[0];
  const partners = filterLang(partnersData, locale)[0];
  const contacts = filterLang(contactsData, locale)[0];

  return (
    <div>
      <NavbarSection
        config={config}
        languages={languages}
        locale={locale}
        onLocale={changeLang}
      />
      <MainSection config={config} />
      <div className="zero-height py-3 d-none d-lg-block">
        <img id="main-stripe" src={mainStripe} />
      </div>
      <PortfolioSection
        portfolioItems={portfolios}
        localization={config.localization}
      />
      <ServicesSection services={services} localization={config.localization} />
      <PackagesSection
        ref={packagesRef}
        packages={packages}
        localization={config.localization}
        scrollPadding={packagesPadding}
      />
      <PartnersSection partners={partners} />
      <ContactsSection contacts={contacts} localization={config.localization} />
      <FooterSection config={config} contacts={contacts} />
    </div>
  );
};

export default IndexPage;
export const pageQuery = graphql`
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
`;

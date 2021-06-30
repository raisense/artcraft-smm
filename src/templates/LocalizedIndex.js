import "../styles/main.scss";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { graphql } from "gatsby";
import NavbarSection from "../components/NavBar";
import MainSection from "../components/MainSection";
import PortfolioSection from "../components/PortfolioSection";
import ServicesSection from "../components/ServicesSection";
import PackagesSection from "../components/PackagesSection";
import PartnersSection from "../components/PartnersSection";
import ContactsSection from "../components/ContactsSection";
import FooterSection from "../components/FooterSection";
import mainStripe from "../assets/main-stripe.png";
import { Helmet } from "react-helmet";
import { navigate } from "@reach/router";

const LocalizedIndex = ({ pageContext }) => {
  const locale = pageContext.locale;
  const languages = pageContext.languages;
  const packages = pageContext.packages;
  const portfolios = pageContext.portfolios;
  const services = pageContext.services;
  const config = pageContext.config;
  const partners = pageContext.partners;
  const contacts = pageContext.contacts;

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
  }, []);

  const onLocale = (l) => {
    if (l !== locale) {
      reactLocalStorage.set("lang", l);
      navigate(`/${l}`);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Artcraft SMM</title>
      </Helmet>
      <NavbarSection
        config={config}
        languages={languages}
        locale={locale}
        onLocale={onLocale}
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

export default LocalizedIndex;
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

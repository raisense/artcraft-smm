import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { PageMisc } from "../models/AppModels.js";
import "../styles/main.scss";

/**
 * @param {Object} props
 * @param {PageMisc} props.config
 * @param {String[]} props.languages
 * @param {String} props.locale
 * @param {(locale: String) => void} props.onLocale
 * @returns
 */
function NavbarSection({ config, languages, locale, onLocale }) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  function langCodeToString(lang) {
    return capitalize(lang.split("-")[0]);
  }

  return (
    <section className="navbar-container">
      <Container>
        <Navbar expand="lg" className="py-2">
          <Navbar.Brand>
            <img alt="logo" src={config.logo.url} />
          </Navbar.Brand>
          <NavDropdown title={langCodeToString(locale)}>
            {languages.map((e) => (
              <NavDropdown.Item
                key={e}
                active={locale === e}
                onClick={() => onLocale(e)}
              >
                {langCodeToString(e)}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <div className="expanded" />
          <Navbar.Toggle aria-controls="navigation" />
          <Navbar.Collapse id="navigation">
            <Nav fill justify className="w-100 align-items-center">
              <Nav.Link href="#portfolio">
                {config.localization.portfolio_text}
              </Nav.Link>
              <Nav.Link href="#services">
                {config.localization.services_text}
              </Nav.Link>
              <Nav.Link href="#packages">
                {config.localization.price_text}
              </Nav.Link>
              <div className="ml-4" />
              <a href="#contacts" className="btn btn-primary">
                {config.localization.contact_us_text}
              </a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </section>
  );
}

export default NavbarSection;

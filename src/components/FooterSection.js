import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Contacts, PageMisc } from "../models/AppModels";

/**
 * @param {Object} props
 * @param {Contacts} props.contacts
 * @param {PageMisc} props.config
 * @returns
 */
const FooterSection = ({ contacts, config }) => {
  return (
    <section className="footer-section">
      <Container className="section-container py-5 mb-0">
        <div className="d-flex flex-column flex-lg-row align-items-stretch w-100">
          <div>
            <Navbar.Brand>
              <img alt="logo" src={config.logo.url} />
            </Navbar.Brand>
            <div className="expanded" />
            <span className="fs-6">All rights reserved, VOXE</span>
          </div>
          <div>
            <h5>{config.localization.nav_menu_text}:</h5>
            <div className="my-1" />
            <Nav.Link href="#portfolio">
              {config.localization.portfolio_text}
            </Nav.Link>
            <Nav.Link href="#services">
              {config.localization.services_text}
            </Nav.Link>
            <Nav.Link href="#packages">
              {config.localization.price_text}
            </Nav.Link>
          </div>
          <div>
            <h5>{config.localization.contacts_text}:</h5>
            <div className="my-1" />
            <h6>{contacts.address}</h6>
            <h6>{contacts.phone}</h6>
            <h6>{contacts.email}</h6>
          </div>
          <div>
            <h5>{config.localization.socials_text}:</h5>
            <div className="my-1" />
            {contacts.socials.map((e) => (
              <a key={e.link} href={e.link} target="_blank" rel="noreferrer">
                {e.name}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FooterSection;

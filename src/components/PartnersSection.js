import React from "react";
import { Partners } from "../models/AppModels";
import { Container } from "react-bootstrap";

/**
 * @param {Object} props
 * @param {Partners} props.partners
 * @returns
 */
const PartnersSection = ({ partners }) => {
  return (
    <section className="partners-section">
      <Container className="section-container py-5 px-0">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          {partners.logos.map((e) => (
            <img key={e.url} alt={e.alt} src={e.url} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PartnersSection;

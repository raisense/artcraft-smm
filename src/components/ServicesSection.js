import React from "react";
import { Container } from "react-bootstrap";
import { Service, PageLocalization } from "../models/AppModels";
import { RichText } from "prismic-reactjs";

/**
 * @param {Object} props
 * @param {String} props.icon
 * @param {String} props.title
 * @param {RichTextBlock} props.content
 * @returns
 */
function ServiceItem({ icon, title, content }) {
  return (
    <div className="services-item col">
      <div className="services-item-title">
        <img className="services-item-img" src={icon} />
        <div className="m-2" />
        <h3>{title}</h3>
      </div>
      <div className="my-4" />
      <RichText render={content} />
    </div>
  );
}

/**
 * @param {Object} params
 * @param {Array<Service>} params.services
 * @param {PageLocalization} params.localization
 * @returns
 */
function ServicesSection({ services, localization }) {
  return (
    <section id="services">
      <Container className="section-container">
        <h2 className="h2-header">{localization.services_text}</h2>
        <div className="divider" />
        <div className="row align-items-start justify-content-center">
          {services.map((e) => (
            <ServiceItem
              key={e.title}
              icon={e.icon.url}
              title={e.title}
              content={e.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ServicesSection;

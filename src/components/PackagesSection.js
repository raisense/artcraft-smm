import React, { forwardRef } from "react";
import { Container } from "react-bootstrap";
import { PackageItem, PageLocalization } from "../models/AppModels";
import check from "../assets/icons/check.svg";

/**
 * @param {Object} props
 * @param {PackageItem} props.item
 * @param {PageLocalization} props.localization
 * @returns
 */
function Item({ item, localization }) {
  return (
    <div className="package-item d-flex flex-column align-items-strech">
      <h2 className="text-center">{item.name}</h2>
      <div className="my-3" />
      <div className="h-100 d-flex flex-column justify-content-between">
        {item.offerings.map((e) => (
          <div key={e} className="package-item-offers">
            <img alt="check-icon" src={check} />
            <div className="mx-2" />
            <span>{e}</span>
          </div>
        ))}
        <div className="expanded" />
        <h3>{item.price}</h3>
        <div className="my-2" />
        <a href="#contacts" className="btn btn-outline-primary">
          {localization.contact_package_text}
        </a>
      </div>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {Array<PackageItem>} props.packages
 * @param {PageLocalization} props.localization
 * @param ref
 * @param {float} scrollPadding
 * @returns
 */
const PackagesSection = forwardRef(
  ({ packages, localization, scrollPadding }, ref) => {
    return (
      <section id="packages">
        <Container ref={ref} className="section-container mb-0">
          <h2 className="h2-header">{localization.price_text}</h2>
          <div className="divider" />
        </Container>
        <div
          className="packages-container mx-0"
          style={{
            paddingLeft: scrollPadding,
            paddingRight: scrollPadding,
          }}
        >
          {packages.map((e) => (
            <Item key={e.id} item={e} localization={localization} />
          ))}
        </div>
        <div className="section-container mt-0" />
      </section>
    );
  }
);

export default PackagesSection;

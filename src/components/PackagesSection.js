import React, { forwardRef, useRef } from "react";
import { Container } from "react-bootstrap";
import { PackageItem, PageLocalization } from "../models/AppModels";
import check from "../assets/icons/check.svg";
import Carousel from "react-multi-carousel";
import { useEffect } from "react";

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
    const itemWidth = 370;
    var responsive = {};
    for (var i = 1; i < 8; i++) {
      responsive[i] = {
        breakpoint: {
          max: 2 * scrollPadding + itemWidth * (i + 1),
          min: 2 * scrollPadding + itemWidth * i,
        },
        items: i,
      };
    }
    packages.sort((a, b) => a.order - b.order);

    return (
      <section id="packages">
        <Container ref={ref} className="section-container mb-0">
          <h2 className="h2-header">{localization.price_text}</h2>
          <div className="divider" />
        </Container>
        <Container>
          <Carousel
            className="my-3"
            responsive={responsive}
            ssr={false}
            swipeable={false}
            draggable={true}
            partialVisbile={false}
          >
            {packages.map((e) => (
              <Item key={e.id} item={e} localization={localization} />
            ))}
          </Carousel>
        </Container>
        <div className="section-container mt-0" />
      </section>
    );
  }
);

export default PackagesSection;

import React from "react";
import { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { RichText } from "prismic-reactjs";
import { PortfolioItem, PageLocalization } from "../models/AppModels";

/**
 * @param {Object} props
 * @param {PortfolioItem} props.item
 * @param {PageLocalization} props.localization
 * @returns
 */
function Item({ item, localization }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="portfolio-item"
      style={{ backgroundImage: `url(${item.mainImage.url})` }}
    >
      <div className="portfolio-item-cover">
        <h3>{item.name}</h3>
        <Button onClick={() => setShow(true)}>
          {localization.details_text}
        </Button>

        <Modal size="lg" show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton className="px-5 py-4">
            <Modal.Title>{item.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <div className="d-flex flex-row p-5">
              <h6 style={{ width: 400 }}>{localization.about_project_text}</h6>
              <div className="flex-grow-1">
                <RichText render={item.description} />
              </div>
            </div>
            <div
              style={{ height: 200 }}
              className="w-100 overflow-auto px-5 d-flex flex-row pb-2 mb-5"
            >
              {item.images.map((e) => (
                <img
                  key={e.url}
                  className="h-100 pr-3"
                  src={e.url}
                  alt={e.alt}
                />
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {PortfolioItem[]} props.portfolioItems
 * @param {PageLocalization} props.localization
 * @returns
 */
function PortfolioSection({ portfolioItems, localization }) {
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? portfolioItems : portfolioItems.slice(0, 10);

  return (
    <section id="portfolio">
      <Container className="section-container px-2">
        <h2 className="h2-header">{localization.portfolio_text}</h2>
        <div className="divider" />
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          {items.map((e, i) => (
            <Item key={e.id} item={e} localization={localization} />
          ))}
        </div>
        <div className="my-4" />
        {portfolioItems.length > 10 && !expanded && (
          <Button onClick={() => setExpanded(true)}>Все работы</Button>
        )}
      </Container>
    </section>
  );
}

export default PortfolioSection;

import React from "react";
import { RichText } from "prismic-reactjs";
import { PageMisc } from "../models/AppModels.js";
import "../styles/main.scss";

/**
 *
 * @param {Object} param
 * @param {PageMisc} param.config
 * @returns
 */
function MainSection({ config }) {
  return (
    <section
      id="main-content"
      className="d-flex flex-column align-items-center p-2"
      style={{ backgroundImage: `url(${config.introImage.url})` }}
    >
      <div className="my-5" />
      {RichText.render(config.introText)}
      <div className="my-3" />
      <a href="#portfolio" className="btn btn-primary">
        {config.localization.portfolio_text}
      </a>
    </section>
  );
}

export default MainSection;

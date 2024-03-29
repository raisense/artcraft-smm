import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { Contacts, PageLocalization } from "../models/AppModels";

/**
 * @param {Object} props
 * @param {Contacts} props.contacts
 * @param {PageLocalization} props.localization
 * @returns
 */
const ContactsSection = ({ contacts, localization }) => {
  return (
    <section id="contacts">
      <Container className="section-container">
        <h2 className="h2-header">{localization.contact_us_text}</h2>
        <div className="divider" />
        <div className="contacts-container d-flex flex-column flex-lg-row w-100">
          <Form
            className="expanded"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/thanks/"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input style={{ display: "none" }} name="bot-field" />
            <Form.Group className="my-2">
              <Form.Control
                required
                type="text"
                placeholder={`${localization.your_name_text}*`}
                name="name"
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Control
                required
                type="text"
                placeholder={`${localization.your_phone_text}*`}
                name="phone"
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Control type="email" placeholder="E-mail" name="email" />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Control
                required
                as="textarea"
                placeholder={`${localization.message_text}*`}
                rows={8}
                name="message"
              />
            </Form.Group>
            <div data-netlify-recaptcha="true"></div>
            <Button type="submit">{localization.send_text}</Button>
          </Form>
          <div className="m-4" />
          <div className="expanded contacts">
            <div>
              <h5>{localization.address_text}</h5>
              <h3>{contacts.address}</h3>
            </div>
            <div className="my-5" />
            <div>
              <h5>{localization.phone_text}</h5>
              <h3>{contacts.phone}</h3>
            </div>
            <div className="my-5" />
            <h5>{contacts.email}</h5>
            <div className="my-3" />
            <div className="socials">
              {contacts.socials.map((e) => (
                <a key={e.link} target="_blank" rel="noreferrer" href={e.link}>
                  <img alt={e.name} src={e.icon.url} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactsSection;

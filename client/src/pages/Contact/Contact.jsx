import React, { useState, useEffect } from "react";
import Location from "./location/Location";
import ContactForm from "./contactForm/ContactForm";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

export default function ContactPage() {

  return (
          <ContentWrapper>
            <Location />
            <ContactForm />
          </ContentWrapper>
  );
}

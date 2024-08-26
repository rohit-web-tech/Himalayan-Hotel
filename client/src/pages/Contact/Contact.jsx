import React, { useState, useEffect } from "react";
import Location from "./location/Location";
import ContactForm from "./contactForm/ContactForm";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Loader from "../../components/loader";

export default function ContactPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    contact: "",
    email: "",
    address: "",
    imageUrl: ""
  })

  const getData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getContact`);
      const data = await res.json();
      if (data.message == "success") {
        setData(data?.contact || {
          contact: "",
          email: "",
          address: "",
          imageUrl: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true)
    getData().finally(() => setLoading(false))
  }, [])

  return (
    <ContentWrapper>
      {
        loading ? (
          <Loader styles="h-10 w-10 my-[30vh]" />
        ) : (
          <>
            <Location data={data}/>
            <ContactForm />
          </>
        )
      }
    </ContentWrapper>
  );
}

import React, { useState, useEffect } from "react";
import Location from "./location/Location";
import ContactForm from "./contactForm/ContactForm";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Loader from "../../components/loader";
import { fetchGetData } from "../../lib/fetchData";

export default function ContactPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    contact: "",
    email: "",
    address: "",
    imageUrl: ""
  })

  const getData = async () => {
    try {
      const res = await fetchGetData(`/getContact`,setLoading);
      if (res.message == "success") {
        setData(res?.contact || {
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
    getData();
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

"use client";

import { useState } from "react";
import styled from "styled-components";
import { Title } from "../ui/Heading";
import { contactInfo } from "../data/constants";
import ContactComponents from "./ContactComponents";
import { Element } from "react-scroll";
import Swal from "sweetalert2";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ContactsWrapper = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    display: block;
  }
`;

const ContactformContainer = styled.div`
  width: 50%;
  background-color: #ffd93e;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ContactlinkContainer = styled.div`
  width: 50%;
  background: url("contact-bg-1.jpg") 0% 0% / cover;
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormContact = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LinkContact = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const H2 = styled.h2`
  color: #1f1e1c;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1.8em;
  margin-bottom: 20px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #d8b113;
  color: #2e353e;
  font-size: 14px;
  padding: 6px 0;
  margin-bottom: 15px;
  width: 100%;
`;

const Textarea = styled.textarea`
  background: transparent;
  border: none;
  border-bottom: 1px solid #d8b113;
  color: #2e353e;
  font-size: 14px;
  padding: 6px 0;
  margin-bottom: 15px;
  height: 100px;
  width: 100%;
`;

const Submitbtn = styled.button`
  background-color: #1f1e1c;
  border-color: #1f1e1c #1f1e1c #040404;
  color: #ffffff;
  padding: 10px 30px;
  border-radius: 35px;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  float: left;
`;

const StyledElement = styled(Element)`
  display: flex;
  width: 100%;
`;

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", subject: "", message: "" });
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your message has been sent successfully.",
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again!",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledElement name="contacts">
      <Container>
        <Title>Contacts</Title>
        <ContactsWrapper>
          <ContactformContainer>
            <FormContact>
              <H2>Reach Me</H2>
              <Form onSubmit={handleSubmit}>
                <Input
                  name="name"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <Textarea
                  name="message"
                  placeholder="Message*"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <Submitbtn type="submit">
                  {loading ? "Sending..." : "Submit"}
                </Submitbtn>
              </Form>
            </FormContact>
          </ContactformContainer>
          <ContactlinkContainer>
            <LinkContact>
              {contactInfo.map((info, index) => (
                <ContactComponents key={index} info={info} />
              ))}
            </LinkContact>
          </ContactlinkContainer>
        </ContactsWrapper>
      </Container>
    </StyledElement>
  );
}

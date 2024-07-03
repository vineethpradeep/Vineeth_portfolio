import styled from "styled-components";
import { Title } from "../ui/Heading";
import { contactInfo } from "../data/constants";
import ContactComponents from "./ContactComponents";
import { Element } from "react-scroll";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ContactsWrapper = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 660px) {
    display: block;
  }
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
  @media (max-width: 660px) {
    width: 100%;
    justify-content: center;
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ContactlinkContainer = styled.div`
  width: 50%;
  background: url("contact-bg-1.jpg") 0% 0% / cover;
  padding: 20px;
  @media (max-width: 660px) {
    width: 100%;
  }
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
  @media (max-width: 660px) {
    width: 100%;
  }
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
  box-shadow: none;
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
  box-shadow: none;
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
  return (
    <StyledElement name="contacts">
      <Container>
        <Title>Contacts</Title>
        <ContactsWrapper>
          <ContactformContainer>
            <FormContact>
              <H2>Reach Me</H2>
              <Form>
                <Input placeholder="Your Name*" />
                <Input placeholder="Subject" />
                <Textarea
                  maxlength="5000"
                  rows="10"
                  name="message"
                  placeholder="Message*"
                />
                <Submitbtn>Submit</Submitbtn>
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

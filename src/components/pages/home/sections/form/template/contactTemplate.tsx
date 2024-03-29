import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { formSchema } from "../contact";
import { z } from "zod";

type ContactTemplateProps = z.infer<typeof formSchema>;

export const ContactTemplate = ({
  name,
  email,
  message,
  select,
}: ContactTemplateProps) => {
  const previewText = `Leia a mensagem de ${name} a respeito de ${select} no site code.dev`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src={
                "https://res.cloudinary.com/dcspxwcj9/image/upload/v1707098581/gyrirrrwoqnkywtrmvxr.png"
              }
              width="170"
              height="60"
              alt="Code.dev"
              style={{ marginBottom: "20px" }}
            />
          </Section>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>Aqui está o que {name} escreveu</Text>
              <Text style={paragraph}>
                Entrou em contato a respeito de <strong>{select}</strong>.
              </Text>
              <Text style={review}>{message}</Text>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              Code.dev, Rua José Lourenço Kelmer, UFJF, Instituto de Ciências
              Exatas, sala 3313
            </Text>
            <Link href="https://codejr.com.br/" target="_blank" style={link}>
              Visite nosso site
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const link = {
  ...paragraph,
  color: "#008cdd",
  fontSize: "14px",
  display: "block",
  width: "fit-content",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};

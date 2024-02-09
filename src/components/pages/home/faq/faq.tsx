import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../_ui-shadcn/accordion";

import { TypographyH1 } from "../../../templates/typography";

export default function FAQ() {
  return (
    <section>
      <TypographyH1>FAQ</TypographyH1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Propósito do site</AccordionTrigger>
          <AccordionContent>
            Este site foi desenvolvido com o propósito de ser parte do
            treinamento sobre GraphQL e Hygraph na Code Empresa Junior de
            Computação. Desenvolvido por Felipe Sant&apos;Anna, Diretor de
            Projetos na Gestão 2024.1.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Tecnologias</AccordionTrigger>
          <AccordionContent>
            Este site foi desenvolvido com Next.js, Typescript, Shadcn/UI, React
            Hook Form, Zod, Apollo Client e API GraphQL.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Github</AccordionTrigger>
          <AccordionContent>
            O código fonte deste site está disponível no meu Github,{" "}
            <Link
              href={"https://github.com/Santannafe12"}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              Felipe Sant&apos;Anna.
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

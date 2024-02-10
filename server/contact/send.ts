"use server";


import { formSchema } from "@/src/components/pages/home/sections/form/contact";
import { ContactTemplate } from "@/src/components/pages/home/sections/form/template/contactTemplate";
import { Resend } from "resend";
import { z } from "zod";

type Props = z.infer<typeof formSchema>;

export async function send(values: Props) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailProps: Props = {
    name: values.name,
    email: values.email,
    message: values.message,
    select: values.select,
  };

  resend.emails.send({
    from: "codejrdev@resend.dev",
    to: "codejrdev@gmail.com",
    reply_to: `${values.email}`,
    subject: `Contato - ${values.name} - A respeito de: ${values.select}`,
    react: ContactTemplate({
      name: emailProps.name,
      email: emailProps.email,
      message: emailProps.message,
      select: emailProps.select,
    }),
  });
}

"use server";

import { AirbnbReviewEmail } from "@/src/components/templates/email-template";
import { formSchema } from "@/src/components/forms/form-contact";
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
    react: AirbnbReviewEmail({
      name: emailProps.name,
      email: emailProps.email,
      message: emailProps.message,
      select: emailProps.select,
    }),
  });
}

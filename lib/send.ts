"use server";

import GithubAccessTokenEmail from "@/components/email-template";
import { formSchema } from "@/components/home/contact";
import { Resend } from "resend";
import { z } from "zod";

export async function send(values: z.infer<typeof formSchema>) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: "santannafe12@resend.dev",
    to: "santannafe12@gmail.com",
    reply_to: `${values.email}`,
    subject: "Hello World",
    react: GithubAccessTokenEmail({ username: "Santannafe12" }),
  });
}

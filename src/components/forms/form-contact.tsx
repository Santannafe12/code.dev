"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../_ui-shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_ui-shadcn/form";
import { Input } from "../_ui-shadcn/input";
import { Textarea } from "../_ui-shadcn/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../_ui-shadcn/select";
import { toast } from "../_ui-shadcn/use-toast";
import { TypographyLead } from "../templates/typography";
import { useRef } from "react";
import { send } from "@/src/server/contact/send";

export const formSchema = z.object({
  name: z.string().min(5, {
    message: "Nome deve ter pelo menos 5 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor insira um email válido.",
  }),
  message: z
    .string()
    .min(50, {
      message: "Mensagem deve ter pelo menos 50 caracteres.",
    })
    .max(400, {
      message: "Mensagem ter no máximo 400 caracteres.",
    }),
  select: z.string({
    required_error: "Por favor selecione um assunto.",
  }),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      select: "post",
    },
  });

  const audioPlayer = useRef<HTMLAudioElement>(null);

  function playAudio() {
    if (audioPlayer.current) {
      audioPlayer.current.volume = 0.2;
      audioPlayer.current.play();
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    send(values)
      .then(() => {
        toast({
          title: "Email enviado!",
          description: (
            <pre className="flex flex-col gap-2 mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Mensagem enviada com sucesso!</code>
              <code className="text-white">
                Entraremos em contato em breve.
              </code>
            </pre>
          ),
        });

        playAudio();

        form.reset();
      })
      .catch(() => {
        toast({
          title: "Erro ao enviar mensagem",
          description: "Por favor tente novamente.",
        });
      });
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Dúvidas ou sugestões? Nos Contate!
        </h2>
        <TypographyLead>Entraremos em contato em breve.</TypographyLead>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="select"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assunto</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Opções</SelectLabel>
                      <SelectItem value="post">Post</SelectItem>
                      <SelectItem value="doubt">Dúvida</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Message"
                    {...field}
                    className="resize-none"
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-36">
            Enviar
          </Button>
        </form>
      </Form>
      <audio ref={audioPlayer} src="/audio/success.mp3" />
    </div>
  );
}

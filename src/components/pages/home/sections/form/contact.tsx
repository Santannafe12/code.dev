"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../_ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../_ui/form";
import { Input } from "../../../../_ui/input";
import { Textarea } from "../../../../_ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../_ui/select";
import { toast } from "../../../../_ui/use-toast";
import { TypographyLead } from "../../../../common/typography/typography";
import { useRef } from "react";
import { send } from "@/server/contact/send";

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
              <FormItem aria-label="Formulário Selecione">
                <FormLabel>Assunto</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  aria-label="Assunto"
                >
                  <FormControl aria-label="Clique para selecionar uma opção">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" aria-label="Selecione uma opção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent aria-label="Conteúdo">
                    <SelectGroup aria-label="Grupo">
                      <SelectLabel aria-label="Opções para selecionar">Opções</SelectLabel>
                      <SelectItem value="post" aria-label="Botão de Post">Post</SelectItem>
                      <SelectItem value="doubt" aria-label="Botão de Dúvida">Dúvida</SelectItem>
                      <SelectItem value="design" aria-label="Botão de Design">Design</SelectItem>
                      <SelectItem value="other" aria-label="Botão de Outro">Outro</SelectItem>
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
                    placeholder="Mensagem"
                    {...field}
                    className="resize-none"
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-36" aria-label="Botão para confirmação de envio do formulário">
            Enviar
            <span className="sr-only">Botão para confirmação de envio do formulário</span>
          </Button>
        </form>
      </Form>
      <audio ref={audioPlayer} src="/audio/success.mp3" />
    </div>
  );
}

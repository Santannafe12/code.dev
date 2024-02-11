import Link from "next/link";

import { Code } from "lucide-react";

export default function Footer() {
  return (
    <div className="border-t text-center w-full mt-24 py-8 flex flex-col gap-12 items-center justify-center">
      <div className="flex flex-col gap-4 px-4">
        <Link className="flex items-center gap-2 max-w-fit mx-auto" href="/" aria-label="Link responsável por redirecionar a Página Home">
          <Code className="h-6 w-6" />
          <span className="text-lg font-semibold">code.dev</span>
          <span className="sr-only">Link para a página Home</span>
        </Link>
        <span className="text-muted-foreground text-base text-center">
          Construído por Felipe Sant&apos;Anna. Código fonte no{" "}
          <Link
            href={"https://github.com/Santannafe12"}
            aria-label="Link para o repositório do Github do criador deste projeto"
            target="_blank"
            className="text-primary hover:underline"
          >
            <span className="sr-only">Link para o repositório do Github do criador deste projeto</span>
            Github.
          </Link>
        </span>
      </div>
    </div>
  );
}

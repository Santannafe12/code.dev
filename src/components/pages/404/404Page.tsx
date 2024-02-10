import { Button } from "@/src/components/_ui/button";
import { TypographyH1, TypographyMuted } from "@/src/components/common/typography/typography";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center space-y-6">
      <section className="text-center">
        <TypographyH1 className="border-none">
          Erro por parte do cliente, página não encontrada (404) <br /> Não foi possível encontrar o conteúdo da página.
        </TypographyH1>
        <TypographyMuted>
          Caso o erro persista, entre em contato com o suporte.
        </TypographyMuted>
      </section>
      <Link href="/">
        <Button className="rounded-lg">Retornar a Home</Button>
      </Link>
    </div>
  );
}

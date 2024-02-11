import { Button } from "@/src/components/_ui/button";
import { TypographyH1, TypographyMuted } from "@/src/components/common/typography/typography";
import Link from "next/link";

export default function InternalServerErrorPage() {
    return (
        <div className="min-h-screen flex flex-col items-center space-y-6">
            <section className="text-center">
                <TypographyH1 className="border-none">
                    <span className="underline">Erro interno do Servidor (500)</span> <br /> Não foi possível carregar a página.
                </TypographyH1>
                <TypographyMuted>
                    Caso o erro persista, entre em contato com o suporte.
                </TypographyMuted>
            </section>
            <Link href="/" aria-label="Link responsável por redirecionar a Página Home">
                <Button className="rounded-lg">Retornar a Home</Button>
                <span className="sr-only">Link para a página Home</span>
            </Link>
        </div>
    );
}

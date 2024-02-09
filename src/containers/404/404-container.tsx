import { Button } from "@/src/components/_ui-shadcn/button";
import { TypographyH1 } from "@/src/components/templates/typography";
import Link from "next/link";

export default function NotFoundContainer() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <TypographyH1 className="border-none">
        Página não encontrada.
      </TypographyH1>
      <Link href="/">
        <Button className="rounded-lg">Retornar a Home</Button>
      </Link>
    </div>
  );
}

import { Button } from "@/src/components/_ui/button";
import { TypographyH1 } from "@/src/components/common/typography/typography";
import Link from "next/link";

export default function NotFoundPage() {
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

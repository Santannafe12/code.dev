import { TypographyH3, TypographyMuted } from "../../../templates/typography";
import { Author } from "@/types/data";

export default function UserAbout({ user }: { user: Author }) {
  return (
    <div className="space-y-2 w-full">
      <TypographyH3>Sobre {user.name}</TypographyH3>
      <TypographyMuted className="border w-fit max-w-[1000px] border-input bg-background hover:bg-primary-foreground hover:text-primary cursor-default p-3 rounded-md">
        {user.biography
          ? `${user.biography}`
          : "Não conhecemos muito sobre este usuário, mas ele parece ser uma pessoa legal."}
      </TypographyMuted>
    </div>
  );
}

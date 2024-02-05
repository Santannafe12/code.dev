import { useUser } from "@/src/context/user";
import { TypographyH3, TypographyMuted } from "../typography";

export default function About() {
    const { user } = useUser();

    return (
        <div className="space-y-2 w-full">
            <TypographyH3>
                Sobre {user.name}
            </TypographyH3>
            <TypographyMuted className="border w-fit max-w-[1000px] border-input bg-background hover:bg-primary-foreground hover:text-primary cursor-default p-3 rounded-md">
                {user.biography ? `${user.biography}` : "Não conhecemos muito sobre este usuário, mas ele parece ser uma pessoa legal."}
            </TypographyMuted>
        </div>
    );
}
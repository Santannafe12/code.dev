import { TypographyH3, TypographyMuted } from "../../../../common/typography/typography";

export default function UserPosts({ count }: { count: number | string }) {
  return (
    <div className="space-y-2 w-full">
      <TypographyH3>Número de Posts</TypographyH3>
      <TypographyMuted className="border w-fit max-w-[1000px] border-input bg-background hover:bg-primary-foreground hover:text-primary cursor-default p-3 rounded-md">

        {typeof count === "number" ? (
          count >= 1 ? (
            <>
              Este usuário possui <strong className="underline">{count}</strong>{" "}
              posts publicados no blog!
            </>
          ) : (
            "Este usuário ainda não possui nenhum post publicado no blog!"
          )
        ) : (
          count
        )}
        
      </TypographyMuted>
    </div>
  );
}

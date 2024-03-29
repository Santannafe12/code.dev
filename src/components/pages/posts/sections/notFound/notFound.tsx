import Search from "../../../../common/search/search";
import { TypographyH1, TypographyMuted } from "../../../../common/typography/typography";

export function NotFoundPosts() {
  return (
    <div className="space-y-4 flex flex-col md:flex-row justify-between md:items-center">
      <section>
        <TypographyH1 className="border-none">
          Nenhuma publicação encontrada
        </TypographyH1>
        <TypographyMuted className="border-none">
          Tente novamente com outros termos de busca.
        </TypographyMuted>
      </section>
      <Search />
    </div>
  );
}

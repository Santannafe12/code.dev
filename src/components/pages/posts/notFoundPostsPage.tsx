import Search from "../../common/search/search";
import { TypographyH1, TypographyMuted } from "../../common/typography/typography";

export default function NotFoundPostsPage() {
    return (
        <div className="m-auto min-h-screen w-11/12 lg:w-10/12">
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
        </div>
    )
}
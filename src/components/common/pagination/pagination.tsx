import { usePathname, useSearchParams } from "next/navigation";
import {
  PaginationUI,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../_ui/pagination";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-label="Página anterior"
            className={
              currentPage <= 1
                ? "pointer-events-none text-muted-foreground"
                : ""
            }
          />
          <span className="sr-only">Página anterior</span>
        </PaginationItem>
        {allPages.map((pageNumber, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={createPageURL(pageNumber)}
              aria-label="Página atual"
              isActive={currentPage === pageNumber}
            >
              {pageNumber}
              <span className="sr-only">Página atual</span>
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-label="Próxima página"
            className={
              currentPage >= totalPages
                ? "pointer-events-none text-muted-foreground"
                : ""
            }
          />
          <span className="sr-only">Próxima página</span>
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
}

const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

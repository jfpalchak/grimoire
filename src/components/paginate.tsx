import Link from "next/link";

// # WIP # //

export function paginate <T>(array: T[], pageSize: number, currentPage: number) {
  const start = pageSize * (currentPage - 1);
  const end = pageSize * currentPage;
  return array.slice(start, end);
}

export const Pagination = ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => {
  return (
    <div className="flex gap-5">
      <Link
        href={{ query: { page: (currentPage === 1 ? currentPage : currentPage - 1) } }}
        scroll={false}
      >
        Previous
      </Link>
        {Array.from({ length: totalPages }, (_, i) => i).map((num) => (
          <Link
            key={`page_${num+1}`}
            href={{ query: { page: num + 1 }}}
            className={`${currentPage === num + 1 ? 'underline underline-offset-1 font-semibold' : ''}`}
            scroll={false}
          >
            {num+1}
          </Link>
        ))}
      <Link
        href={{ query: { page: (currentPage === totalPages ? currentPage : currentPage + 1) } }}
        scroll={false}
      >
        Next
      </Link>
    </div>
  );
};
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../util/Constants";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex justify-between">
      <p>
        Showing{" "}
        <span className="font-semibold text-blue-600">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-blue-600">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold text-blue-600">{count}</span> results
      </p>

      <div className="flex gap-2 items-center">
        <button
          className="flex items-center gap-2 hover:text-black/60"
          onClick={() => prevPage()}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>
        <button
          className="flex items-center gap-2 hover:text-black/60"
          onClick={() => nextPage()}
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

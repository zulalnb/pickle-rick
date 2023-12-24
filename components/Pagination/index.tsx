import React from "react";
import "./pagination.scss";
import usePagination, { DOTS } from "@/lib/hooks/usePagination";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  totalPageCount?: number;
  totalDataCount?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
};

const Pagination = ({
  totalPageCount = 0,
  totalDataCount = 0,
  currentPage,
  onPageChange,
  siblingCount = 1,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalPageCount,
    siblingCount,
  });

  if (totalDataCount === 0) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = totalPageCount;

  return (
    <nav>
      <ul className="pagination-container">
        <li
          className={classNames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="xs" />
        </li>
        {paginationRange &&
          paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return (
                <li key={pageNumber} className="pagination-item dots">
                  &#8230;
                </li>
              );
            }

            return (
              <li
                key={pageNumber}
                className={classNames("pagination-item", {
                  selected: pageNumber === currentPage,
                })}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </li>
            );
          })}
        <li
          className={classNames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <FontAwesomeIcon icon={faChevronRight} size="xs" />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  isLoading = false,
}: PaginationProps) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Calculate range around current page
    const leftSibling = Math.max(2, currentPage - siblingCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount);

    // Add ellipsis if needed before current range
    if (leftSibling > 2) {
      pageNumbers.push("...");
    } else if (leftSibling === 2) {
      pageNumbers.push(2);
    }

    // Add pages in the middle
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }

    // Add ellipsis if needed after current range
    if (rightSibling < totalPages - 1) {
      pageNumbers.push("...");
    } else if (rightSibling === totalPages - 1) {
      pageNumbers.push(totalPages - 1);
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center">
      <ul className="flex items-center gap-1">
        <li>
          {" "}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md",
              currentPage === 1 || isLoading
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            )}
            aria-label="Go to previous page"
          >
            <MdChevronLeft className="h-4 w-4" />
          </button>
        </li>

        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="flex h-8 w-8 items-center justify-center">
                {page}
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                disabled={isLoading}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md",
                  currentPage === page
                    ? "bg-mysecondary text-white"
                    : "text-gray-700 hover:bg-gray-100",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          {" "}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md",
              currentPage === totalPages || isLoading
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            )}
            aria-label="Go to next page"
          >
            <MdChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

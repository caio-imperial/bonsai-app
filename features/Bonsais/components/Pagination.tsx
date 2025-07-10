import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface BonsaisPaginationProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

function BonsaisPagination({ totalPages, currentPage, onPageChange }: BonsaisPaginationProps) {
    const pagesNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const displayPages = [];

    if (totalPages <= 5) {
        displayPages.push(...pagesNumbers);
    } else {
        if (currentPage > 2) {
            displayPages.push(1);
            if (currentPage > 3) displayPages.push('...');
        }
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
            displayPages.push(i);
        }
        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) displayPages.push('...');
            displayPages.push(totalPages);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage === 1) return
        onPageChange(currentPage - 1)
    }

    const handleNextPage = () => {
        if (currentPage === totalPages) return
        onPageChange(currentPage + 1)
    }

    return (
        <Pagination className="flex justify-center">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={handlePreviousPage} />
                </PaginationItem>
                {displayPages.map((page, index) => (
                    <PaginationItem key={index}>
                        {typeof page === 'number' ? (
                            <PaginationLink href="#" onClick={() => onPageChange(page)} isActive={page === currentPage}>
                                {page}
                            </PaginationLink>
                        ) : (
                            <PaginationEllipsis />
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext href="#" onClick={handleNextPage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default BonsaisPagination;
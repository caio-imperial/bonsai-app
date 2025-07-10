import BonsaiPagination from "@/features/Bonsai/components/Pagination";

import { BonsaisResponse } from "@/types/bonsai";

interface BonsaiFooterProps {
  meta: BonsaisResponse["meta"];
  params: {
    page: number;
    limit: number;
  };
  handlePageChange: (page: number) => void;
}

const BonsaiFooter = ({ meta, params, handlePageChange }: BonsaiFooterProps) => {
  if (meta.totalPages <= 1) return null;

  return (
    <BonsaiPagination
      totalPages={meta.totalPages || 0}
      currentPage={params.page}
      onPageChange={handlePageChange}
    />
  );
};

export default BonsaiFooter;
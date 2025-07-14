import BonsaisPagination from '@/features/bonsais/list/components/Pagination'

import type { BonsaisResponse } from '@/types/bonsai'

interface BonsaisFooterProps {
  meta: BonsaisResponse['meta']
  params: {
    page: number
    limit: number
  }
  handlePageChange: (page: number) => void
}

const BonsaisFooter = ({
  meta,
  params,
  handlePageChange,
}: BonsaisFooterProps) => {
  if (meta.totalPages <= 1) return null

  return (
    <BonsaisPagination
      totalPages={meta.totalPages || 0}
      currentPage={params.page}
      onPageChange={handlePageChange}
    />
  )
}

export default BonsaisFooter

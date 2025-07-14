import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface BonsaisSearchProps {
  search: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
}

const BonsaisSearch = ({
  search,
  handleSearch,
  loading,
}: BonsaisSearchProps) => {
  const initLoading = loading && search.length === 0

  return (
    <>
      <Input
        type="text"
        placeholder="Nome do bonsai"
        value={search}
        onChange={handleSearch}
        disabled={initLoading}
      />
      <Button
        className="cursor-pointer hover:bg-primary/90"
        variant="default"
        size="icon"
        disabled={initLoading}
        asChild
      >
        <Link href="/bonsais/new">
          <PlusIcon className="w-4 h-4" />
        </Link>
      </Button>
    </>
  )
}

export default BonsaisSearch

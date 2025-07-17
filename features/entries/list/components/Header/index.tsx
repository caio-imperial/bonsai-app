import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import type { Bonsai } from '@/types'
import EntriesListHeaderMenuActions from './MenuActions'
import EntriesListHeaderTitle from './Title'

interface EntriesListHeaderProps {
  bonsai: Bonsai | null
  bonsaiLoading: boolean
  entriesLoading: boolean
  handleFavorite: ({
    bonsaiId,
    favorite,
  }: {
    bonsaiId: string
    favorite: boolean
  }) => void
  handleEdit: ({ bonsaiId }: { bonsaiId: string }) => void
  handleAddEntry: ({ bonsaiId }: { bonsaiId: string }) => void
}

const EntriesListHeader = ({
  bonsai,
  bonsaiLoading,
  entriesLoading,
  handleFavorite,
  handleEdit,
  handleAddEntry,
}: EntriesListHeaderProps) => {
  return (
    <>
      <Link href="/">
        <ArrowLeftIcon className="w-6 h-6" />
      </Link>
      <div className="flex justify-between gap-2">
        <div className="w-full">
          <EntriesListHeaderTitle bonsai={bonsai} loading={bonsaiLoading} />
        </div>
        <EntriesListHeaderMenuActions
          bonsai={bonsai}
          entriesLoading={entriesLoading}
          handleFavorite={handleFavorite}
          handleEdit={handleEdit}
          handleAddEntry={handleAddEntry}
        />
      </div>
    </>
  )
}

export default EntriesListHeader

import { PencilIcon, PlusIcon, StarHalfIcon, StarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { Bonsai } from '@/types'

interface EntriesListHeaderMenuActionsProps {
  bonsai: Bonsai | null
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
const EntriesListHeaderMenuActions = ({
  bonsai,
  entriesLoading,
  handleFavorite,
  handleEdit,
  handleAddEntry,
}: EntriesListHeaderMenuActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        disabled={entriesLoading || !bonsai}
        onClick={e => {
          handleFavorite({
            bonsaiId: bonsai?._id || '',
            favorite: bonsai?.favorite || false,
          })
          e.stopPropagation()
        }}
        className="cursor-pointer"
      >
        {bonsai?.favorite ? (
          <StarIcon className="w-4 h-4" />
        ) : (
          <StarHalfIcon className="w-4 h-4" />
        )}
      </Button>
      <Button
        variant="secondary"
        disabled={entriesLoading || !bonsai}
        onClick={e => {
          handleEdit({ bonsaiId: bonsai?._id || '' })
          e.stopPropagation()
        }}
        className="cursor-pointer"
      >
        <PencilIcon className="w-4 h-4" /> Editar
      </Button>
      <Button
        variant="secondary"
        disabled={entriesLoading || !bonsai}
        onClick={e => {
          handleAddEntry({ bonsaiId: bonsai?._id || '' })
          e.stopPropagation()
        }}
        className="cursor-pointer"
      >
        <PlusIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}

export default EntriesListHeaderMenuActions

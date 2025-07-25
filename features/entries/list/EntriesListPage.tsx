import { useRouter } from 'next/router'
import { useBonsai } from '@/hooks/useBonsai'
import { useEntry } from '@/hooks/useEntry'
import { useNavigation } from '@/hooks/useNavegation'
import BonsaiNotFound from './BonsaiNotFound'
import EntriesListContent from './components/Content'
import EntriesListHeader from './components/Header'
import { useDeleteEntry, useFavorite } from './hooks'

const EntriesListPage = () => {
  const router = useRouter()
  const { bonsaiId } = router.query as { bonsaiId: string }

  const {
    bonsai,
    loading: bonsaiLoading,
    setBonsai,
    error: bonsaiError,
  } = useBonsai(bonsaiId)
  const { entries, loading: entriesLoading, setEntries } = useEntry(bonsai?._id)
  const { toggleFavorite } = useFavorite({ setBonsai, bonsai })
  const { deleteEntry } = useDeleteEntry({ bonsaiId: bonsaiId, setEntries })
  const { handleEdit, handleAddEntry } = useNavigation()

  if (bonsaiError || (!bonsai && !bonsaiLoading)) return <BonsaiNotFound />

  return (
    <div className="flex flex-col gap-2 mt-5">
      <EntriesListHeader
        bonsai={bonsai}
        bonsaiLoading={bonsaiLoading}
        entriesLoading={entriesLoading}
        handleFavorite={toggleFavorite}
        handleEdit={handleEdit}
        handleAddEntry={handleAddEntry}
      />
      <EntriesListContent
        entries={entries}
        entriesLoading={entriesLoading}
        handleDelete={deleteEntry}
      />
    </div>
  )
}

export default EntriesListPage

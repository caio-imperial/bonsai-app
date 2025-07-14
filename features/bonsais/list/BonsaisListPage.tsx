import {
  useDelete,
  useFavorite,
  useSearch,
} from '@/features/bonsais/list/hooks'
import { useNavigation } from '@/hooks/useNavegation'
import BonsaisContent from './components/Content'
import BonsaisFooter from './components/Footer'
import BonsaisHeader from './components/Header'
import BonsaisSearch from './components/Search'

const BonsaisListPage = () => {
  const {
    search,
    handleSearch,
    bonsais,
    setBonsais,
    loading,
    params,
    meta,
    handlePageChange,
  } = useSearch()
  const { toggleFavorite } = useFavorite({ setBonsais })
  const { deleteBonsai } = useDelete({ setBonsais })
  const { handleClick, handleEdit } = useNavigation()

  return (
    <div className="h-screen w-full flex flex-col gap-4 md:gap-2 justify-start items-center">
      <div className="mt-4">
        <BonsaisHeader />
      </div>
      <div className="flex gap-2 w-full">
        <BonsaisSearch
          search={search}
          handleSearch={handleSearch}
          loading={loading}
        />
      </div>

      <div className="grow w-full flex flex-col gap-4 items-between justify-between">
        <BonsaisContent
          loading={loading}
          search={search}
          bonsais={bonsais}
          handleClick={handleClick}
          handleDelete={deleteBonsai}
          handleEdit={handleEdit}
          handleFavorite={toggleFavorite}
        />
      </div>
      <BonsaisFooter
        meta={meta}
        params={params}
        handlePageChange={handlePageChange}
      />
    </div>
  )
}

export default BonsaisListPage

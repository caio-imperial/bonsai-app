import BonsaiHeader from "@/features/Bonsai/components/Header";
import BonsaiSearch from "@/features/Bonsai/components/Search";
import { useFavorite, useDelete, useSearch, useBonsaiNavigation } from "@/features/Bonsai/hooks";
import BonsaiFooter from "./components/Footer";
import BonsaiContent from "./components/Content";


function BonsaiView() {
  const { search, handleSearch, bonsais, setBonsais, loading, params, meta, handlePageChange } = useSearch();
  const { toggleFavorite } = useFavorite({ setBonsais });
  const { deleteBonsai } = useDelete({ setBonsais });
  const { handleClick, handleEdit } = useBonsaiNavigation();

  return (
    <div className="h-screen w-full flex flex-col gap-4 md:gap-2 justify-start items-center">
      <div className="mt-4">
        <BonsaiHeader />
      </div>
      <div className="flex gap-2 w-full max-w-[1000px]">
        <BonsaiSearch
          search={search}
          handleSearch={handleSearch}
          loading={loading}
        />
      </div>

      <div className="grow flex flex-col gap-4 items-between justify-between">
        <BonsaiContent
          loading={loading}
          search={search}
          bonsais={bonsais}
          handleClick={handleClick}
          handleDelete={deleteBonsai}
          handleEdit={handleEdit}
          handleFavorite={toggleFavorite}
        />
      </div>
      <BonsaiFooter
        meta={meta}
        params={params}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default BonsaiView;

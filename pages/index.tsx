// pages/index.tsx
import { useCallback, useState } from "react";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import CardBonsai from "@/components/Card/Bonsai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useBonsais } from "@/hooks/useBonsais";
import { useRouter } from "next/router";
import { useDeleteBonsai } from "@/hooks/useDeleteBonsai";
import { useConfirm } from "@/context/ConfirmContext";
import { useUpdateBonsai } from "@/hooks/useUpdateBonsai";
import { useDebounce } from "@/hooks/useDebounce";
import { BonsaiPagination } from "@/components/Bonsai/components/pagination";
export default function Home() {
  const { bonsais, loading, setBonsais, params, setParams, meta } = useBonsais({
    initialParams: {
      limit: 9,
    }
  });
  const [search, setSearch] = useState("");
  const { deleteBonsai } = useDeleteBonsai();
  const { updateBonsai } = useUpdateBonsai();
  const { push } = useRouter();
  const { showConfirm } = useConfirm();

  const initLoading = loading && params.search.length === 0;

  const debouncedFetchBonsais = useDebounce((search: string) => {
    setParams(prevParams => ({ ...prevParams, search }));
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedFetchBonsais(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setParams(prevParams => ({ ...prevParams, page }));
  };

  const handleDelete = useCallback((bonsaiId: string) => {
    showConfirm({
      title: "Tem certeza que deseja deletar este bonsai?",
      message: "Essa ação não poderá ser desfeita.",
      confirmText: "Deletar",
      cancelText: "Cancelar",
      onConfirm: () => {
        deleteBonsai(bonsaiId);
        setBonsais(prevBonsais => prevBonsais.filter((bonsai) => bonsai._id !== bonsaiId));
      }
    });
  }, [deleteBonsai, setBonsais, showConfirm]);

  const handleClick = useCallback((bonsaiId: string) => push(`/bonsais/${bonsaiId}`), [push]);

  const handleEdit = useCallback((bonsaiId: string) => {
    push(`/bonsais/${bonsaiId}/edit`);
  }, [push]);

  const handleFavorite = useCallback(({ _id, favorite }: { _id: string, favorite: boolean }) => {
    updateBonsai({ _id, favorite });
    setBonsais(prevBonsais => {
      const newBonsais = prevBonsais.map(
        (bonsai) => bonsai._id === _id ? { ...bonsai, favorite } : bonsai
      );
      return newBonsais;
    });
  }, [updateBonsai, setBonsais]);

  return (
    <div className="h-screen w-full flex flex-col gap-4 md:gap-2 justify-start items-center">
      <div className="mt-4">
        <TypographyH1>🌱 Meus Bonsais</TypographyH1>
      </div>

      <div className="flex gap-2 w-full max-w-[1000px]">
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
      </div>

      <div className="grow flex flex-col gap-4 items-between justify-between">
        {loading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-27" />
            ))}
          </>
        ) :
          search.length > 0 && bonsais.length === 0 ? (
            <TypographyH3 className="col-span-full text-center mt-10">Nenhum bonsai encontrado</TypographyH3>
          ) : (
            bonsais.length === 0 ? (
              <TypographyH3 className="col-span-full text-center mt-10">Você ainda não tem nenhum bonsai cadastrado</TypographyH3>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in-0 duration-300">
                {bonsais.map((bonsai) => {
                  return (
                    <CardBonsai
                      key={bonsai._id}
                      bonsai={bonsai}
                      className="cursor-pointer "
                      handleClick={handleClick}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      handleFavorite={handleFavorite}
                    />
                  );
                })}
              </div>
            ))}
      </div>
            {bonsais.length !== 0 ? (
              <BonsaiPagination
                totalPages={meta.totalPages}
                currentPage={params.page}
                onPageChange={handlePageChange}
              />
            ) : null}
    </div>
  );
}

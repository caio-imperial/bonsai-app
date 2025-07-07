// pages/index.tsx
import { useCallback } from "react";
import { TypographyH1 } from "@/components/ui/typography";
import { MemoCardBonsai } from "@/components/Card/Bonsai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useBonsais } from "@/hooks/useBonsais";
import { useSearch } from "@/hooks/useSearch";
import { useRouter } from "next/router";
import { useDeleteBonsai } from "@/hooks/useDeleteBonsai";

export default function Home() {
  const { bonsais, loading, setBonsais } = useBonsais();
  const { search, setSearch, filtered } = useSearch(bonsais);
  const { deleteBonsai } = useDeleteBonsai();
  const { push } = useRouter();

  const handleDelete = (bonsaiId: string) => {
    deleteBonsai(bonsaiId);
    setBonsais(bonsais.filter((bonsai) => bonsai._id !== bonsaiId));
  }

  const handleEdit = useCallback((bonsaiId: string) => {
    push(`/bonsais/${bonsaiId}/edit`);
  }, [push]);

  return (
    <main className="w-full flex flex-col gap-4 mt-8">
      <div className="mb-4">
        <TypographyH1>🌱 Meus Bonsais</TypographyH1>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Nome do bonsai"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={loading}
        />
        <Button
          className="cursor-pointer hover:bg-primary/90"
          variant="default"
          size="icon"
          disabled={loading}
          asChild
        >
          <Link href="/bonsais/new">
            <PlusIcon className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in-0 duration-300">
        {loading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-27" />
            ))}
          </>
        ) : (
          bonsais.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">Você ainda não tem nenhum bonsai cadastrado 😢</p>
          ) : (
            <>
              {filtered.map((bonsai) => (
                <MemoCardBonsai
                  key={bonsai._id}
                  name={bonsai.name}
                  species={bonsai.species}
                  bonsaiId={bonsai._id}
                  className="cursor-pointer"
                  onClick={() => push(`/bonsais/${bonsai._id}`)}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
            </>
          ))}
      </div>
    </main>
  );
}

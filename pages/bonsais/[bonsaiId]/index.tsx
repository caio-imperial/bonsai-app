// pages/bonsai/[id].tsx
import { useRouter } from "next/router";
import Link from "next/link";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyMuted, TypographyH1 } from "@/components/ui/typography";
import { ArrowLeftIcon, PencilIcon, PlusIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEntry } from "@/hooks/useEntry";
import { useDeleteEntry } from "@/hooks/useDeleteEntry";
import { toast } from "sonner";
import { useBonsai } from "@/hooks/useBonsai";
import { useConfirm } from "@/context/ConfirmContext";
import { useCallback } from "react";

export default function TimelinePage() {
  const router = useRouter();
  const { bonsaiId } = router.query;

  const { entries, loading: entriesLoading, setEntries } = useEntry(bonsaiId as string | undefined);
  const { bonsai, loading: bonsaiLoading } = useBonsai(bonsaiId as string | undefined);
  const { deleteEntry, error } = useDeleteEntry();
  const { showConfirm } = useConfirm();

  const handleDelete = useCallback((id: string) => {
    showConfirm({
      title: "Tem certeza que deseja deletar este registro?",
      message: "Essa ação não poderá ser desfeita.",
      onConfirm: () => {
        deleteEntry(bonsaiId as string, id);
        if (error) toast.error(error);
        else toast.success("Registro deletado com sucesso!");
        setEntries(entries?.filter((entry) => entry?._id !== id) || []);
      }
    });
  }, [bonsaiId, deleteEntry, error, setEntries, showConfirm]);

  const handleEdit = () => {
    router.push(`/bonsais/${bonsaiId}/edit`);
  };

  const handleAddEntry = () => {
    router.push(`/bonsais/${bonsaiId}/entries`);
  };

  return (
    <div className="flex flex-col gap-2 mt-5">
      <Link href="/">
        <ArrowLeftIcon className="w-6 h-6" />
      </Link>
      <div className="flex justify-between gap-2">
        <div className="w-full">
          {bonsaiLoading ? (
            <>
              <Skeleton className="w-full h-4 mb-1" />
              <Skeleton className="w-full h-8" />
            </>
          ) : (
            <>
              {bonsai?.species && (
                <TypographyMuted>
                  {bonsai.species}
                </TypographyMuted>
              )}
              <TypographyH3>{bonsai?.name}</TypographyH3>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" disabled={entriesLoading} onClick={handleEdit}>
            <PencilIcon className="w-4 h-4" /> Editar
          </Button>
          <Button variant="secondary" disabled={entriesLoading} onClick={handleAddEntry}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {entriesLoading ? (
        <>
          <Skeleton className="w-full h-96" />
        </>
      ) : entries && entries.length === 0 ? (
        <TypographyH1>Nenhum registro ainda 😢</TypographyH1>
      ) : (
        <Timeline
          entries={entries || []}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

import { useCallback } from "react";
import { useDeleteEntry as useDeleteEntryApi } from "@/hooks/useDeleteEntry";

import { useConfirm } from "@/context/ConfirmContext";
import { Entry } from "@/types/entry";

type useDeleteProps = {
  bonsaiId: string;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
};

export function useDeleteEntry({ bonsaiId, setEntries }: useDeleteProps) {
    const { deleteEntry: deleteEntryApi, loading, error } = useDeleteEntryApi();
    const { showConfirm } = useConfirm();

    const deleteEntry = useCallback(async (entryId: string) => {
      showConfirm({
        title: "Tem certeza que deseja deletar este registro?",
        message: "Essa ação não poderá ser desfeita.",
        confirmText: "Deletar",
        cancelText: "Cancelar",
        onConfirm: () => {
          deleteEntryApi(bonsaiId, entryId);
          setEntries(prevEntries => prevEntries.filter((entry) => entry._id !== entryId));
        }
      });
    }, [deleteEntryApi, setEntries, showConfirm]);

    return { deleteEntry, loading, error };
}

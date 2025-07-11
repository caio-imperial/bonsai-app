import { useCallback } from "react";
import { useUpdateBonsai } from "@/hooks/useUpdateBonsai";

import { Bonsai } from "@/types/bonsai";

type useFavoriteProps = {
  setBonsai: React.Dispatch<React.SetStateAction<Bonsai | null>>;
  bonsai: Bonsai | null;
};

type ToggleFavoriteProps = {
  bonsaiId: string;
  favorite: boolean;
};

export function useFavorite({ setBonsai, bonsai }: useFavoriteProps) {
    const { updateBonsai, loading, error } = useUpdateBonsai();

    const toggleFavorite = useCallback(async ({bonsaiId, favorite}: ToggleFavoriteProps) => {
      if (!bonsai) return;
        try {
          await updateBonsai({ _id: bonsaiId, favorite: !favorite });
    
          setBonsai({ ...bonsai, favorite: !favorite });
        } catch (e) {
          console.error("Erro ao favoritar bonsai", e);
        }
      }, [updateBonsai, setBonsai, bonsai]);

    return { toggleFavorite, loading, error };
}

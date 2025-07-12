import { useCallback } from "react";
import { useUpdateBonsai } from "@/hooks/useUpdateBonsai";

import { Bonsai } from "@/types/bonsai";

type useFavoriteProps = {
  setBonsais: React.Dispatch<React.SetStateAction<Bonsai[]>>;
};

type ToggleFavoriteProps = {
  _id: string;
  favorite: boolean;
};

export function useFavorite({ setBonsais }: useFavoriteProps) {
    const { updateBonsai, loading, error } = useUpdateBonsai();

    const toggleFavorite = useCallback(async ({_id, favorite}: ToggleFavoriteProps) => {
        try {
          await updateBonsai({ _id, favorite: !favorite });
    
          setBonsais(prev =>
            prev.map(bonsai => bonsai._id === _id ? { ...bonsai, favorite: !favorite } : bonsai)
          );
        } catch (e) {
          console.error("Erro ao favoritar bonsai", e);
        }
      }, [updateBonsai, setBonsais]);

    return { toggleFavorite, loading, error };
}

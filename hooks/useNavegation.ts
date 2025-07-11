import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useNavigation() {
    const { push } = useRouter();
  
    const handleClick = useCallback(({bonsaiId}: {bonsaiId: string}) => {
      push(`/bonsais/${bonsaiId}`);
    }, [push]);
  
    const handleEdit = useCallback(({bonsaiId}: {bonsaiId: string}) => {
      push(`/bonsais/${bonsaiId}/edit`);
    }, [push]);

    const handleAddEntry = useCallback(({bonsaiId}: {bonsaiId: string}) => {
      push(`/bonsais/${bonsaiId}/entries`);
    }, [push]);
  
    return { handleClick, handleEdit, handleAddEntry };
  }
  
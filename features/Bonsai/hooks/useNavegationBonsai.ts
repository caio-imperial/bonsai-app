import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useBonsaiNavigation() {
    const { push } = useRouter();
  
    const handleClick = useCallback((bonsaiId: string) => {
      push(`/bonsais/${bonsaiId}`);
    }, [push]);
  
    const handleEdit = useCallback((bonsaiId: string) => {
      push(`/bonsais/${bonsaiId}/edit`);
    }, [push]);
  
    return { handleClick, handleEdit };
  }
  
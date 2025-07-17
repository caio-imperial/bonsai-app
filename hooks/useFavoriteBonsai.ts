import { useCallback } from 'react'
import { useUpdateBonsai } from './useUpdateBonsai'

export function useFavoriteBonsai() {
  const { updateBonsai, loading, error } = useUpdateBonsai()

  const favoriteBonsai = useCallback(
    async ({ _id, favorite }: { _id: string; favorite: boolean }) => {
      await updateBonsai({ _id, favorite })
    },
    [updateBonsai]
  )

  return { favoriteBonsai, loading, error }
}

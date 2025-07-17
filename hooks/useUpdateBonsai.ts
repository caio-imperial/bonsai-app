import { useCallback, useState } from 'react'
import type { Bonsai } from '@/types/bonsai'

export function useUpdateBonsai() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const updateBonsai = useCallback(async (bonsai: Partial<Bonsai>) => {
    if (!bonsai || !bonsai._id) {
      setError('Bonsai não encontrado')
      return
    }
    setLoading(true)
    setError(null)
    const { name, species, favorite } = bonsai
    try {
      await fetch(`/api/bonsais/${bonsai._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          species,
          favorite,
        }),
      })
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Erro inesperado ao atualizar'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, updateBonsai }
}

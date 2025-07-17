import { useCallback, useState } from 'react'

export function useDeleteEntry() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteEntry = useCallback(async (bonsaiId: string, entryId: string) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/bonsais/${bonsaiId}/entries/${entryId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Erro ao deletar registro 😢')
      }

      // Aqui você pode avisar o pai ou atualizar a UI
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Erro inesperado ao deletar'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  return { deleteEntry, loading, error }
}

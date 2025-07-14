import { useCallback, useState } from 'react'

export function useDeleteBonsai() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteBonsai = useCallback(async (bonsaiId: string) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/bonsais/${bonsaiId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Erro ao deletar registro 😢')
      }

      // Aqui você pode avisar o pai ou atualizar a UI
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Erro inesperado ao deletar')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return { deleteBonsai, loading, error }
}

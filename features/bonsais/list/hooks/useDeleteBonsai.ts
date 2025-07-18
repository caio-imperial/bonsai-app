import { useCallback } from 'react'
import { useConfirm } from '@/context/ConfirmContext'
import { useDeleteBonsai } from '@/hooks/useDeleteBonsai'
import type { Bonsai } from '@/types/bonsai'

type useDeleteProps = {
  setBonsais: React.Dispatch<React.SetStateAction<Bonsai[]>>
}

export function useDelete({ setBonsais }: useDeleteProps) {
  const { deleteBonsai: deleteBonsaiApi, loading, error } = useDeleteBonsai()
  const { showConfirm } = useConfirm()

  const deleteBonsai = useCallback(
    async ({ bonsaiId }: { bonsaiId: string }) => {
      showConfirm({
        title: 'Tem certeza que deseja deletar este bonsai?',
        message: 'Essa ação não poderá ser desfeita.',
        confirmText: 'Deletar',
        cancelText: 'Cancelar',
        onConfirm: () => {
          deleteBonsaiApi(bonsaiId)
          setBonsais(prevBonsais =>
            prevBonsais.filter(bonsai => bonsai._id !== bonsaiId)
          )
        },
      })
    },
    [deleteBonsaiApi, setBonsais, showConfirm]
  )

  return { deleteBonsai, loading, error }
}

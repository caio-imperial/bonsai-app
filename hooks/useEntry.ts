import { useEffect, useState } from 'react'
import type { Entry, EntryResponse } from '@/types/entry'

export function useEntry(bonsaiId?: string | undefined) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bonsaiId) return

    async function fetchEntries() {
      const res = await fetch(`/api/bonsais/${bonsaiId}/entries`)
      const data: EntryResponse = await res.json()
      if (data) {
        setEntries(data)
      }
      setLoading(false)
    }

    fetchEntries()
  }, [bonsaiId])

  return { entries, loading, setEntries }
}

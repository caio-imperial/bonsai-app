import { useEffect, useState } from "react"
import { EntryResponse } from "@/types/entry"

export function useEntry(bonsaiId?: string | undefined) {
  const [entries, setEntries] = useState<EntryResponse | null>(null)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    if (!bonsaiId) return;
    
    async function fetchEntries() {
      const res = await fetch(`/api/bonsais/${bonsaiId}/entries`)
      const data = await res.json()
      setEntries(data)
      setLoading(false)
    }

    fetchEntries()
  }, [bonsaiId])

  return { entries, loading, setEntries }
}
import { useEffect, useState } from "react"
import { Bonsai } from "@/types/bonsai"

export function useBonsai( bonsaiId?: string | undefined ) {
  const [bonsai, setBonsais] = useState<Bonsai | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bonsaiId) return;

    async function fetchBonsai() {
      const res = await fetch(`/api/bonsais/${bonsaiId}`)
      const data = await res.json()
      setBonsais(data)
      setLoading(false);
    }

    fetchBonsai()
  }, [ bonsaiId ])

  return { bonsai, loading, setBonsais }
}

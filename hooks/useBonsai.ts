import { useEffect, useState } from "react"
import { Bonsai } from "@/types/bonsai"

export function useBonsai(bonsaiId?: string | undefined) {
  const [bonsai, setBonsai] = useState<Bonsai | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<{ error: string, message: string } | null>(null)

  useEffect(() => {
    if (!bonsaiId) return;

    async function fetchBonsai() {
      try {
        const res = await fetch(`/api/bonsais/${bonsaiId}`)
        const data = await res.json()
        if (res.ok) {
          setBonsai(data)
          setLoading(false);
        } else {
          setError(data)
        }
      } catch (error: any) {
        setError(error)
        console.error(error)
      }
    }
    fetchBonsai()
  }, [bonsaiId])

  return { bonsai, setBonsai, error, loading }
}

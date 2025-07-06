import { useEffect, useState } from "react"
import { Bonsai } from "@/types/bonsai"

export function useBonsais() {
  const [bonsais, setBonsais] = useState<Bonsai[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBonsais() {
      const res = await fetch("/api/bonsais")
      const data = await res.json()
      setBonsais(data)
      setLoading(false)
    }

    fetchBonsais()
  }, [])

  return { bonsais, loading, setBonsais }
}

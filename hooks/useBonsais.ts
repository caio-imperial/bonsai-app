import { useEffect, useState } from 'react'
import type { Bonsai, BonsaisResponse } from '@/types/bonsai'

export interface UseBonsaisProps {
  initialParams?: {
    search?: string
    page?: number
    limit?: number
  }
}

export function useBonsais({ initialParams }: UseBonsaisProps) {
  const initialSearch = initialParams?.search || ''
  const initialPage = initialParams?.page || 1
  const initialLimit = initialParams?.limit || 10
  const [bonsais, setBonsais] = useState<Bonsai[]>([])
  const [meta, setMeta] = useState<BonsaisResponse['meta']>({
    total: 0,
    page: initialPage,
    limit: initialLimit,
    totalPages: 0,
    nextPage: 1,
    previousPage: 1,
  })
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState({
    search: initialSearch,
    page: initialPage,
    limit: initialLimit,
  })

  useEffect(() => {
    async function fetchBonsais() {
      const res = await fetch(
        `/api/bonsais?search=${params.search}&page=${params.page}&limit=${params.limit}`
      )
      const { data, meta }: BonsaisResponse = await res.json()
      setBonsais(data)
      setMeta(meta)
      setLoading(false)
    }

    setLoading(true)
    fetchBonsais()
  }, [params])

  return { bonsais, setBonsais, loading, params, setParams, meta }
}

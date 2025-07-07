import { useMemo, useState } from "react"
import { Bonsai } from "@/types/bonsai"
import { normalizeString } from "@/lib/utils"

export function useSearch(data: Bonsai[]) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    const searchTerm = normalizeString(search)
    return data
      .map((item) => ({
        ...item,
        name: item.name?.toLowerCase() || 'não informado',
      }))
      .filter((item) => normalizeString(item.name).includes(searchTerm))
  }, [data, search])

  return { search, setSearch, filtered }
}

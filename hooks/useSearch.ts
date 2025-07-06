import { useState } from "react"
import { Bonsai } from "@/types/bonsai"

export function useSearch(data: Bonsai[]) {
  const [search, setSearch] = useState("")

  if (!data) return { search, setSearch, filtered: [] }
  
  const dataFormatted = data.map((item) => ({
    ...item,
    name: item.name?.toLowerCase() || "Não informado",
  }))

  const filtered = dataFormatted.filter((item) =>
    item.name.includes(search.toLowerCase())
  )

  return { search, setSearch, filtered }
}

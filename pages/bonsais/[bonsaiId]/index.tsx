// pages/bonsai/[id].tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Timeline from '@/components/Timeline'
import { Bonsai, Entry } from '@/types'

export default function TimelinePage() {
  const router = useRouter()
  const { bonsaiId } = router.query

  const [bonsai, setBonsai] = useState<Bonsai | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    if (!bonsaiId) return

    fetch(`/api/bonsais/${bonsaiId}`)
      .then((res) => res.json())
      .then((data) => {
        setBonsai(data.bonsai)
        setEntries(data.entries)
      })
  }, [bonsaiId])

  if (!bonsai) return <p className="container mt-5">Carregando bonsai... 🌿</p>

  function handleDelete(entryId: string) {
    fetch(`/api/bonsais/${bonsaiId}/entries/${entryId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setEntries(entries.filter((entry) => entry._id !== entryId))
        }
      })
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-1">{bonsai.name}</h1>
      {bonsai.species && <p className="text-muted">{bonsai.species}</p>}

      <Link href={`/bonsais/${bonsaiId}/entries`} className="btn btn-primary my-4">
        Adicionar registro
      </Link>

      {entries.length === 0 ? (
        <p>Nenhum registro ainda 😢</p>
      ) : (
        <Timeline entries={entries} handleDelete={handleDelete} />
      )}
    </div>
  )
}

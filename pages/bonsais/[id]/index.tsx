// pages/bonsai/[id].tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

type Entry = {
  _id: string
  imageUrl: string
  note: string
  dateEntry: string
}

type Bonsai = {
  nome: string
  especie: string
}

export default function Timeline() {
  const router = useRouter()
  const { id } = router.query

  const [bonsai, setBonsai] = useState<Bonsai | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    if (!id) return

    fetch(`/api/bonsais/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBonsai(data.bonsai)
        setEntries(data.entries)
      })
  }, [id])

  if (!bonsai) return <p className="container mt-5">Carregando bonsai... 🌿</p>

  return (
    <div className="container mt-5">
      <h1 className="mb-1">{bonsai.nome}</h1>
      {bonsai.especie && <p className="text-muted">{bonsai.especie}</p>}

      <Link href={`/bonsais/${id}/entries`} className="btn btn-primary my-4">
        Adicionar registro
      </Link>

      {entries.length === 0 ? (
        <p>Nenhum registro ainda 😢</p>
      ) : (
        <div className="row">
          {entries.map((entry) => (
            <div className="col-md-4 mb-4" key={entry._id}>
              <div className="card h-100 shadow-sm">
                <Image
                  src={entry.imageUrl}
                  className="card-img-top"
                  alt="Registro"
                />
                <div className="card-body">
                  <p className="card-text">{entry.note}</p>
                  <p className="text-muted small mb-0">
                    {new Date(entry.dateEntry).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

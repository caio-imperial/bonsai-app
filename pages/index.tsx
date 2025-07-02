// pages/index.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Bonsai = {
  _id: string
  nome: string
  especie?: string
}

export default function Home() {
  const [bonsais, setBonsais] = useState<Bonsai[]>([])

  useEffect(() => {
    fetch('/api/bonsais')
      .then((res) => res.json())
      .then((data) => setBonsais(data))
  }, [])

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    console.log(id)
    await fetch(`/api/bonsais/${id}`, {
      method: 'DELETE',
    })
    setBonsais(bonsais.filter((bonsai) => bonsai._id !== id))
  }

  return (
    <div className="container">
      <h1 className="mb-4">🌱 Meus Bonsais</h1>

      <Link href="/bonsais/new" className="btn btn-primary mb-4">
        Novo Bonsai
      </Link>

      {bonsais.length === 0 ? (
        <p>Você ainda não tem nenhum bonsai cadastrado 😢</p>
      ) : (
        <div className="list-group">
          {bonsais.map((bonsai) => (
            <Link
              href={`/bonsais/${bonsai._id}`}
              key={bonsai._id}
              className="list-group-item list-group-item-action"
            >
              <strong>{bonsai.nome}</strong>
              {bonsai.especie && <span className="text-muted"> — {bonsai.especie}</span>}
              <button
                onClick={(e) => handleDelete(e, bonsai._id)}
                className="btn btn-danger btn-sm float-end"
              >
                <i className="bi bi-trash" />
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

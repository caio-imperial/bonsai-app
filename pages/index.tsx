// pages/index.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Bonsai = {
  _id: string
  name: string
  species?: string
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">🌱 Meus Bonsais</h1>
        <Link href="/bonsais/new" className="btn btn-primary btn-sm">
          <i className="bi bi-plus" /> Novo Bonsai
        </Link>
      </div>

      {bonsais.length === 0 ? (
        <p>Você ainda não tem nenhum bonsai cadastrado 😢</p>
      ) : (
        <ul className="list-group">
          {bonsais.map((bonsai) => (
            <li key={bonsai._id} className="d-flex justify-content-between align-items-center list-group-item ">
              <Link
                href={`/bonsais/${bonsai._id}`}
                className="link-dark"
              >
                <strong>{bonsai.name}</strong>
                {bonsai.species && <span className="text-muted"> — {bonsai.species}</span>}
              </Link>
              <div className="btn-group me-2">
                <Link
                  href={`/bonsais/${bonsai._id}/edit`}
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-pencil" />
                </Link>
                <button
                  onClick={(e) => handleDelete(e, bonsai._id)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="bi bi-trash" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

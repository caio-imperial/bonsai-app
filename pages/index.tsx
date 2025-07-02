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

  return (
    <div className="container mt-5">
      <h1 className="mb-4">🌱 Meus Bonsais</h1>

      <Link href="/bonsais/new" className="btn btn-success mb-4">
        ➕ Novo Bonsai
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
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

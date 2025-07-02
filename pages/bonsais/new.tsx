// pages/novo-bonsai.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NewBonsai() {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await fetch('/api/bonsais', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, species }),
    })

    router.push('/')
  }

  return (
    <div className="mt-5">
      <h1 className="mb-4">Cadastrar novo bonsai</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Acer Palmatum"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Espécie (opcional)</label>
          <input
            type="text"
            className="form-control"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            placeholder="Ex: Maple Japonês"
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  )
}

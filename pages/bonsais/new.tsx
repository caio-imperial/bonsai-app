// pages/novo-bonsai.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function NovoBonsai() {
  const [nome, setNome] = useState('')
  const [especie, setEspecie] = useState('')
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)

    await fetch('/api/bonsais', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, especie }),
    })

    router.push('/')
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">➕ Cadastrar novo bonsai</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Acer Palmatum"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Espécie (opcional)</label>
          <input
            type="text"
            className="form-control"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            placeholder="Ex: Maple Japonês"
          />
        </div>

        <button className="btn btn-primary" disabled={carregando}>
          {carregando ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  )
}

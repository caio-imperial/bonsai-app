import { useRouter } from 'next/router'
import { useState } from 'react'

export default function NovoRegistro() {
  const router = useRouter()
  const { id } = router.query

  const [nota, setNota] = useState('')
  const [data, setData] = useState(new Date().toISOString().slice(0, 10))
  const [imagem, setImagem] = useState<File | null>(null)
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!imagem || !id) return

    setCarregando(true)

    const form = new FormData()
    form.append('imagem', imagem)
    form.append('nota', nota)
    form.append('data', data)
    form.append('bonsaiId', id.toString())

    await fetch('/api/registries', {
      method: 'POST',
      body: form,
    })

    router.push(`/bonsais/${id}`)
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">📸 Novo registro</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Imagem</label>
          <input
            type="file"
            className="form-control"
            required
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nota</label>
          <textarea
            className="form-control"
            rows={3}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data</label>
          <input
            type="date"
            className="form-control"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" disabled={carregando}>
          {carregando ? 'Salvando...' : 'Salvar registro'}
        </button>
      </form>
    </div>
  )
}

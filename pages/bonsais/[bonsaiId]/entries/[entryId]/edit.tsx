import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Entry } from '@/types'

interface EditEntry extends Entry {
  image: File | null
}

export default function EditEntry() {
  const router = useRouter()
  const { bonsaiId, entryId } = router.query

  const [entry, setEntry] = useState<EditEntry>({
    _id: entryId as string,
    bonsaiId: bonsaiId as string,
    imageUrl: '',
    createdAt: '',
    dateEntry: '',
    title: '',
    notes: '',
    image: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!entryId) return
    fetch(`/api/bonsais/${bonsaiId}/entries/${entryId}`)
      .then(res => res.json())
      .then(data => {
        setEntry(data.entry)
        setLoading(false)
      })
  }, [entryId, bonsaiId])

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEntry({ ...entry, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('dateEntry', entry.dateEntry)
    formData.append('notes', entry.notes)
    formData.append('title', entry.title)
    if (entry.image) {
      formData.append('image', entry.image)
    }
  
    await fetch(`/api/bonsais/${bonsaiId}/entries/${entryId}`, {
      method: 'PATCH',
      body: formData
    })
  
    router.push(`/bonsais/${bonsaiId}`)
  }

  if (loading) return <p className="text-center mt-4">Carregando registro... 🌱</p>

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Registro 🌿</h2>
      <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
        <div className="col-md-6">
          <label className="form-label">Data do registro</label>
          <input
            type="date"
            name="dateEntry"
            className="form-control"
            value={entry.dateEntry?.slice(0, 10)}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
            <label className="form-label">Nova imagem</label>
            <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    setEntry({ ...entry, image: e.target.files[0] })
                }
                }}
            />
        </div>

        <div className="col-12">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={entry.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Notas</label>
          <textarea
            name="notes"
            className="form-control"
            rows={4}
            value={entry.notes}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">Salvar</button>
            <Link href={`/bonsais/${bonsaiId}`} className="btn btn-outline-danger">Cancelar</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

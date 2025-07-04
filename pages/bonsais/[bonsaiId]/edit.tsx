import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function EditBonsai() {
  const router = useRouter()
  const { bonsaiId } = router.query

  const [bonsai, setBonsai] = useState({
    name: "",
    species: ""
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bonsaiId) return
    fetch(`/api/bonsais/${bonsaiId}`)
      .then((res) => res.json())
      .then((data) => {
        setBonsai(data.bonsai)
        setLoading(false)
      })
  }, [bonsaiId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBonsai({ ...bonsai, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/bonsais/${bonsaiId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bonsai)
    })
    router.push("/")
  }

  if (loading) return <p>Carregando seu bonsai... 🌿</p>

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar bonsai 🌱</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input
            name="name"
            value={bonsai.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Espécie</label>
          <input
            name="species"
            value={bonsai.species}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">Salvar</button>
          <Link href={`/bonsais/${bonsaiId}`} className="btn btn-outline-danger">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}

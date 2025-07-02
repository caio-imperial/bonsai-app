// pages/bonsai/[id].tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Registro = {
  _id: string
  imagemUrl: string
  nota: string
  data: string
}

type Bonsai = {
  nome: string
  especie: string
}

export default function LinhaDoTempo() {
  const router = useRouter()
  const { id } = router.query

  const [bonsai, setBonsai] = useState<Bonsai | null>(null)
  const [registros, setRegistros] = useState<Registro[]>([])

  useEffect(() => {
    if (!id) return

    fetch(`/api/bonsais/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBonsai(data.bonsai)
        setRegistros(data.registros)
      })
  }, [id])

  if (!bonsai) return <p className="container mt-5">Carregando bonsai... 🌿</p>

  return (
    <div className="container mt-5">
      <h1 className="mb-1">{bonsai.nome}</h1>
      {bonsai.especie && <p className="text-muted">{bonsai.especie}</p>}

      <Link href={`/bonsais/${id}/registries`} className="btn btn-success my-4">
        ➕ Adicionar Registro
      </Link>

      {registros.length === 0 ? (
        <p>Nenhum registro ainda 😢</p>
      ) : (
        <div className="row">
          {registros.map((registry) => (
            <div className="col-md-4 mb-4" key={registry._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={registry.imagemUrl}
                  className="card-img-top"
                  alt="Registro"
                />
                <div className="card-body">
                  <p className="card-text">{registry.nota}</p>
                  <p className="text-muted small mb-0">
                    {new Date(registry.data).toLocaleDateString('pt-BR')}
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

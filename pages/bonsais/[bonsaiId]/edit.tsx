import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { ArrowLeftIcon, Loader2Icon, PlusIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";

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
    const response = await fetch(`/api/bonsais/${bonsaiId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bonsai)
    })
    if (response.ok) {
      router.push("/")
    } else {
      const data = await response.json();
      toast(data.message || 'Erro ao atualizar bonsai');
    }
  }

  if (loading) return <p>Carregando seu bonsai... 🌿</p>

  return (
    <div className="flex flex-col gap-5 mt-5">
      <Link href="/">
        <ArrowLeftIcon className="w-6 h-6" />
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Editar bonsai</CardTitle>
            <CardDescription>
              Edite os dados do seu bonsai
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <Input
                type="text"
                name="name"
                value={bonsai.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Espécie (opcional)</label>
              <Input
                type="text"
                name="species"
                value={bonsai.species}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={loading}
              className="w-full cursor-pointer"
              variant="secondary"
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
                  Cadastrando...
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Cadastrar
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

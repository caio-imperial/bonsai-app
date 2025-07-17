import { ArrowLeftIcon, Loader2Icon, SaveIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useBonsai } from '@/hooks/useBonsai'

export default function EditBonsai() {
  const router = useRouter()
  const { bonsaiId } = router.query

  const { bonsai, loading, setBonsai } = useBonsai(
    bonsaiId as string | undefined
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (bonsai) {
      setBonsai({ ...bonsai, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/bonsais/${bonsaiId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bonsai),
    })
    if (response.ok) {
      router.push('/')
    } else {
      const data = await response.json()
      toast(data.message || 'Erro ao atualizar bonsai')
    }
  }

  if (loading) return <p>Carregando seu bonsai... 🌿</p>
  if (!bonsai) return <p>Bonsai não encontrado</p>
  return (
    <div className="flex flex-col gap-5 mt-5">
      <Link href="/">
        <ArrowLeftIcon className="w-6 h-6" />
      </Link>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Editar bonsai</CardTitle>
            <CardDescription>Edite os dados do seu bonsai</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                value={bonsai.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="species" className="text-sm font-medium">
                Espécie (opcional)
              </label>
              <Input
                id="species"
                type="text"
                name="species"
                value={bonsai.species}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              disabled={loading}
              className="cursor-pointer"
              variant="secondary"
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
                  Atualizando...
                </>
              ) : (
                <>
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Atualizar
                </>
              )}
            </Button>
            <Button
              disabled={loading}
              className="cursor-pointer"
              variant="destructive"
              asChild
            >
              <Link href="/">Cancelar</Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

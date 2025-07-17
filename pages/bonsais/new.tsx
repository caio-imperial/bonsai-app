import { ArrowLeftIcon, Loader2, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
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

export default function NewBonsai() {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const response = await fetch('/api/bonsais', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, species }),
    })

    if (response.ok) {
      const data = await response.json()
      router.push(`/bonsais/${data.id}`)
      setLoading(false)
    } else {
      const data = await response.json()
      setLoading(false)
      toast(data.message)
    }
  }

  return (
    <div className="flex flex-col gap-5 mt-5">
      <Link href="/">
        <ArrowLeftIcon className="w-6 h-6" />
      </Link>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Cadastrar bonsai</CardTitle>
            <CardDescription>
              Insira os dados do seu bonsai para começar a cuidar dele
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Nome
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
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
                value={species}
                onChange={e => setSpecies(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={loading}
              className="w-full cursor-pointer"
              variant="secondary"
              type="submit"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
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

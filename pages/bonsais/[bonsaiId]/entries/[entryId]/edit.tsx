import { ArrowLeftIcon, Loader2, SaveIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DatePickerWithTime } from '@/components/DatePickerWithTime'
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Entry } from '@/types'

interface EditEntry extends Omit<Entry, 'dateEntry'> {
  image: File | null
  dateEntry: Date
}

export default function EditEntry() {
  const router = useRouter()
  const { bonsaiId, entryId } = router.query

  const [entry, setEntry] = useState<EditEntry>({
    _id: entryId as string,
    bonsaiId: bonsaiId as string,
    imageUrl: '',
    createdAt: '',
    dateEntry: new Date(),
    title: '',
    notes: '',
    image: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!entryId || typeof entryId !== 'string') return // Ensure entryId is a valid string
    fetch(`/api/bonsais/${bonsaiId}/entries/${entryId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch entry')
        }
        return res.json()
      })
      .then(data => {
        setEntry({ ...data.entry, dateEntry: new Date(data.entry.dateEntry) })
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        toast('Erro ao carregar registro')
        setLoading(false) // Ensure loading is set to false on error
      })
  }, [entryId, bonsaiId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEntry({ ...entry, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('dateEntry', entry.dateEntry.toISOString())
    formData.append('notes', entry.notes)
    formData.append('title', entry.title)
    if (entry.image) {
      formData.append('image', entry.image)
    }

    const response = await fetch(
      `/api/bonsais/${bonsaiId}/entries/${entryId}`,
      {
        method: 'PATCH',
        body: formData,
      }
    )

    if (response.ok) {
      router.push(`/bonsais/${bonsaiId}`)
    } else {
      const data = await response.json()
      toast(data.message || 'Erro ao atualizar entrada')
    }
  }

  if (loading)
    return <p className="text-center mt-4">Carregando registro... 🌱</p>
  const dateEntry = new Date(entry.dateEntry)

  return (
    <div className="flex flex-col gap-5 mt-5">
      <Link href={`/bonsais/${bonsaiId}`}>
        <ArrowLeftIcon className="w-6 h-6" />
      </Link>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Editar registro</CardTitle>
            <CardDescription>
              Edite os dados de registro do seu bonsai
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Label>Data de registro</Label>
            <DatePickerWithTime
              initialDate={dateEntry}
              onDateChange={date => {
                if (date?.toISOString() !== entry.dateEntry.toISOString()) {
                  handleChange({
                    target: { name: 'dateEntry', value: date },
                  } as unknown as React.ChangeEvent<HTMLInputElement>)
                }
              }}
            />
            <Label htmlFor="title">Título</Label>
            <Input
              type="text"
              name="title"
              value={entry.title}
              onChange={handleChange}
            />
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              name="notes"
              value={entry.notes}
              onChange={handleChange}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              disabled={loading}
              type="submit"
              variant="secondary"
              className="cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Atualizando...
                </>
              ) : (
                <>
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
            <Button variant="destructive" className="cursor-pointer" asChild>
              <Link
                href={`/bonsais/${bonsaiId}`}
                className="flex items-center gap-2"
              >
                <XIcon className="w-4 h-4" />
                Cancelar
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

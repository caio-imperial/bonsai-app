import { ChevronsUpDown, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { TypographyH3 } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface EntriesListTimelineCardProps {
  bonsaiId: string
  entryId: string
  title: string
  note?: string
  dateEntry?: string
  imageUrl?: string
  className?: string
  handleDelete: (id: string) => void
}

const EntriesListTimelineCard = ({
  bonsaiId,
  entryId,
  title,
  note,
  dateEntry,
  imageUrl,
  className,
  handleDelete,
}: EntriesListTimelineCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  function formatDateForDisplay(date: string) {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
    })
  }
  return (
    <Card className={cn('w-full max-w-sm', className)}>
      <CardContent>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            width={350}
            height={350}
            className="w-full h-full max-h-86 rounded-t-lg"
          />
        )}
      </CardContent>
      <CardHeader>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex flex-col gap-2"
        >
          <CardTitle className="flex justify-between">
            <TypographyH3>{title}</TypographyH3>
            <CardAction>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  disabled={!note}
                >
                  <ChevronsUpDown />
                  <span className="sr-only">ToggleDescription</span>
                </Button>
              </CollapsibleTrigger>
            </CardAction>
          </CardTitle>

          <CollapsibleContent className="flex flex-col gap-2">
            <CardDescription>
              <div
                className="card-text break-words"
                style={{ whiteSpace: 'pre-line' }}
              >
                {note}
              </div>
            </CardDescription>
          </CollapsibleContent>
        </Collapsible>
      </CardHeader>
      <CardFooter className="flex justify-between">
        {dateEntry && (
          <small className="text-body-secondary fw-bold">
            {formatDateForDisplay(dateEntry)}
          </small>
        )}
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/bonsais/${bonsaiId}/entries/${entryId}/edit`}>
              <Pencil />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={e => {
              handleDelete(entryId)
              e.stopPropagation()
            }}
            className="cursor-pointer"
          >
            <Trash />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default memo(EntriesListTimelineCard)

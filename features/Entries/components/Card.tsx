import {
  Card,
  CardContent,
  CardDescription,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { memo, useState } from "react";
import { ChevronsUpDown, Pencil, Trash } from "lucide-react";
import { TypographyH3 } from "@/components/ui/typography";
import Link from "next/link";

function EntryCard({
  bonsaiId,
  entryId,
  title,
  note,
  dateEntry,
  imageUrl,
  className,
  handleDelete,
}: {
  bonsaiId: string;
  entryId: string;
  title: string;
  note?: string;
  dateEntry?: string;
  imageUrl?: string;
  className?: string;
  handleDelete: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  function formatDateForDisplay(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
    });
  }
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardContent>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full max-h-86 rounded-t-lg"
        />
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
                style={{ whiteSpace: "pre-line" }}
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
          <Button variant="ghost" size="icon" onClick={(e) => { handleDelete(entryId); e.stopPropagation() }} className="cursor-pointer">
            <Trash />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default memo(EntryCard);

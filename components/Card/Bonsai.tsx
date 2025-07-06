import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteBonsai } from "@/hooks/useDeleteBonsai";
import Link from "next/link";

export function CardBonsai({ name, species, className, bonsaiId }: { name: string, species?: string, className?: string, bonsaiId: string }) {
  const { deleteBonsai, loading, error } = useDeleteBonsai();

  const handleDelete = (bonsaiId: string) => {
    deleteBonsai(bonsaiId);
  }

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle>
          {name}
        </CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon" className="cursor-pointer" asChild>
            <Link href={`/bonsais/${bonsaiId}/edit`}>
              <Pencil />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => handleDelete(bonsaiId)}>
            <Trash />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Label>
          <span>Espécie</span>
          <span>{species}</span>
        </Label>
      </CardFooter>
    </Card>
  )
}

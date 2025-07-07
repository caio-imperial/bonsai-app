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

type CardBonsaiProps = {
  name: string;
  species?: string;
  className?: string;
  bonsaiId: string;
  handleDelete: (bonsaiId: string) => void;
} & React.ComponentProps<"div">;

export function CardBonsai({ name, species, className, bonsaiId, handleDelete, ...props }: CardBonsaiProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader>
        <CardTitle>
          {name}
        </CardTitle>
        <CardAction>
          <Link href={`/bonsais/${bonsaiId}/edit`}>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Pencil />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="cursor-pointer" onClick={(e) => {handleDelete(bonsaiId); e.stopPropagation()}}>
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

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
import { useRouter } from "next/router";
import { memo } from "react";

type CardBonsaiProps = {
  name: string;
  species?: string;
  className?: string;
  bonsaiId: string;
  handleDelete: (bonsaiId: string) => void;
  handleEdit: (bonsaiId: string) => void;
} & React.ComponentProps<"div">;

function CardBonsai({ name, species, className, bonsaiId, handleDelete, handleEdit, ...props }: CardBonsaiProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader>
        <CardTitle>
          {name}
        </CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon" className="cursor-pointer" onClick={(e) => {handleEdit(bonsaiId); e.stopPropagation()}}>
            <Pencil />
          </Button>
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

const MemoCardBonsai = memo(CardBonsai);

export { MemoCardBonsai };

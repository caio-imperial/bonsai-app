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
import { memo } from "react";
import { Bonsai } from "@/types/bonsai";

type CardBonsaiProps = {
  bonsai: Bonsai;
  className?: string;
  handleClick: (bonsaiId: string) => void;
  handleDelete: (bonsaiId: string) => void;
  handleEdit: (bonsaiId: string) => void;
} & React.ComponentProps<"div">;

function CardBonsai({ bonsai, className, handleDelete, handleEdit, handleClick, ...props }: CardBonsaiProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props} onClick={(e) => {handleClick(bonsai._id); e.stopPropagation()}}>
      <CardHeader>
        <CardTitle>
          {bonsai.name}
        </CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon" className="cursor-pointer" onClick={(e) => {handleEdit(bonsai._id); e.stopPropagation()}}>
            <Pencil />
          </Button>
          <Button variant="ghost" size="icon" className="cursor-pointer" onClick={(e) => {handleDelete(bonsai._id); e.stopPropagation()}}>
            <Trash />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Label>
          <span>Espécie</span>
          <span>{bonsai.species}</span>
        </Label>
      </CardFooter>
    </Card>
  )
}

export default memo(CardBonsai);

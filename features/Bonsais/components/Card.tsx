import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "../../../components/ui/label";
import { cn } from "@/lib/utils";
import { Pencil, Star, StarHalf, Trash } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { memo } from "react";
import { Bonsai } from "@/types/bonsai";

type CardBonsaisProps = {
  bonsai: Bonsai;
  className?: string;
  handleClick: (bonsaiId: string) => void;
  handleDelete: (bonsaiId: string) => void;
  handleEdit: (bonsaiId: string) => void;
  handleFavorite: (bonsai: { _id: string, favorite: boolean }) => void;
} & React.ComponentProps<"div">;

function BonsaisCard({ bonsai, className, handleDelete, handleEdit, handleClick, handleFavorite, ...props }: CardBonsaisProps) {
  console.log('bonsai ', bonsai.name)
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props} onClick={(e) => { handleClick(bonsai._id); e.stopPropagation() }}>
      <CardHeader>
        <CardTitle>
          {bonsai.name}
        </CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon" className="cursor-pointer" onClick={(e) => { handleFavorite({ _id:bonsai._id, favorite: bonsai.favorite }); e.stopPropagation() }}>
            {bonsai.favorite ? <Star /> : <StarHalf />}
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Label>
          <span>Espécie</span>
          <span>{bonsai.species}</span>
        </Label>
        <div className="flex">
          <Button variant="ghost" size="icon" className="cursor-pointer" onClick={(e) => { handleEdit(bonsai._id); e.stopPropagation() }}>
            <Pencil />
          </Button>
          <Button variant="ghost" size="icon" className="cursor-pointer" onClick={(e) => { handleDelete(bonsai._id); e.stopPropagation() }}>
            <Trash />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default memo(BonsaisCard);

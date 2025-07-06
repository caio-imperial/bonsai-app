import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export function CardBonsai({name, species, className}: {name: string, species?: string, className?: string}) {
  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle>
            {name}
        </CardTitle>
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

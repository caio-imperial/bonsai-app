import { useRouter } from "next/router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Loader2, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DatePickerWithTime } from "@/components/DatePickerWithTime";
import { toast } from "sonner";

export default function NewEntry() {
  const router = useRouter();
  const { bonsaiId } = router.query;

  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [dateEntry, setDateEntry] = useState<Date>(new Date());
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const form = new FormData();
    if (image) {
      form.append("image", image);
    }
    form.append("notes", notes);
    form.append("title", title);
    form.append("dateEntry", dateEntry.toISOString());

    await fetch(`/api/bonsais/${bonsaiId}/entries`, {
      method: "POST",
      body: form,
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        toast.error(data.message);
      } else {
        router.push(`/bonsais/${bonsaiId}`);
      }
    });
    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 mt-5">
      <Link href="/">
        <ArrowLeftIcon className="w-6 h-6" />
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Cadastrar registro</CardTitle>
            <CardDescription>
              Insira os dados de registro do seu bonsai
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Imagem</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Título</Label>
              <Input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Observações</Label>
              <Textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Data de registro</Label>
              <DatePickerWithTime initialDate={dateEntry} onDateChange={setDateEntry} />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled={loading}
              className="w-full"
              onClick={handleSubmit}
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
  );
}

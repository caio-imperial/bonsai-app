// pages/bonsai/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Timeline from "@/components/Timeline";
import { Bonsai, Entry } from "@/types";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyMuted, TypographyH1 } from "@/components/ui/typography";
import { ArrowLeftIcon, PencilIcon, PlusIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TimelinePage() {
  const router = useRouter();
  const { bonsaiId } = router.query;

  const [bonsai, setBonsai] = useState<Bonsai | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bonsaiId) return;

    fetch(`/api/bonsais/${bonsaiId}`)
      .then((res) => res.json())
      .then((data) => {
        setBonsai(data.bonsai);
        setEntries(data.entries);
        setLoading(false);
      });
  }, [bonsaiId]);

  const handleDelete = (id: string) => {
    fetch(`/api/bonsais/${bonsaiId}/entries/${id}`, {
      method: "DELETE",
    }).then(() => {
        setEntries(entries.filter((entry) => entry._id !== id));
      });
  };

  return (
    <div className="flex flex-col gap-2 mt-5">
      <Link href="/">
        <ArrowLeftIcon className="w-6 h-6" />
      </Link>
      <div className="flex justify-between gap-2">
        <div className="w-full">
          {loading ? (
            <>
              <Skeleton className="w-full h-4 mb-1" />
              <Skeleton className="w-full h-8" />
            </>
          ) : (
            <>
              {bonsai?.species && (
                <TypographyMuted>
                  {bonsai.species}
                </TypographyMuted>
              )}
              <TypographyH3>{bonsai?.name}</TypographyH3>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" disabled={loading}>
            <Link href={`/bonsais/${bonsaiId}/edit`} className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4" /> Editar
            </Link>
          </Button>
          <Button variant="secondary" disabled={loading}>
            <Link href={`/bonsais/${bonsaiId}/entries`}>
              <PlusIcon className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
      {loading ? (
        <>
          <Skeleton className="w-full h-96" />
        </>
      ) : entries.length === 0 ? (
        <TypographyH1>Nenhum registro ainda 😢</TypographyH1>
      ) : (
        <Timeline
          entries={entries}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

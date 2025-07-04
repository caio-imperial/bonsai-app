// pages/bonsai/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Timeline from "@/components/Timeline";
import { Bonsai, Entry } from "@/types";
import { useConfirm } from "@/context/ConfirmContext";

export default function TimelinePage() {
  const router = useRouter();
  const { bonsaiId } = router.query;

  const { showConfirm } = useConfirm();
  const [bonsai, setBonsai] = useState<Bonsai | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (!bonsaiId) return;

    fetch(`/api/bonsais/${bonsaiId}`)
      .then((res) => res.json())
      .then((data) => {
        setBonsai(data.bonsai);
        setEntries(data.entries);
      });
  }, [bonsaiId]);

  if (!bonsai) return <p className="container mt-5">Carregando bonsai... 🌿</p>;

  function handleDelete(entryId: string) {
    showConfirm({
      title: "Excluir registro?",
      message: `Você tem certeza que deseja excluir esse registro?`,
      confirmText: "Sim, excluir",
      cancelText: "Cancelar",
      onConfirm: () => {
        fetch(`/api/bonsais/${bonsaiId}/entries/${entryId}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
            setEntries(entries.filter((entry) => entry._id !== entryId));
          }
        });
      },
    });
  }

  return (
    <div className="container mt-2 mb-5-md">
      <div className="d-grid gap-2 d-md-flex justify-content-md-between align-items-md-center mb-2 mb-md-4">
        <h3 className="mb-0">
          {bonsai.name}{" "}
          {bonsai.species && (
            <span className="text-muted"> — {bonsai.species}</span>
          )}
        </h3>
        <div className="btn-group">
          <Link
            href={`/bonsais/${bonsaiId}/edit`}
            className="btn btn-outline-primary"
          >
            <i className="bi bi-pencil" /> Editar
          </Link>
          <Link
            href={`/bonsais/${bonsaiId}/entries`}
            className="btn btn-primary"
          >
            <i className="bi bi-plus" /> Adicionar registro
          </Link>
        </div>
      </div>

      {entries.length === 0 ? (
        <p>Nenhum registro ainda 😢</p>
      ) : (
        <Timeline entries={entries} handleDelete={handleDelete} />
      )}
    </div>
  );
}

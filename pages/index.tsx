// pages/index.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { useConfirm } from "@/context/ConfirmContext";

type Bonsai = {
  _id: string;
  name: string;
  species?: string;
};

export default function Home() {
  const [bonsais, setBonsais] = useState<Bonsai[]>([]);
  const { showConfirm } = useConfirm();

  useEffect(() => {
    fetch("/api/bonsais")
      .then((res) => res.json())
      .then((data) => setBonsais(data));
  }, []);

  const handleDelete = async (
    e: React.MouseEvent,
    id: string,
    bonsaiName: string
  ) => {
    e.preventDefault();
    showConfirm({
      title: "Excluir bonsai?",
      message: `Você tem certeza que deseja excluir "${bonsaiName}"?`,
      confirmText: "Sim, excluir",
      cancelText: "Cancelar",
      onConfirm: () => {
        fetch(`/api/bonsais/${id}`, {
          method: "DELETE",
        });
        setBonsais(bonsais.filter((bonsai) => bonsai._id !== id));
      },
    });
  };

  return (
    <div className="container">
      <div className="d-grid gap-2 d-md-flex justify-content-md-between align-items-md-center mb-2 mb-md-4">
        <h1 className="mb-0">🌱 Meus Bonsais</h1>
        <Link href="/bonsais/new" className="btn btn-primary btn-sm">
          <i className="bi bi-plus" /> Novo Bonsai
        </Link>
      </div>

      {bonsais.length === 0 ? (
        <p>Você ainda não tem nenhum bonsai cadastrado 😢</p>
      ) : (
        <ul className="list-group">
          {bonsais.map((bonsai) => (
            <li
              key={bonsai._id}
              className="d-flex justify-content-between align-items-center list-group-item "
            >
              <Link href={`/bonsais/${bonsai._id}`} className="link-dark">
                <strong>{bonsai.name}</strong>
                {bonsai.species && (
                  <span className="text-muted"> — {bonsai.species}</span>
                )}
              </Link>
              <div className="btn-group me-2">
                <Link
                  href={`/bonsais/${bonsai._id}/edit`}
                  className="btn btn-primary btn-sm"
                >
                  <i className="bi bi-pencil" />
                </Link>
                <button
                  onClick={(e) => handleDelete(e, bonsai._id, bonsai.name)}
                  className="btn btn-danger btn-sm"
                >
                  <i className="bi bi-trash" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useRouter } from "next/router";
import { useState } from "react";

export default function NewEntry() {
  const router = useRouter();
  const { bonsaiId } = router.query;

  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [dateEntry, setDateEntry] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image || !bonsaiId) return;

    setLoading(true);

    const form = new FormData();
    form.append("image", image);
    form.append("notes", notes);
    form.append("title", title);
    form.append("dateEntry", dateEntry + "T12:00:00.000Z");

    await fetch(`/api/bonsais/${bonsaiId}/entries`, {
      method: "POST",
      body: form,
    });

    router.push(`/bonsais/${bonsaiId}`);
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">📸 Novo registro</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Imagem</label>
          <input
            type="file"
            className="form-control"
            required
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nota</label>
          <textarea
            className="form-control"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Data</label>
          <input
            type="date"
            className="form-control"
            value={dateEntry}
            onChange={(e) => setDateEntry(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Salvando..." : "Salvar registro"}
        </button>
      </form>
    </div>
  );
}

import { Entry } from "@/types";
import Link from "next/link";


function ActionMenu({ entry, handleDelete }: { entry: Entry, handleDelete: (id: string) => void }) {
  return (
    <div className="btn-group small text-muted btn-group-sm mb-1">
        <Link
          href={`/bonsais/${entry.bonsaiId}/entries/${entry._id}/edit`}
          className="btn btn-primary"
        >
          <i className="bi bi-pencil"></i>
        </Link>
        <button
          onClick={() => handleDelete(entry._id)}
          className="btn btn-danger"
        >
          <i className="bi bi-trash"></i>
        </button>
    </div>
  )
}

export const TimelineItem = ({
  entry,
  handleDelete,
}: {
  entry: Entry;
  handleDelete: (id: string) => void;
}) => {
  function formatDateForDisplay(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
    });
  }

  return (
    <> 
      <div className="d-flex align-items-center justify-content-between">
        <p className="mb-1">
          <small className="text-body-secondary fw-bold">
            {formatDateForDisplay(entry.dateEntry)}
          </small>
        </p>
        <ActionMenu entry={entry} handleDelete={handleDelete} />
      </div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={entry.imageUrl}
              className="img-fluid rounded-start"
              alt={entry.notes}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Action</h5>
              <p className="card-text">{entry.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

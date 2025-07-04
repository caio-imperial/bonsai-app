import { Entry } from "@/types";

export const TimelineItem = ({ entry, handleDelete }: { entry: Entry, handleDelete: (id: string) => void }) => {
    function formatDateForDisplay(date: string) {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
      });
    }
  
    return (
      <>
        <p className="ms-3 mb-1">
          <small className="text-body-secondary fw-bold">
            {formatDateForDisplay(entry.dateEntry)}
          </small>
        </p>
        <div className="card mb-3 position-relative">
          <div className="position-absolute bottom-0 end-0">
            <button type="button" className="btn btn-link btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-three-dots-vertical text-muted"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><button onClick={() => handleDelete(entry._id)} className="dropdown-item">Delete</button></li>
            </ul>
          </div>
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
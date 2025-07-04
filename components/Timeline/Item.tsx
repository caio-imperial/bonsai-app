import { Entry } from "@/types";

export const TimelineItem = ({ entry }: { entry: Entry }) => {
    function formatDateForDisplay(date: string) {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
      });
    }
  
    return (
      <div>
        <p className="ms-3 mb-1">
          <small className="text-body-secondary fw-bold">
            {formatDateForDisplay(entry.dateEntry)}
          </small>
        </p>
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
      </div>
    );
  };
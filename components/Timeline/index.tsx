import React from "react";
import styles from "./Timeline.module.scss";
import { mockEntries } from "./mockData";
import { Entry } from "@/types";
import { TreePine } from "lucide-react";
import { CardEntry } from "../Card/Entry";

const Timeline = ({
  entries = mockEntries,
  handleDelete,
}: {
  entries?: Entry[];
  handleDelete: (id: string) => void;
}) => {
  return (
    <div className={styles.mainTimeline}>
      {entries.map((entry, index) => (
        <div className={styles.timelineItem} key={index}>
          <div className={styles.timelineIcon}>
            <TreePine className="w-4 h-4" />
          </div>
          <div className={styles.timelineContent}>
            <CardEntry
              bonsaiId={entry.bonsaiId}
              entryId={entry._id}
              title={entry.title}
              note={entry.notes}
              imageUrl={entry.imageUrl}
              dateEntry={entry.dateEntry}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;

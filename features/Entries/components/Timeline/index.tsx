import React from "react";
import styles from "./Timeline.module.scss";
import { Entry } from "@/types";
import { TreePine } from "lucide-react";
import EntryCard from "../Card";

const Timeline = ({
  entries = [],
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
            <EntryCard
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

import React from "react";
import styles from "./Timeline.module.scss";
import { mockEntries } from "./mockData";
import { TimelineItem } from "./Item";
import { Entry } from "@/types";

const Timeline = ({ entries = mockEntries }: { entries?: Entry[] }) => {
  return (
    <div className={styles.mainTimeline}>
      {entries.map((event, index) => (
        <div className={styles.timelineItem} key={index}>
          <div className={styles.timelineIcon}>
            <i className="bi bi-tree-fill"></i>
          </div>
          <div className={styles.timelineContent}>
            <TimelineItem entry={event} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;

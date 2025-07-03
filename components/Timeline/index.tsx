import React from 'react';
import styles from './Timeline.module.scss';
import { mockEntries } from './mockData';

export type Entry = {
    _id: string
    imageUrl: string
    notes: string
    dateEntry: string
}

const Timeline = ({ entries = mockEntries }: { entries?: Entry[] }) => {
    return (
        <div className={styles.mainTimeline}>
            {entries.map((event, index) => (
                <div className={styles.timelineItem} key={index}>
                    <div className={styles.timelineIcon}>
                        <i className="bi bi-tree-fill"></i>
                    </div>
                    <div className={styles.timelineContent}>
                        <h5>{event.dateEntry}</h5>
                        <p>{event.notes}</p>
                        <img src={event.imageUrl} alt={event.note} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
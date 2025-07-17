import { TreePine } from 'lucide-react'

import type { Entry } from '@/types'
import EntriesListTimelineCard from './Card'
import styles from './Timeline.module.scss'

const EntriesListTimeline = ({
  entries = [],
  handleDelete,
}: {
  entries?: Entry[]
  handleDelete: (id: string) => void
}) => {
  return (
    <div className={styles.mainTimeline}>
      {entries.map(entry => (
        <div className={styles.timelineItem} key={entry._id}>
          <div className={styles.timelineIcon}>
            <TreePine className="w-4 h-4" />
          </div>
          <div className={styles.timelineContent}>
            <EntriesListTimelineCard
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
  )
}

export default EntriesListTimeline

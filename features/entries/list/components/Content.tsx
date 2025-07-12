import { EntryResponse } from "@/types/entry";
import EntriesListTimeline from "./Timeline";
import EntriesContentLoading from "./ContentLoading";
import EntriesContentEmpty from "./ContentEmpty";

interface EntriesListContentProps {
    entries: EntryResponse;
    entriesLoading: boolean;
    handleDelete: (entryId: string) => void;
}

const EntriesListContent = ({ entries, entriesLoading, handleDelete }: EntriesListContentProps) => {
    if (entriesLoading) return <EntriesContentLoading />;
    if (entries && entries.length === 0) return <EntriesContentEmpty />;
    return (
        <EntriesListTimeline
            entries={entries || []}
            handleDelete={handleDelete}
        />
    );
};

export default EntriesListContent;
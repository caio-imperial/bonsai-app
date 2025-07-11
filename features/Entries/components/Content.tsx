import { EntryResponse } from "@/types/entry";
import Timeline from "./Timeline";
import EntriesContentLoading from "./ContentLoading";
import EntriesContentEmpty from "./ContentEmpty";

interface EntriesContentProps {
    entries: EntryResponse;
    entriesLoading: boolean;
    handleDelete: (entryId: string) => void;
}

const EntriesContent = ({ entries, entriesLoading, handleDelete }: EntriesContentProps) => {
    if (entriesLoading) return <EntriesContentLoading />;
    if (entries && entries.length === 0) return <EntriesContentEmpty />;
    return (
        <Timeline
            entries={entries || []}
            handleDelete={handleDelete}
        />
    );
};

export default EntriesContent;
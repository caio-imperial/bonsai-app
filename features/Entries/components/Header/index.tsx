import { Bonsai } from "@/types";

import EntriesHeaderMenuActions from "./MenuActions";
import EntriesHeaderTitle from "./Title";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

interface EntriesHeaderProps {
    bonsai: Bonsai | null;
    bonsaiLoading: boolean;
    entriesLoading: boolean;
    handleFavorite: ({bonsaiId, favorite}: {bonsaiId: string, favorite: boolean}) => void;
    handleEdit: ({bonsaiId}: {bonsaiId: string}) => void;
    handleAddEntry: ({bonsaiId}: {bonsaiId: string}) => void;
}

const EntriesHeader = ({
    bonsai,
    bonsaiLoading,
    entriesLoading,
    handleFavorite,
    handleEdit,
    handleAddEntry
}: EntriesHeaderProps) => {

    return (
        <>
            <Link href="/">
                <ArrowLeftIcon className="w-6 h-6" />
            </Link>
            <div className="flex justify-between gap-2">
                <div className="w-full">
                    <EntriesHeaderTitle bonsai={bonsai} loading={bonsaiLoading} />
                </div>
                <EntriesHeaderMenuActions bonsai={bonsai} entriesLoading={entriesLoading} handleFavorite={handleFavorite} handleEdit={handleEdit} handleAddEntry={handleAddEntry} />
            </div>
        </>
    );
};

export default EntriesHeader;
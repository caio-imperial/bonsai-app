import { Skeleton } from "@/components/ui/skeleton";

const EntriesListHeaderTitleLoading = () => {
    return (
        <>
            <Skeleton className="w-full h-4 mb-1" />
            <Skeleton className="w-full h-8" />
        </>
    );
};


export default EntriesListHeaderTitleLoading;
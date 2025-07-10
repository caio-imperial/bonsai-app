import { Skeleton } from "@/components/ui/skeleton";

const BonsaiContentLoading = () => {
    return (
        <div className="col-span-full flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-27" />
            ))}
        </div>
    );
};

export default BonsaiContentLoading;
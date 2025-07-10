import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH3 } from "@/components/ui/typography";

const BonsaisContentLoading = () => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in-0 duration-300">
            <div className="col-span-full flex flex-col gap-4">
                {Array.from({ length: 1 }).map((_, index) => (
                    <Skeleton key={index} className="w-full h-96 flex items-center justify-center">
                        <TypographyH3 className="text-center">Carregando bonsais.🌱.🌱.🌱</TypographyH3>
                    </Skeleton>
                ))}
            </div>
        </div>
    );
};

export default BonsaisContentLoading;
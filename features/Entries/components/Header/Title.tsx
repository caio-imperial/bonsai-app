import { TypographyH3, TypographyMuted } from "@/components/ui/typography";

import { Bonsai } from "@/types";
import EntriesHeaderTitleLoading from "./TitleLoading";

interface EntriesHeaderTitleProps {
    bonsai: Bonsai;
    loading: boolean;
}

const EntriesHeaderTitle = ({ bonsai, loading }: EntriesHeaderTitleProps) => {
    if (loading) return <EntriesHeaderTitleLoading />;
    return (
        <>
            {bonsai?.species && (
                <TypographyMuted>
                    {bonsai.species}
                </TypographyMuted>
            )}
            <TypographyH3>{bonsai?.name}</TypographyH3>
        </>
    );
};


export default EntriesHeaderTitle;
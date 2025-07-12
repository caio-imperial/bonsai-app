import { TypographyH3, TypographyMuted } from "@/components/ui/typography";

import { Bonsai } from "@/types";
import EntriesListHeaderTitleLoading from "./TitleLoading";

interface EntriesListHeaderTitleProps {
    bonsai: Bonsai | null;
    loading: boolean;
}

const EntriesListHeaderTitle = ({ bonsai, loading }: EntriesListHeaderTitleProps) => {
    if (loading || !bonsai) return <EntriesListHeaderTitleLoading />;
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


export default EntriesListHeaderTitle;
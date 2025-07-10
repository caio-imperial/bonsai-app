import { TypographyH3 } from "@/components/ui/typography";

const BonsaiContentEmpty = ({ text }: { text: string }) => {
    return (
        <TypographyH3 className="col-span-full text-center mt-10">{text}</TypographyH3>
    );
};

export default BonsaiContentEmpty;
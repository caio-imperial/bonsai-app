import { Bonsai } from "@/types/bonsai";
import BonsaisContentLoading from "./ContentLoading";
import BonsaisContentEmpty from "./ContentEmpty";
import BonsaisCard from "./Card";

interface BonsaisContentProps {
    loading: boolean;
    search: string;
    bonsais: Bonsai[];
    handleClick: (bonsaiId: string) => void;
    handleDelete: (bonsaiId: string) => void;
    handleEdit: (bonsaiId: string) => void;
    handleFavorite: ({ _id, favorite }: { _id: string, favorite: boolean }) => void;
}

const BonsaisContent = ({ loading, search, bonsais, handleClick, handleDelete, handleEdit, handleFavorite }: BonsaisContentProps) => {
    if (loading) return <BonsaisContentLoading />;

    if (search.length > 0 && bonsais.length === 0) return <BonsaisContentEmpty text="Nenhum bonsai encontrado" />;

    if (bonsais.length === 0) return <BonsaisContentEmpty text="Você ainda não tem nenhum bonsai cadastrado" />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in-0 duration-300">
        {bonsais.map((bonsai) => {
          return (
            <BonsaisCard
              key={bonsai._id}
              bonsai={bonsai}
              className="cursor-pointer"
              handleClick={handleClick}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleFavorite={handleFavorite}
            />
          );
        })}
      </div>   
    );
};

export default BonsaisContent;
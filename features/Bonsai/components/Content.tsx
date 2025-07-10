import { Bonsai } from "@/types/bonsai";
import BonsaiContentLoading from "./ContentLoading";
import BonsaiContentEmpty from "./ContentEmpty";
import BonsaiCard from "./Card";

interface BonsaiContentProps {
    loading: boolean;
    search: string;
    bonsais: Bonsai[];
    handleClick: (bonsaiId: string) => void;
    handleDelete: (bonsaiId: string) => void;
    handleEdit: (bonsaiId: string) => void;
    handleFavorite: ({ _id, favorite }: { _id: string, favorite: boolean }) => void;
}

const BonsaiContent = ({ loading, search, bonsais, handleClick, handleDelete, handleEdit, handleFavorite }: BonsaiContentProps) => {
    if (loading) return <BonsaiContentLoading />;

    if (search.length > 0 && bonsais.length === 0) return <BonsaiContentEmpty text="Nenhum bonsai encontrado" />;

    if (bonsais.length === 0) return <BonsaiContentEmpty text="Você ainda não tem nenhum bonsai cadastrado" />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in-0 duration-300">
        {bonsais.map((bonsai) => {
          return (
            <BonsaiCard
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

export default BonsaiContent;
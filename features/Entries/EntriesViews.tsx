// pages/bonsai/[id].tsx
import { useRouter } from "next/router";
import { useEntry } from "@/hooks/useEntry";
import { useDeleteEntry } from "./hooks/useDeleteEntry";
import { useBonsai } from "@/hooks/useBonsai";
import { useUpdateBonsai } from "@/hooks/useUpdateBonsai";
import EntriesHeader from "./components/Header";
import BonsaiNotFound from "./BonsaiNotFound";
import EntriesContent from "./components/Content";
import { useFavorite } from "./hooks/useFavoriteBonsai";
import { useNavigation } from "@/hooks/useNavegation";

export default function TimelinePage() {
  const router = useRouter();
  const { bonsaiId } = router.query as { bonsaiId: string };

  const { bonsai, loading: bonsaiLoading, setBonsai, error: bonsaiError } = useBonsai(bonsaiId);
  const { entries, loading: entriesLoading, setEntries } = useEntry(bonsai?._id);
  const { toggleFavorite } = useFavorite({ setBonsai, bonsai });
  const { deleteEntry } = useDeleteEntry({bonsaiId: bonsaiId, setEntries});
  const { handleEdit, handleAddEntry } = useNavigation();

  if (bonsaiError) return <div>{bonsaiError.message}</div>;

  if (!bonsai) return <BonsaiNotFound />;

  return (
    <div className="flex flex-col gap-2 mt-5">
      <EntriesHeader 
        bonsai={bonsai} 
        bonsaiLoading={bonsaiLoading} 
        entriesLoading={entriesLoading} 
        handleFavorite={toggleFavorite} 
        handleEdit={handleEdit} 
        handleAddEntry={handleAddEntry} 
      />
      <EntriesContent entries={entries} entriesLoading={entriesLoading} handleDelete={deleteEntry} />
    </div>
  );
}

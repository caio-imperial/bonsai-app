import { useState } from "react";

import { useBonsais, UseBonsaisProps } from "@/hooks/useBonsais";
import { useDebounce } from "@/hooks/useDebounce";

export function useSearch() {
    const { bonsais, loading, setBonsais, params, setParams, meta } = useBonsais({
        initialParams: {
            limit: 9,
        }
    });
    const [search, setSearch] = useState("");

    const debouncedFetchBonsais = useDebounce((search: string) => {
        setParams(prevParams => ({ ...prevParams, search }));
    }, 500);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedFetchBonsais(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setParams(prevParams => ({ ...prevParams, page }));
    };

    return {
        search,
        setSearch,
        handleSearch,
        bonsais,
        setBonsais,
        loading,
        params,
        meta,
        handlePageChange,
    };
}

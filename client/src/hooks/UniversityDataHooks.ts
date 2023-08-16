import { UniversitySearchFilter, UniversityDetail } from "@/typings";
import { useEffect, useMemo, useState } from "react";
import { getUniversityDataByCityCountry } from "@/services/universityApiService";

export const useGetUniversityData = (filters: UniversitySearchFilter) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [universityData, setUniversityData] = useState<UniversityDetail[]>([]);

    const getData = useMemo(() => async (_filter: UniversitySearchFilter) => {
        const data = await getUniversityDataByCityCountry(_filter);
        setUniversityData(data);
        setIsLoading(false)
    }, [setUniversityData, setIsLoading]);

    useEffect(() => {
        setIsLoading(true);
        const debounceTimed = setTimeout(() => {
            getData(filters);
        }, 1000);
        return () => clearTimeout(debounceTimed)
    }, [filters.country, filters.universityName]);

    return { isLoading, universityData };
};
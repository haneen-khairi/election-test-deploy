import { TopFamilies } from "@services/hooks/insights/Insights";
import { ListResponse } from "@services/structure";
import { useEffect, useState } from "react";

const useFilterFamilyData = (
    data: ListResponse<TopFamilies> | undefined
): ListResponse<TopFamilies> | undefined => {
    const [filteredData, setFilteredData] = useState<
        ListResponse<TopFamilies> | undefined
    >(data);

    useEffect(() => {
        setFilteredData(() => {
            if (data?.data && data?.data?.length > 0) {
                return {
                    ...data,
                    data: data?.data?.filter((item) => item.family !== "اخرى"),
                };
            } else return data;
        });
    }, [data]);

    return filteredData;
};

export default useFilterFamilyData;

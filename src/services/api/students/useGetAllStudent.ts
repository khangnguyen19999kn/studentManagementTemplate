import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";

import studentApi from "../service/student.api";

export function useGetStudentList() {
  return useQuery({
    queryKey: ["student"],
    queryFn: () => studentApi.getListStudent(),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}

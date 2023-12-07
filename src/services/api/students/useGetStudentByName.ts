import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";

import studentApi from "../service/student.api";

export function useGetStudentByName(name: string) {
  return useQuery({
    queryKey: [`student-${name}`],
    queryFn: () => studentApi.getStudentByName(name),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}

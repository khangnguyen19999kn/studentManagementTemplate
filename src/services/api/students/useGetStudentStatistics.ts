import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";
import studentApi from "@/services/api/service/student.api";

export function useGetStudentStatistics() {
  return useQuery({
    queryKey: [`student-statistics`],
    queryFn: () => studentApi.getStatistics(),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}

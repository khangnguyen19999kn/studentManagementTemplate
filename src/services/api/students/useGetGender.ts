import { useQuery } from "@tanstack/react-query";

import { CACHE_DATA_STALE_TIME } from "@/constant/variable";
import studentApi from "@/services/api/service/student.api";

export function useGetGender() {
  return useQuery({
    queryKey: [`student-gender`],
    queryFn: () => studentApi.getGenderCount(),
    staleTime: CACHE_DATA_STALE_TIME.MEDIUM,
  });
}

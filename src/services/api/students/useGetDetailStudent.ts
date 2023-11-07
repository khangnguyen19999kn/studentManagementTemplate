import { useQuery } from "@tanstack/react-query";

import studentApi from "../service/student.api";

export function useGetDetailStudent(id: string) {
  return useQuery({
    queryKey: [`student-${id}`],
    queryFn: () => studentApi.getStudentById(id),
  });
}

import { useMutation } from "@tanstack/react-query";

import studentApi from "../service/student.api";

export const useDeleteStudent = () => {
  return useMutation({
    mutationFn: (id: string) => studentApi.deleteStudent(id),
  });
};

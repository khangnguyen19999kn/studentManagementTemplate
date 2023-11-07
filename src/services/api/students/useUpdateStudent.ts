import { useMutation } from "@tanstack/react-query";

import studentApi from "../service/student.api";

export const useUpdateStudent = () => {
  return useMutation({
    mutationFn: (student: string) => studentApi.updateStudent(student),
  });
};

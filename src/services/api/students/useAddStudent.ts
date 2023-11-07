import { useMutation } from "@tanstack/react-query";

import studentApi from "../service/student.api";

export const useAddStudent = () => {
  return useMutation({
    mutationFn: (student: string) => studentApi.addStudent(student),
  });
};

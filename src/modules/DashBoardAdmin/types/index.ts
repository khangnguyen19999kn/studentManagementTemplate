export interface IStudent {
  Id: string;
  name: string;
  gender: "MALE" | "FEMALE";
  dateBirth: string;
  email: string;
  gpa: number;
  password: string;
}
export type TTemplateDate = "add" | "edit";

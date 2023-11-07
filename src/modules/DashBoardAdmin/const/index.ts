import { IStudent, TTemplateDate } from "@/modules/DashBoardAdmin/types";

export const templateData = (student: IStudent, type: TTemplateDate) => {
  return `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <${type === "add" ? "AddStudent" : "UpdateStudent"} xmlns="http://tempuri.org/">
        <student>
          ${type === "edit" ? `<Id>${student.Id}</Id>` : ""}
          <name>${student.name}</name>
          <dateBirth>${student.dateBirth}</dateBirth>
          <email>${student.email}</email>
          <gpa>${student.gpa}</gpa>
          <password>${student.password}</password>
        </student>
      </${type === "add" ? "AddStudent" : "UpdateStudent"}>
    </soap12:Body>
  </soap12:Envelope>`;
};
export enum ETypeModal {
  ADD = "ADD",
  EDIT = "EDIT",
}

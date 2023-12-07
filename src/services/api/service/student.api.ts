import { UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export type TResponse<T> = {
  data: T;
  error: 0;
  message: "SUCCESS";
};
export interface IStudentResponse {
  total: number;
  data: string;
}
export type TGetStudentResponse = TResponse<IStudentResponse>;
export type TActionResponse = TResponse<number | string | boolean>;
export type TConfigMutation<
  TFieldPayload = unknown,
  TFieldResponse = TActionResponse
> = UseMutationOptions<TFieldResponse, AxiosError, TFieldPayload>;

const pathStudentAPI = {
  getAllStudent: "/GetAllStudents",
  updateStudent: "?op=UpdateStudent",
  getStudent: (name: string) => `/GetStudent?studentName=${name}`,
  deleteStudent: "/DeleteStudent?studentId=${id}",
  addStudent: "?op=AddStudent",
  getGender: "/GetGenderCount",
  getStatistics: "/GetStudentStatistics",
};
export const cspStudentApiXML = axios.create({
  baseURL: import.meta.env.VITE_STUDENT_API as string,
  headers: {
    "Content-Type": "text/xml; charset=utf-8.",
  },
});
export const cspStudentApiFormUrlencoded = axios.create({
  baseURL: import.meta.env.VITE_STUDENT_API as string,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const studentApi = {
  async getListStudent() {
    const response = await cspStudentApiXML.get<string>(pathStudentAPI.getAllStudent);
    return response.data;
  },
  async getStudentByName(name: string) {
    const response = await cspStudentApiXML.get<string>(pathStudentAPI.getStudent(name));
    return response.data;
  },
  async updateStudent(student: string): Promise<string> {
    const response = await cspStudentApiXML.post(pathStudentAPI.updateStudent, student);
    return response.data as string;
  },
  async deleteStudent(id: string): Promise<string> {
    const data = new URLSearchParams();
    data.append("studentId", id);
    const response = await cspStudentApiFormUrlencoded.post(pathStudentAPI.deleteStudent, data);
    return response.data as string;
  },
  async addStudent(student: string): Promise<string> {
    const response = await cspStudentApiXML.post(pathStudentAPI.addStudent, student);
    return response.data as string;
  },
  async getGenderCount() {
    const response = await cspStudentApiXML.get<string>(pathStudentAPI.getGender);
    return response.data;
  },
  async getStatistics() {
    const response = await cspStudentApiXML.get<string>(pathStudentAPI.getStatistics);
    return response.data;
  },
};

export default studentApi;

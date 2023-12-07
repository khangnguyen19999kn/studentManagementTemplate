import { EPath } from "@/services/enum";

export const mapPathnameToKey = {
  [EPath.STUDENT]: "2",
  [EPath.ADMIN]: "1",
  [EPath.FILE]: "3",
  [EPath.TEAM]: "4",
  [EPath.USER]: "5",
};
export const mapPathToLabel = {
  [EPath.STUDENT]: "Student",
  [EPath.ADMIN]: "Students List",
  [EPath.FILE]: "File",
  [EPath.TEAM]: "Team",
  [EPath.USER]: "User",
};

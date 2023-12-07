import { convertStringToJSON } from "@/modules/DashBoardAdmin/utils/convertStringToJSON";

export const parseDataToJSON = <T>(data?: string) => {
  const dataJSON = convertStringToJSON(data);
  if (dataJSON) return JSON.parse(dataJSON) as T[];
  return [];
};

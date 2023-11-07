export const convertStringToJSON = (data?: string) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data || "", "text/xml");
  const jsonStringElement = xmlDoc.getElementsByTagName("string")[0];
  const jsonString = jsonStringElement ? jsonStringElement.textContent : "";

  return jsonString;
};

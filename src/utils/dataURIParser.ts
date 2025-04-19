import DatauriParser from "datauri/parser";
import path from "path";

const parser = new DatauriParser();

export const toDataUri = (fileBuffer: Buffer, filename: string) => {
  return parser.format(path.extname(filename).toString(), fileBuffer).content;
};

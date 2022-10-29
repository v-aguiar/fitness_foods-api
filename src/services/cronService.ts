import axios from "axios";
import path from "path";
import { downloadFile } from "@/utils";

const _ROOT = path.resolve(__dirname, "..", "..");

export const cronService = {
  get: async () => {
    const { data }: { data: string } = await axios.get(
      "https://challenges.coode.sh/food/data/json/index.txt",
      {
        responseType: "text",
      }
    );

    const fileNames: string[] = data.split("\n");
    const filePath = path.resolve(_ROOT, "temp", fileNames[0]);

    await downloadFile(`https://challenges.coode.sh/food/data/json/${fileNames[0]}`, filePath);
  },
};

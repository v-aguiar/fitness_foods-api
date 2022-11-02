import axios from "axios";
import path from "path";
import { downloadFile, upsertProductData } from "@/utils";
import { cronRepository } from "@/repositories";

const _ROOT = path.resolve(__dirname, "..", "..");

export const cronService = {
  runCronJob: async () => {
    const { data }: { data: string } = await axios.get(
      "https://challenges.coode.sh/food/data/json/index.txt",
      {
        responseType: "text",
      }
    );

    const fileNames: string[] = data.split("\n");
    fileNames.pop();

    for (const fileName of fileNames) {
      const filePath = path.resolve(_ROOT, "temp", fileName);
      await downloadFile(`https://challenges.coode.sh/food/data/json/${fileName}`, filePath, fileName);
    }

    setTimeout(async () => {
      for (const fileName of fileNames) {
        await upsertProductData(fileName);
      }
    }, 3000);
  },

  saveCronJobLog: async (error?: any) => {
    const description: string = error ? error.toString() : "✔ Cron job executed successfully!";
    await cronRepository.saveCronJobLog(description);
  },
};

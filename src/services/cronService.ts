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
      try {
        await downloadFile(`https://challenges.coode.sh/food/data/json/${fileName}`, filePath, fileName);
      } catch (error) {
        console.log(error);
      }
    }

    setTimeout(async () => {
      for (const fileName of fileNames) {
        try {
          await upsertProductData(fileName);
        } catch (error) {
          console.log(error);
        }
      }
    }, 3000);

    //TODO -> refactor after adding error handler middleware
  },

  saveCronJobLog: async (error?: any) => {
    const description: string = error ? error.toString() : "✔ Cron job executed successfully!";
    await cronRepository.saveCronJobLog(description);
  },
};

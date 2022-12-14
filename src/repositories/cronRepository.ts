import { prisma } from "@/config";

export const cronRepository = {
  saveCronJobLog: async (description: string) => {
    return await prisma.cronJob.create({ data: { description } });
  },

  getLastCronJob: async () => {
    return await prisma.cronJob.findFirst({
      orderBy: { createdAt: "desc" },
    });
  },
};

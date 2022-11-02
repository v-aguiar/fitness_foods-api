import { cronRepository } from "@/repositories";

interface Health {
  date: string;
  uptime: string;
  memory_usage: string;
  dbConnection: string;
  lastCronJob: string;
}

export const appService = {
  getHealthData: async () => {
    const heap = process.memoryUsage().heapUsed / 1024 / 1024;
    const date = new Date().toISOString();
    const lastCronJob = await cronRepository.getLastCronJob();
    const dbConnection = lastCronJob ? "OK" : "UNREACHABLE";
    const uptime = process.uptime();

    const health: Health = {
      date,
      uptime: `${Math.floor(uptime / 60)} minutes and ${Math.floor(uptime % 60)} seconds`,
      memory_usage: `${heap.toFixed(2)} MB`,
      dbConnection,
      lastCronJob: lastCronJob?.createdAt.toISOString(),
    };

    return health;
  },
};

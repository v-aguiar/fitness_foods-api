import { Request, Response } from "express";
import httpStatus from "http-status";

import { appService, cronService } from "@/services";

export const healthCheck = async (_req: Request, res: Response) => {
  const health = await appService.getHealthData();
  return res.status(httpStatus.OK).send(health);
};

export const runCronJob = async (_req: Request, res: Response) => {
  try {
    await cronService.runCronJob();
    await cronService.saveCronJobLog();
  } catch (error) {
    await cronService.saveCronJobLog(error);
    throw new Error(error);
  }
  return res.status(httpStatus.OK).send("✔ Cron job executed successfully!");
};

import { Request, Response } from "express";
import httpStatus from "http-status";

import { appService } from "@/services";

export const healthCheck = async (_req: Request, res: Response) => {
  const health = await appService.getHealthData();
  return res.status(httpStatus.OK).send(health);
};

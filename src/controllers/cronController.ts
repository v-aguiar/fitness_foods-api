import { Request, Response } from "express";
import { cronService } from "@/services";

export const getProductsData = async (req: Request, res: Response) => {
  await cronService.get();

  res.status(200).send("OK!");
};

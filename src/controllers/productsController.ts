import { Request, Response } from "express";

import { productsService } from "@/services";
import type { UpdateProduct } from "@/repositories";
import httpStatus from "http-status";

export const updateProductByCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  const data: UpdateProduct = req.body;

  await productsService.updateByCode(code, data);

  res.status(httpStatus.OK).send("✔ Product updated successfully!");
};

import { Router } from "express";

import { updateProductByCode } from "@/controllers";
import { validateBody, validateParams } from "@/middlewares";
import { updateProductSchema, validateProductCodeSchema } from "@/schemas";

export const productsRouter = Router();

productsRouter.put(
  "/:code",
  validateParams(validateProductCodeSchema),
  validateBody(updateProductSchema),
  updateProductByCode
);

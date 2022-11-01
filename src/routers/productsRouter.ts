import { Router } from "express";

import { deleteProductByCode, updateProductByCode, getProductByCode, getAllProducts } from "@/controllers";
import { validateBody, validateParams } from "@/middlewares";
import { updateProductSchema, validateProductCodeSchema } from "@/schemas";

export const productsRouter = Router();

productsRouter
  .put(
    "/:code",
    validateParams(validateProductCodeSchema),
    validateBody(updateProductSchema),
    updateProductByCode
  )
  .delete("/:code", validateParams(validateProductCodeSchema), deleteProductByCode)
  .get("/:code", validateParams(validateProductCodeSchema), getProductByCode)
  .get("/", getAllProducts);

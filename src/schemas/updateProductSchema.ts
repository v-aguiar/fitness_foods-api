import { Status } from "@prisma/client";
import Joi from "joi";

import type { InsertProducts, UpdateProduct } from "@/repositories";

export const updateProductSchema = Joi.object<UpdateProduct>({
  status: Joi.string()
    .valid(...Object.values(Status))
    .messages({
      "string.base": "⚠ Status must be a string",
      "any.only": "⚠ Status must be one of the following: 'draft', 'published', 'trash'",
    }),
  brands: Joi.string().messages({
    "string.base": "⚠ brands must be a string",
  }),
  categories: Joi.string().messages({
    "string.base": "⚠ categories must be a string",
  }),
  cities: Joi.string().messages({
    "string.base": "⚠ cities must be a string",
  }),
  created_t: Joi.string().messages({
    "string.base": "⚠ created_t must be a string",
  }),
  creator: Joi.string().messages({
    "string.base": "⚠ creator must be a string",
  }),
  image_url: Joi.string().uri().messages({
    "string.base": "⚠ image_url must be a string",
    "string.uri": "⚠ image_url must be a valid uri",
  }),
  ingredients_text: Joi.string().messages({
    "string.base": "⚠ ingredients_text must be a string",
  }),
  labels: Joi.string().messages({
    "string.base": "⚠ labels must be a string",
  }),
  last_modified_t: Joi.string().messages({
    "string.base": "⚠ last_modified_t must be a string",
  }),
  main_category: Joi.string().messages({
    "string.base": "⚠ main_category must be a string",
  }),
  nutriscore_grade: Joi.string().messages({
    "string.base": "⚠ nutriscore_grade must be a string",
  }),
  nutriscore_score: Joi.string().regex(/^\d+$/).messages({
    "string.base": "⚠ nutriscore_score must be a string",
    "string.pattern.base": "⚠ nutriscore_score must be a string of numbers only",
  }),
  purchase_places: Joi.string().messages({
    "string.base": "⚠ purchase_places must be a string",
  }),
  quantity: Joi.string().messages({
    "string.base": "⚠ quantity must be a string",
  }),
  serving_size: Joi.string().messages({
    "string.base": "⚠ serving_size must be a string",
  }),
  serving_quantity: Joi.string().regex(/^\d+$/).messages({
    "string.base": "⚠ serving_quantity must be a string",
    "string.pattern.base": "⚠ serving_quantity must be a string of numbers only",
  }),
  product_name: Joi.string().messages({
    "string.base": "⚠ product_name must be a string",
  }),
  stores: Joi.string().messages({
    "string.base": "⚠ stores must be a string",
  }),
  url: Joi.string().uri().messages({
    "string.base": "⚠ url must be a string",
    "string.uri": "⚠ url must be a valid uri",
  }),
  traces: Joi.string().messages({
    "string.base": "⚠ traces must be a string",
  }),
});

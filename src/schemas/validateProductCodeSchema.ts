import Joi from "joi";

export type ProductCode = {
  code: string;
};

export const validateProductCodeSchema = Joi.object<ProductCode>({
  code: Joi.string().required().messages({
    "string.base": "⚠ code must be a string",
    "string.empty": "⚠ code cannot be an empty field",
  }),
});

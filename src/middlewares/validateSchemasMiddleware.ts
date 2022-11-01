import { NextFunction, Request, Response } from "express";
import { ArraySchema, ObjectSchema } from "joi";

import { unprocessableEntityError } from "@/errors";

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export const validateBody = <T>(schema: ObjectSchema<T> | ArraySchema): ValidationMiddleware => {
  return validate(schema, "body");
};

export const validateParams = <T>(schema: ObjectSchema<T>): ValidationMiddleware => {
  return validate(schema, "params");
};

const validate = (schema: ObjectSchema | ArraySchema, type: "body" | "params") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], { abortEarly: false });
    if (error) throw unprocessableEntityError(error.details.map((detail) => detail.message));
    return next();
  };
};

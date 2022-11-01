import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import type { ApplicationError } from "@/protocols";

export const errorHandlerMiddleware = (
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.name === "UnprocessableEntityError") {
    console.error("UnprocessableEntityError: ", err);
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message, details: err });
  }

  if (err.name === "AlreadyExistsError") {
    console.error("AlreadyExistsError: ", err);
    return res.status(httpStatus.CONFLICT).send({ message: err.message });
  }

  if (err.name === "NotFoundError") {
    console.error("NotFoundError: ", err);
    return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }

  console.error("Internal server error: ", err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    name: "Internal Server Error",
    message: err?.message || `Something went wrong. Details: ${err}`,
  });
};

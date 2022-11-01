import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { connectDb, disconnectDB } from "@/config";
import { errorHandlerMiddleware } from "@/middlewares";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/", (_req, res) => res.status(200).send("OK!"))
  .use(errorHandlerMiddleware);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;

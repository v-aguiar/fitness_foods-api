import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { connectDb, disconnectDB } from "@/config";
import { healthCheck, runCronJob } from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import { productsRouter } from "@/routers";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/status", (_req, res) => res.status(200).send("OK!"))
  .get("/", healthCheck)
  .post("/cron", runCronJob)
  .use("/products", productsRouter)
  .use(errorHandlerMiddleware);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;

import path from "path";
import got from "got";
import * as stream from "stream";
import { createReadStream, createWriteStream, unlinkSync } from "fs";
import { readFile, unlink, writeFile } from "fs/promises";
import { promisify } from "util";
import { createUnzip } from "zlib";

import { InsertProducts, productsRepository } from "@/repositories";
import { normalizeProduct } from ".";

const _ROOT = path.resolve(__dirname, "..", "..");

export const downloadFile = async (url: string, filePath: string, fileName: string) => {
  const pipeline = promisify(stream.pipeline);
  await pipeline(got.stream(url), createWriteStream(filePath));

  let bufferString = "";
  let newLineIndex;
  let count = 0;

  const file = await readFile(filePath);
  const unzipTool = createUnzip();
  unzipTool.setEncoding("utf8");
  unzipTool.write(file);

  const handleIncomingData = (data: Buffer) => {
    bufferString += data.toString();
    if ((newLineIndex = bufferString.indexOf("\n")) >= 0) count++;
    if (count === 40) unzipTool.emit("end");
  };

  unzipTool.on("data", (data) => handleIncomingData(data));
  unzipTool.on("end", async () => {
    unzipTool.off("data", () => {});
    unzipTool.destroy();
    fileName = fileName.trim().replace(".gz", "");
    await writeFile(path.resolve(_ROOT, "temp", fileName), bufferString);
    bufferString = "";
    count = 0;
    unlink(filePath);
  });
};

export const upsertProductData = async (fileName: string) => {
  fileName = fileName.trim().replace(".gz", "");
  const filePath = path.resolve(_ROOT, "temp", fileName);

  const stream = createReadStream(filePath, { flags: "r", encoding: "utf-8" });
  let bufferString = "";
  let counter = 0;
  const productsArray: InsertProducts[] = [];

  stream.on("data", async (data) => {
    bufferString += data.toString();
    await handleBufferStreamData();
  });

  stream.on("end", async () => {
    stream.destroy();
    counter = 0;
    bufferString = "";
    await productsRepository.insertOrUpdateMany(productsArray);
    unlinkSync(filePath);
  });

  async function handleBufferStreamData() {
    let newLineIndex;

    while ((newLineIndex = bufferString.indexOf("\n")) >= 0 && counter < 100) {
      if (newLineIndex == 0) {
        bufferString = bufferString.slice(1);
        continue;
      }
      const line = bufferString.slice(0, newLineIndex);
      const lineObject = await getObjectFromLineString(line);

      productsArray.push(lineObject);
      bufferString = bufferString.slice(newLineIndex + 1);
      counter++;
      if (counter === 100) stream.emit("end");
    }
  }

  async function getObjectFromLineString(line: string): Promise<InsertProducts> {
    const lineIsNotEmpty = line.length > 0;
    line = line.replace(/-/g, "_");
    if (lineIsNotEmpty) {
      const lineObject = JSON.parse(line);
      const lineObjectWithoutUnderscore = Object.keys(lineObject).reduce((acc: any, key) => {
        const newKey = key.replace(/^_/, "");
        acc[newKey] = lineObject[key];
        return acc;
      }, {});

      const normalizedProduct = normalizeProduct(lineObjectWithoutUnderscore);
      return normalizedProduct;
    }
  }
};

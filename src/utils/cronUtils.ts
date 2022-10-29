import path from "path";
import got from "got";
import * as stream from "stream";
import { createReadStream, createWriteStream, readFileSync, unlink, unlinkSync } from "fs";
import { writeFile } from "fs/promises";
import { promisify } from "util";
import { ungzip } from "node-gzip";

import { InsertProducts, productsRepository } from "@/repositories";

const _ROOT = path.resolve(__dirname, "..", "..");

export const downloadFile = async (url: string, filePath: string) => {
  const pipeline = promisify(stream.pipeline);

  await pipeline(got.stream(url), createWriteStream(filePath));

  const file = readFileSync(filePath);
  const unzipped = await ungzip(file);
  await writeFile(path.resolve(_ROOT, "temp", "unzipped.json"), unzipped);
  readJsonFile(path.resolve(_ROOT, "temp", "unzipped.json"));
  unlinkSync(filePath);
};

export const readJsonFile = (filePath: string) => {
  let stream = createReadStream(filePath, { flags: "r", encoding: "utf-8" });
  let bufferString = "";
  let counter = 0;

  stream.on("data", (data) => {
    bufferString += data.toString();
    handleBufferStreamData();
  });

  stream.on("end", () => {
    unlinkSync(filePath);
  });

  function handleBufferStreamData() {
    let newLineIndex;

    while ((newLineIndex = bufferString.indexOf("\n")) >= 0 && counter < 100) {
      if (newLineIndex == 0) {
        bufferString = bufferString.slice(1);
        continue;
      }
      const line = bufferString.slice(0, newLineIndex);
      handleLineString(line);
      bufferString = bufferString.slice(newLineIndex + 1);
      counter++;
      if (counter === 100) stream.emit("end");
    }
  }

  async function handleLineString(line: string) {
    const isLineNotSanitized = line[line.length - 1] == "\r";
    if (isLineNotSanitized) line = line.substring(0, line.length - 1);

    const lineIsNotEmpty = line.length > 0;
    if (lineIsNotEmpty) {
      const lineObject = JSON.parse(line);

      // TODO -> Remove initial underscore from keys
      // TODO -> Replace hiphens with underscores in keys
      // TODO -> Insert product data from lineObject into database
    }
  }
};

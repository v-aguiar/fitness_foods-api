import app from "@/app";

import supertest from "supertest";
import { appService, Health } from "@/services";

const agent = supertest(app);

describe("GET '/status'", () => {
  it("should return status 200 and 'OK!'", async () => {
    const response = await agent.get("/status");
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK!");
  });
});

describe("GET '/'", () => {
  it("should return status 200 and all health data", async () => {
    jest.spyOn(appService, "getHealthData").mockImplementation((): Promise<Health> => {
      return new Promise((resolve) =>
        resolve({
          date: new Date().toISOString(),
          uptime: "1 minute and 1 second",
          memory_usage: "1 MB",
          dbConnection: "OK",
          lastCronJob: new Date().toISOString(),
        })
      );
    });

    const response = await agent.get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("memory_usage");
    expect(response.body).toHaveProperty("dbConnection");
    expect(response.body).toHaveProperty("lastCronJob");
  });
});

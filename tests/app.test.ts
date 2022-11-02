import app from "@/app";

import supertest from "supertest";

const agent = supertest(app);

describe("GET '/status'", () => {
  it("should return status 200 and 'OK!'", async () => {
    const response = await agent.get("/status");
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK!");
  });
});

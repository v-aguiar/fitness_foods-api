import supertest from "supertest";

import app from "@/app";
import { appService, Health } from "@/services";
import { productsRepository } from "@/repositories";
import { returnArrayOf5Products, returnOneProduct } from "./factories";
import { Product } from "@prisma/client";

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

describe("GET '/products'", () => {
  it("should call for getAll method from the products repository once and return error message", async () => {
    jest.spyOn(productsRepository, "getAll").mockImplementationOnce(() => {
      return new Promise((resolve) => resolve([]));
    });

    const response = await agent.get("/products");
    expect(response.status).toBe(404);
    expect(productsRepository.getAll).toHaveBeenCalledTimes(1);
    expect(response.body).toMatchObject({ message: "⚠ No products found!" });
  });

  it("should call for getAll method from the products repository once and return 5 products", async () => {
    jest.spyOn(productsRepository, "getAll").mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(returnArrayOf5Products()));
    });

    const response = await agent.get("/products");
    expect(response.status).toBe(200);
    expect(productsRepository.getAll).toHaveBeenCalledTimes(1);
    expect(response.body).toHaveLength(5);
  });
});

describe("GET '/products/:code'", () => {
  it("should call for getByCode method from the products repository once and return one product data", async () => {
    jest.spyOn(productsRepository, "getByCode").mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(returnOneProduct()));
    });

    const code = "0815360014655";

    const response = await agent.get(`/products/${code}`);
    expect(response.status).toBe(200);
    expect(productsRepository.getByCode).toHaveBeenCalledTimes(1);
    expect(response.body).toHaveProperty("code", code);
  });

  it("should call for getByCode method from the products repository once and return status 404 when code is wrong", async () => {
    jest.spyOn(productsRepository, "getByCode").mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(null));
    });

    const code = "0";

    const response = await agent.get(`/products/${code}`);
    expect(response.status).toBe(404);
    expect(productsRepository.getByCode).toHaveBeenCalledTimes(1);
    expect(response.body).toMatchObject({ message: "⚠ No product found with the given code!" });
  });
});

describe("PUT '/products/:code", () => {
  it("should call for updateByCode method from the products repository once and return status 200", async () => {
    jest.spyOn(productsRepository, "getByCode").mockImplementationOnce(async () => returnOneProduct());
    jest.spyOn(productsRepository, "updateByCode").mockImplementationOnce(async () => {});

    const code = "0815360014655";

    const response = await agent.put(`/products/${code}`).send({ status: "draft" });
    expect(response.status).toBe(200);
    expect(productsRepository.updateByCode).toHaveBeenCalledTimes(1);
    expect(productsRepository.getByCode).toHaveBeenCalledTimes(1);
  });

  it("should call for updateByCode method from the products repository once and return status 404 when the code is wrong", async () => {
    jest.spyOn(productsRepository, "getByCode").mockImplementationOnce(async () => null);
    jest.spyOn(productsRepository, "updateByCode").mockImplementationOnce(async () => {});

    const code = "0";

    const response = await agent.put(`/products/${code}`).send({ status: "draft" });
    expect(response.status).toBe(404);
    expect(productsRepository.getByCode).toHaveBeenCalledTimes(1);
    expect(productsRepository.updateByCode).toHaveBeenCalledTimes(0);
    expect(response.body).toMatchObject({ message: "⚠ No product found with the given code!" });
  });
});

describe("DELETE '/products/:code'", () => {
  it("should call for deleteByCode method from the products repository once and return status 200", async () => {
    jest.spyOn(productsRepository, "getByCode").mockImplementationOnce(async () => {
      return {} as Product;
    });
    jest.spyOn(productsRepository, "deleteByCode").mockImplementationOnce(async () => {});

    const code = "0815360014655";

    const response = await agent.delete(`/products/${code}`);
    expect(response.status).toBe(200);
    expect(productsRepository.deleteByCode).toHaveBeenCalledTimes(1);
    expect(productsRepository.getByCode).toHaveBeenCalledTimes(1);
  });

  it("should call for deleteByCode method from the products repository once and return status 404 when the code is wrong", async () => {
    jest.spyOn(productsRepository, "getByCode").mockImplementationOnce(async () => null);
    jest.spyOn(productsRepository, "deleteByCode").mockImplementationOnce(async () => {});

    const code = "0";

    const response = await agent.delete(`/products/${code}`);
    expect(response.status).toBe(404);
    expect(productsRepository.getByCode).toHaveBeenCalledTimes(1);
    expect(productsRepository.deleteByCode).toHaveBeenCalledTimes(0);
    expect(response.body).toMatchObject({ message: "⚠ No product found with the given code!" });
  });
});

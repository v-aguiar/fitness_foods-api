import { productsRepository, UpdateProduct } from "@/repositories";
import { notFoundError } from "@/errors";

export const productsService = {
  updateByCode: async (code: string, data: UpdateProduct) => {
    const product = await productsRepository.getByCode(code);
    if (!product) throw notFoundError("⚠ No product found with the given code!");

    await productsRepository.updateByCode(code, data);
  },

  deleteByCode: async (code: string) => {
    const product = await productsRepository.getByCode(code);
    if (!product) throw notFoundError("⚠ No product found with the given code!");

    await productsRepository.deleteByCode(code);
  },

  getByCode: async (code: string) => {
    const product = await productsRepository.getByCode(code);
    if (!product) throw notFoundError("⚠ No product found with the given code!");

    return product;
  },

  getAll: async (page: number) => {
    const products = await productsRepository.getAll(page);
    if (products.length === 0) throw notFoundError("⚠ No products found!");

    return products;
  },
};

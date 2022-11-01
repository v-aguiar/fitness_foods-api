import { productsRepository, UpdateProduct } from "@/repositories";
import { notFoundError } from "@/errors";

export const productsService = {
  updateByCode: async (code: string, data: UpdateProduct) => {
    const product = await productsRepository.getByCode(code);
    if (!product) throw notFoundError("⚠ No product found with the given code");

    await productsRepository.updateByCode(code, data);
  },
};

import { Product } from "@prisma/client";
import { prisma } from "@/config";

export type InsertProducts = Omit<Product, "id" | "imported_t" | "updated_at">;

export const productsRepository = {
  insertOrUpdate: async (product: InsertProducts) => {
    await prisma.product.upsert({
      where: {
        product_name: product.product_name,
      },
      update: {
        ...product,
      },
      create: {
        ...product,
      },
    });
  },
};

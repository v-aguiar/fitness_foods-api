import { Product } from "@prisma/client";
import { prisma } from "@/config";
import { close, init } from "@/app";

export type InsertProducts = Omit<Product, "id" | "imported_t" | "updated_at" | "status">;
export type UpdateProduct = Partial<Omit<Product, "id" | "imported_t" | "updated_at" | "code">>;

export const productsRepository = {
  insertOrUpdateMany: async (products: InsertProducts[]) => {
    await init();

    await prisma.$transaction(
      products.map((product) => {
        return prisma.product.upsert({
          where: { code: product.code },
          update: { ...product },
          create: { ...product },
        });
      })
    );
    await close();
    return;
  },

  getByCode: async (code: string) => {
    return await prisma.product.findUnique({
      where: { code },
    });
  },

  updateByCode: async (code: string, data: UpdateProduct) => {
    await prisma.product.update({
      where: { code },
      data,
    });
  },
};

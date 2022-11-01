import { Product } from "@prisma/client";
import { prisma } from "@/config";
import { close, init } from "@/app";

export type InsertProducts = Omit<Product, "id" | "imported_t" | "updated_at" | "status">;

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
};

import { InsertProducts } from "@/repositories";

export const normalizeProduct = (obj: any): InsertProducts => {
  return {
    code: obj.code.replace(/^"/, ""),
    product_name: obj.product_name,
    brands: obj.brands,
    categories: obj.categories,
    cities: obj.cities,
    created_t: obj.created_t,
    creator: obj.creator,
    image_url: obj.image_url,
    ingredients_text: obj.ingredients_text,
    labels: obj.labels,
    last_modified_t: obj.last_modified_t,
    main_category: obj.main_category,
    nutriscore_grade: obj.nutriscore_grade,
    nutriscore_score: obj.nutriscore_score,
    purchase_places: obj.purchase_places,
    quantity: obj.quantity,
    serving_size: obj.serving_size,
    serving_quantity: obj.serving_quantity,
    stores: obj.stores,
    url: obj.url,
    traces: obj.traces,
    updatedAt: obj.updatedAt,
  };
};

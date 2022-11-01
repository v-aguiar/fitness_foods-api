import { ApplicationError } from "@/protocols";

export const notFoundError = (message: string): ApplicationError => {
  return {
    name: "NotFoundError",
    message,
  };
};

import type { ApplicationError } from "@/protocols";

export const alreadyExistsError = (message: string): ApplicationError => {
  return {
    name: "AlreadyExistsError",
    message,
  };
};

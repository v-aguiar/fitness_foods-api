import type { ApplicationError } from "@/protocols";

type ApplicationUnprocessableError = ApplicationError & {
  details: string[];
};

export const unprocessableEntityError = (details: string[]): ApplicationUnprocessableError => {
  return {
    name: "UnprocessableEntityError",
    message: "Unprocessable Entity",
    details,
  };
};

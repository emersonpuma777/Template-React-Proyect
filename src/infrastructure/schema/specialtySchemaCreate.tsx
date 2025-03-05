import { z } from "zod";

export const specialtySchemaCreate = z.object({
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .nonempty("First name is required"),
  label: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .nonempty("First name is required"),
  hourly_rate: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .nonempty("First name is required"),
});

export type SpecialtySchemaCreate = z.infer<typeof specialtySchemaCreate>;

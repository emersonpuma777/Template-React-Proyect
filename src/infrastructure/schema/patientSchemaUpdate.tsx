import { z } from "zod";

export const patientSchemaUpdate = z.object({
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .nonempty("First name is required"),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .nonempty("Last name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  phone: z
    .string()
    .min(9, { message: "Phone number must be at least 9 digits long" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .nonempty("Phone number is required"),
  specialty_id: z.string().nonempty("Specialty must be select"),
});

export type PatientSchemaUpdate = z.infer<typeof patientSchemaUpdate>;

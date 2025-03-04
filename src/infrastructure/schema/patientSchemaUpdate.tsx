/* eslint-disable @typescript-eslint/no-explicit-any */
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
  dob: z.preprocess(
    (val: any) =>
      typeof val === "string" && val.trim() === "" ? undefined : new Date(val),
    z.date({ required_error: "Date of birth is required" }).nullable()
  ),
  sex: z.string().nonempty("Gender must be select"),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters long" })
    .nonempty("City is required"),
  social_security_number: z.string().nonempty("Identifier is required"),
  identifier: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export type PatientSchemaUpdate = z.infer<typeof patientSchemaUpdate>;

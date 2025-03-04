/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const patientSchemaCreate = z.object({
  name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .nonempty("First name is required"),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .nonempty("Last name is required"),
  identifier: z
    .string()
    .length(8, { message: "Identifier must be exactly 8 characters long" })
    .nonempty("Identifier is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  sex: z.string().nonempty("Gender must be select"),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .nonempty("Username is required"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?#&]/, {
      message: "Password must contain at least one special character (@$!%*?&)",
    })
    .nonempty("Password is required"),
  phone: z
    .string()
    .min(9, { message: "Phone number must be at least 9 digits long" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .nonempty("Phone number is required"),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters long" })
    .nonempty("City is required"),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters long" })
    .nonempty("Country is required"),
  dob: z.preprocess(
    (val: any) =>
      typeof val === "string" && val.trim() === "" ? undefined : new Date(val),
    z.date({ required_error: "Date of birth is required" }).nullable()
  ),
  specialty_id: z.string().nonempty("Specialty must be select"),
});

export type PatientSchemaCreate = z.infer<typeof patientSchemaCreate>;

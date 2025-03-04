/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const appointmentSchemaCreate = z.object({
  appointmentDate: z.preprocess(
    (val: any) =>
      typeof val === "string" && val.trim() === "" ? undefined : new Date(val),
    z.coerce.date({ required_error: "Date of birth is required" }).nullable()
  ),
  startTime: z.string().nonempty("Start time must be select"),
  endTime: z.string().nonempty("End time must be select"),
  patientId: z.string().nonempty("Patient must be select"),
  doctorId: z.string().nonempty("Doctor must be select"),
});

export type AppointmentSchemaCreate = z.infer<typeof appointmentSchemaCreate>;

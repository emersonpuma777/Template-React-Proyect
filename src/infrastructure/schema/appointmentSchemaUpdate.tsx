/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export const appointmentSchemaUpdate = z.object({
  appointmentDate: z.preprocess(
    (val: any) =>
      typeof val === "string" && val.trim() === "" ? undefined : new Date(val),
    z.date({ required_error: "Date of birth is required" }).nullable()
  ),
  startTime: z.string().nonempty("Gender must be select"),
  endTime: z.string().nonempty("Gender must be select"),
  patientId: z.string().nonempty("Gender must be select"),
  doctorId: z.string().nonempty("Gender must be select"),
});

export type AppointmentSchemaUpdate = z.infer<typeof appointmentSchemaUpdate>;

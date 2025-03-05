import { z } from "zod";

export const appointmentSchemaUpdate = z.object({
  appointmentDate: z.string().nonempty("Gender must be select"),
  startTime: z.string().nonempty("Gender must be select"),
  endTime: z.string().nonempty("Gender must be select"),
  patientId: z.string().nonempty("Gender must be select"),
  doctorId: z.string().nonempty("Gender must be select"),
});

export type AppointmentSchemaUpdate = z.infer<typeof appointmentSchemaUpdate>;

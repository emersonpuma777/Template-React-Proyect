import { z } from "zod";

const appointmentParser = z.object({
  id: z.string().nullable(),
  patient_id: z.string().nullable(),
  doctor_id: z.string().nullable(),
  appointment_date: z.coerce.date().nullable(),
  start_time: z.string().nullable(),
  end_time: z.string().nullable(),
  status: z.string().nullable(),
  is_paid: z.boolean(),
  created_at: z.coerce.date().nullable(),
  patient_name: z.string().nullable(),
  patient_lastname: z.string().nullable(),
  patient_fullname: z.string().nullable(),
  doctor_name: z.string().nullable(),
  doctor_lastname: z.string().nullable(),
  doctor_fullname: z.string().nullable(),
  appointment_price: z.string().nullable(),
});

export type AppointmentParser = z.infer<typeof appointmentParser>;

export default appointmentParser;

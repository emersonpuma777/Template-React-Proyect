import { z } from "zod";

const specialtyParser = z.object({
  id: z.string().nullable(),
  name: z.string().nullable(),
  label: z.string().nullable(),
  hourly_rate: z.string().nullable(),
});

export type SpecialtyParser = z.infer<typeof specialtyParser>;

export default specialtyParser;

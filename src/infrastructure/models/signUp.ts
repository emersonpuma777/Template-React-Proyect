import { object, z } from "zod";
import createModelFactory from "@utils/createModelFactory";

const signUp = z.object({
  data: z
    .object({
      user: object({
        created_at: z.string().nullable(),
        email: z.string().nullable(),
        external_id: z.string().nullable(),
        id: z.number().nullable(),
        lastname: z.string().nullable(),
        name: z.string().nullable(),
        password: z.string().nullable(),
        username: z.string().nullable(),
      }),
    })
    .nullable(),
  success: z.boolean().nullable(),
});

export type SignUp = z.infer<typeof signUp>;
export const createSignUp = createModelFactory(signUp);

export default signUp;

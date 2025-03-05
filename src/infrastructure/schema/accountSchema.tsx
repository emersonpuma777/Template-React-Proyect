import { z } from "zod";

export const accountSchema = z
  .object({
    current_password: z.string().nonempty("La contraseña es requerida."),
    new_password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula.")
      .regex(/[a-z]/, "Debe contener al menos una letra minúscula.")
      .regex(/[0-9]/, "Debe contener al menos un número.")
      .regex(
        /[!@#$%^&*()_+[\]{}|;:,.<>?]/,
        "Debe contener al menos un carácter especial."
      ),
    password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.password_confirmation, {
    message: "Las contraseñas no coinciden.",
    path: ["password_confirmation"],
  });

export type AccountSchema = z.infer<typeof accountSchema>;

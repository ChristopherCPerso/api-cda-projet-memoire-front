import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .email("L'adresse e-mail n'est pas valide")
    .min(1, "L'adresse e-mail est requise"),
  password: z.string().min(8, "Le mot de passe est trop court!"),
});

type loginFormSchemaData = z.infer<typeof loginFormSchema>;

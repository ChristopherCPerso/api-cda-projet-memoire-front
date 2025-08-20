import { z } from "zod";

export const registerFormSchema = z
  .object({
    firstname: z.string().min(2, "Le prénom est requis"),
    lastname: z.string().min(2, "Le nom est requis"),
    email: z
      .email("L'adresse e-mail n'est pas valide")
      .min(1, "L'adresse e-mail est requise"),
    password: z
      .string()
      .min(8, "Le mot de passe doit avoir au minimum 8 caractères")
      .regex(
        /[^A-Za-z0-9]/,
        "Le mot de passe doit contenir au moins un caractère spécial",
      ),
    confirm: z
      .string()
      .min(8, "Le mot de passe doit avoir au minimum 8 caractères")
      .optional(),

    company: z.object({
      name: z.string().min(1, "Le nom de l'entreprise est requis"),
      domain: z
        .string()
        .min(1, "Le domaine de l'entreprise est requis")
        .optional(),
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"], // path of error
  });

type registerFormSchemaData = z.infer<typeof registerFormSchema>;

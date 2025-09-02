import { z } from "zod";

// Ce schéma représente UN SEUL jour dans le formulaire
const DayScheduleSchema = z
  .object({
    daysOfWeek: z.string(), // Juste pour l'affichage, pas besoin d'enum ici

    // Champs pour le service du Déjeuner
    lunchIsClosed: z.boolean(),
    lunchOpenTime: z.string().optional(),
    lunchCloseTime: z.string().optional(),

    // Champs pour le service du Dîner
    dinnerIsClosed: z.boolean(),
    dinnerOpenTime: z.string().optional(),
    dinnerCloseTime: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validation pour le service du midi
    if (!data.lunchIsClosed) {
      if (!data.lunchOpenTime)
        ctx.addIssue({
          code: "custom",
          path: ["lunchOpenTime"],
          message: "Requis",
        });
      if (!data.lunchCloseTime)
        ctx.addIssue({
          code: "custom",
          path: ["lunchCloseTime"],
          message: "Requis",
        });
      if (
        data.lunchOpenTime &&
        data.lunchCloseTime &&
        data.lunchOpenTime >= data.lunchCloseTime
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["lunchCloseTime"],
          message: "Invalide",
        });
      }
    }

    // Validation pour le service du soir
    if (!data.dinnerIsClosed) {
      if (!data.dinnerOpenTime)
        ctx.addIssue({
          code: "custom",
          path: ["dinnerOpenTime"],
          message: "Requis",
        });
      if (!data.dinnerCloseTime)
        ctx.addIssue({
          code: "custom",
          path: ["dinnerCloseTime"],
          message: "Requis",
        });
      if (
        data.dinnerOpenTime &&
        data.dinnerCloseTime &&
        data.dinnerOpenTime >= data.dinnerCloseTime
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["dinnerCloseTime"],
          message: "Invalide",
        });
      }
    }
  });

// Schéma principal POUR LE FORMULAIRE
export const RestaurantFormSchema = z.object({
  name: z.string().min(1, "Le nom du restaurant est obligatoire"),
  address: z.string().min(1, "L'adresse est obligatoire"),
  postalCode: z.number({}).int(),

  city: z.string().min(1, "La ville est obligatoire"),
  description: z.string().min(10, "La description est obligatoire"),
  phone: z
    .string()
    .max(10, "Merci de composer un numéro de téléphone à 10 Chiffres"),
  categories: z
    .array(z.string())
    .min(1, "Veuillez sélectionner au moins une catégorie"),
  paymentCategories: z
    .array(z.string())
    .min(1, "Veuillez sélectionner au moins un moyen de paiement"),

  // Le champ important : un tableau de nos schémas de jour
  openingHours: z.array(DayScheduleSchema),
});

// On exporte le type pour notre formulaire
export type RestaurantFormData = z.infer<typeof RestaurantFormSchema>;

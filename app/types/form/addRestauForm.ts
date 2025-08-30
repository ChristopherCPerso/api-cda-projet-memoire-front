import { z } from "zod";

// Catégorie
const CategorySchema = z.object({
  name: z.string(),
});

// Horaires d'ouverture
const OpeningHourSchema = z
  .object({
    daysOfWeek: z.enum([
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ]),
    serviceName: z.enum(["Déjeuner", "Dinner"]),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
    isClosed: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.isClosed) {
      if (!data.openTime) {
        // Syntaxe mise à jour
        ctx.addIssue({
          code: "custom",
          path: ["openTime"],
          message: "L'heure d'ouverture est requise.",
        });
      }
      if (!data.closeTime) {
        // Syntaxe mise à jour
        ctx.addIssue({
          code: "custom",
          path: ["closeTime"],
          message: "L'heure de fermeture est requise.",
        });
      }

      if (data.openTime && data.closeTime && data.openTime >= data.closeTime) {
        // Syntaxe mise à jour
        ctx.addIssue({
          code: "custom",
          path: ["closeTime"],
          message: "Doit être après l'heure d'ouverture.",
        });
      }
    }
  });

// Images du restaurant
const RestaurantImageSchema = z
  .object({
    link: z.string(),
    restaurant: z.string(),
  })
  .optional();

// Moyens de paiement
const PaymentCategorySchema = z
  .object({
    type: z.string(),
  })
  .optional();

// Schéma principal
export const RestaurantSchema = z.object({
  name: z.string().min(1, "Le nom du restaurant est obligatoire"),
  address: z.string().min(1, "L'adresse est obligatoire"),
  postalCode: z.coerce.number("Code postal obligatoire"),
  city: z.string().min(1, "La ville est obligatoire"),
  createdAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "createdAt must be a valid ISO date string",
    })
    .optional(),
  updatedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "updatedAt must be a valid ISO date string",
    })
    .optional(),
  user: z.string().optional(),
  categories: z.array(z.string()),
  openingHours: z.array(OpeningHourSchema),
  restaurantImages: z.array(RestaurantImageSchema).optional(),
  description: z.string().min(10, "La description est obligatoire"),
  phone: z
    .string()
    .max(10, "Merci de composer un numéro de téléphone à 10 Chiffres"),
  paymentCategories: z.array(z.string()),
});

type RestaurantSchemaData = z.infer<typeof RestaurantSchema>;

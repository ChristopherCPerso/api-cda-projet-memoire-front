import {
  Form,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { Auth } from "~/server/utils/auth.server";
import { redirectTo } from "~/utils/redirectTo";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRemixForm } from "remix-hook-form";
import Input from "~/components/ui/Input";
import TextArea from "~/components/ui/TextArea";
import type { Category, PaymentCategories } from "~/types/TypesRestaurants";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "~/ui/Icon";
import { useFieldArray } from "react-hook-form";
import { DaySchedule } from "~/components/DaySchedule";
import { RestaurantFormSchema } from "~/types/form/restaurantFormSchema";
import { getSession } from "~/server/utils/session.server";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

type FormData = zod.infer<typeof RestaurantFormSchema>;
const resolver = zodResolver(RestaurantFormSchema);

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isLogged = await Auth(request);
  if (!isLogged) {
    return redirectTo({
      request: request,
      to: "/",
      message: "Vous devez être connecté pour accéder à cette page",
    });
  }

  const [paymentType, categories] = await Promise.all([
    fetch(`${process.env.BASE_API_URL}/api/payment_categories`).then(
      (res) => res.json() as Promise<PaymentCategories[]>,
    ),
    fetch(`${process.env.BASE_API_URL}/api/categories`).then(
      (res) => res.json() as Promise<Category[]>,
    ),
  ]);

  return {
    paymentType: paymentType,
    categories: categories,
  };
};
export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const window = new JSDOM("").window;
    const DOMPurify = createDOMPurify(window);

    const formData = await request.formData();
    // Fonction utilitaire pour parser les valeurs
    const parseValue = (value: FormDataEntryValue | null) => {
      if (typeof value !== "string") {
        return value;
      }

      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    };
    const raw = {
      name: parseValue(formData.get("name")),
      address: parseValue(formData.get("address")),
      postalCode: formData.get("postalCode"),
      city: parseValue(formData.get("city")),
      phone: parseValue(formData.get("phone")),
      description: parseValue(formData.get("description")),
      categories: formData
        .getAll("categories")
        .flatMap((cat) => parseValue(cat) as string[]),
      paymentCategories: formData
        .getAll("paymentCategories")
        .flatMap((pay) => parseValue(pay) as string[]),
      openingHours: parseValue(formData.get("openingHours")),
      photos: formData.getAll("photos"),
    };
    const apiPayload = {
      name: DOMPurify.sanitize(raw.name),
      address: DOMPurify.sanitize(raw.address),
      postalCode: Number(raw.postalCode),
      city: DOMPurify.sanitize(raw.city),
      description: DOMPurify.sanitize(raw.description),
      phone: DOMPurify.sanitize(raw.phone),
      categories: raw.categories.map((c: string) => ({ name: c })),
      paymentCategories: raw.paymentCategories.map((p: string) => ({
        type: DOMPurify.sanitize(p),
      })),
      openingHours: (raw.openingHours as any[]).flatMap((day: any) => [
        {
          daysOfWeek: DOMPurify.sanitize(day.daysOfWeek),
          serviceName: "LUNCH",
          isClosed: DOMPurify.sanitize(day.lunchIsClosed),
          openTime: day.lunchIsClosed
            ? null
            : DOMPurify.sanitize(
                new Date(`1970-01-01T${day.lunchOpenTime}:00Z`).toISOString(),
              ),
          closeTime: day.lunchIsClosed
            ? null
            : DOMPurify.sanitize(
                new Date(`1970-01-01T${day.lunchCloseTime}:00Z`).toISOString(),
              ),
        },
        {
          daysOfWeek: DOMPurify.sanitize(day.daysOfWeek),
          serviceName: "DINNER",
          isClosed: DOMPurify.sanitize(day.dinnerIsClosed),
          openTime: DOMPurify.sanitize(day.dinnerIsClosed)
            ? null
            : DOMPurify.sanitize(
                new Date(`1970-01-01T${day.dinnerOpenTime}:00Z`).toISOString(),
              ),
          closeTime: day.dinnerIsClosed
            ? null
            : DOMPurify.sanitize(
                new Date(`1970-01-01T${day.dinnerCloseTime}:00Z`).toISOString(),
              ),
        },
      ]),
      restaurantImages: (raw.photos as File[]).map((file) => ({
        link: DOMPurify.sanitize(URL.createObjectURL(file)),
        restaurant: "",
      })),
    };
    const session = await getSession(request.headers.get("Cookie"));
    let token = session.get("token");
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/restaurants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(apiPayload),
      },
    );
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erreur API: ${text}`);
    }
    return {
      success: true,
      message: "La fiche restaurant a été créee avec succès!",
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    return {
      success: false,
      error: "Erreur de connexion. Veuillez réessayer",
    };
  }
};

export default function AddRestaurantPage() {
  const { paymentType, categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const visibleCount = 10;
  const visibleCategories = categories.slice(0, visibleCount);
  const hiddenCategories = categories.slice(visibleCount);
  const daysOfWeek: (
    | "Lundi"
    | "Mardi"
    | "Mercredi"
    | "Jeudi"
    | "Vendredi"
    | "Samedi"
    | "Dimanche"
  )[] = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const updateHeight = useCallback(() => {
    if (containerRef.current) {
      const scrolHeight = containerRef.current.scrollHeight;
      setMaxHeight(expanded ? `${scrolHeight}px` : "0px");
    }
  }, [expanded]);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new ResizeObserver(updateHeight);
    observer.observe(target);

    return () => {
      observer.observe(target);
    };
  }, [updateHeight]);

  const {
    handleSubmit,
    formState: { errors, isValid },
    register,
    watch,
    reset,
    control,
  } = useRemixForm<FormData>({
    mode: "onBlur",
    resolver,
    defaultValues: {
      // Initialiser tous les champs
      openingHours: daysOfWeek.map((day) => ({
        daysOfWeek: day,
        lunchIsClosed: false,
        lunchOpenTime: "12:00",
        lunchCloseTime: "14:00",
        dinnerIsClosed: false,
        dinnerOpenTime: "19:00",
        dinnerCloseTime: "22:00",
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "openingHours",
  });

  return (
    <section className="container m-auto mb-24">
      <h1 className="text-coral">Créer une fiche restaurant</h1>
      {actionData?.success && <div>{actionData.message}</div>}
      <Form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div>
            <Input
              type="text"
              classname="w-1/3"
              label="Nom du restaurant"
              placeholder="Nom du restaurant"
              {...register("name")}
              error={errors?.name?.message}
              aria-label="Nom du restaurant"
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="w-1/3">
              <Input
                type="text"
                label="Adresse"
                placeholder="Adresse"
                {...register("address")}
                error={errors?.address?.message}
                aria-label="Adresse"
              />
            </div>
            <div className="w-36">
              <Input
                type="text"
                label="Code Postal"
                placeholder="Code Postal"
                {...register("postalCode", { valueAsNumber: true })}
                error={errors?.postalCode?.message}
                aria-label="Code Postal"
              />
            </div>
            <div className="w-1/3">
              <Input
                type="text"
                label="Ville"
                placeholder="Ville"
                {...register("city")}
                error={errors?.city?.message}
                aria-label="Ville"
              />
            </div>
          </div>
          <div>
            <Input
              type="text"
              classname="w-1/3"
              label="Téléphone"
              placeholder="Téléphone"
              {...register("phone")}
              error={errors?.phone?.message}
              aria-label="Téléphone"
            />
          </div>
          <div>
            <TextArea
              label="Description"
              row={5}
              {...register("description")}
              error={errors?.description?.message}
              aria-label="Description"
            />
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <h3 className="font-urbanist mb-6 block text-base">
              Type de règlement
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {paymentType.map((payment) => (
                <>
                  <div className="flex w-[180px] justify-between gap-3">
                    <label
                      key={payment.id}
                      htmlFor={payment.type}
                      className="text-sm"
                    >
                      {payment.type}
                    </label>
                    <input
                      id={payment.type}
                      className="accent-coral border border-red-500"
                      type="checkbox"
                      value={payment.type}
                      {...register("paymentCategories")}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <h3 className="font-urbanist mb-6 block text-base">
              Type de cuisine
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {visibleCategories.map((category) => (
                <>
                  <div className="flex w-[180px] items-center justify-between gap-3">
                    <label
                      key={category.id}
                      htmlFor={category.name}
                      className="text-sm"
                    >
                      {category.name}
                    </label>
                    <input
                      className="accent-coral rounded-2xl border border-red-500"
                      id={category.name}
                      type="checkbox"
                      value={category.name}
                      {...register("categories")}
                    />
                  </div>
                </>
              ))}

              <div
                ref={containerRef}
                className="col-span-5 overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: expanded ? `${maxHeight}` : "0px" }}
              >
                <div className="mt-2 grid grid-cols-5 gap-4">
                  {hiddenCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex w-[180px] items-center justify-between gap-3"
                    >
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm"
                      >
                        {category.name}
                      </label>
                      <input
                        id={`category-${category.id}`}
                        type="checkbox"
                        value={category.name}
                        {...register("categories")}
                        className="accent-coral"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {hiddenCategories.length > 0 && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="font-urbanist w-fit"
                >
                  {expanded ? (
                    <span className="flex flex-row items-center">
                      Voir moins
                      <Icon name="arrowup" className="" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {`Voir ${hiddenCategories.length} catégories de plus`}
                      <Icon name="arrowdown" className="" />
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <h3 className="font-urbanist mb-6 block text-base">Horaires</h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-7">
              {fields.map((field, index) => (
                <DaySchedule
                  key={field.id}
                  index={index}
                  dayName={field.daysOfWeek}
                  register={register}
                  watch={watch}
                  errors={errors}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-3">
            <h3 className="font-urbanist mb-6 block text-base">Photos</h3>
            <input
              className="cursor-pointer rounded-lg border border-gray-200 bg-gray-100"
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              multiple
              name="photos"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const tooBig = files.some((f) => f.size > 20 * 1024 * 1024); // 20 Mo
                if (tooBig) {
                  alert("Un fichier dépasse 20 Mo !");
                  e.target.value = ""; // reset
                  setSelectedFiles([]);
                } else {
                  setSelectedFiles(files);
                }
              }}
            />
            {selectedFiles.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {selectedFiles.length} fichier(s) sélectionné(s)
              </div>
            )}
          </div>

          <div className="m-auto">
            <button
              type="submit"
              disabled={!isValid}
              className="bg-coral hover:bg-coral-dark w-fit cursor-pointer rounded-lg p-2 text-white transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Créer la fiche restaurant
            </button>
          </div>
        </div>
      </Form>
    </section>
  );
}

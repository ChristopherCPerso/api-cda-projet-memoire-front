import {
  Form,
  useActionData,
  useSubmit,
  type ActionFunctionArgs,
} from "react-router";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRemixForm } from "remix-hook-form";
import { registerFormSchema } from "~/types/form/registerFormSchema";
import { useEffect, useState } from "react";
import Input from "~/components/ui/Input";

type FormData = zod.infer<typeof registerFormSchema>;
const resolver = zodResolver(registerFormSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const data = {
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    password: formData.get("password"),
    company: { name: formData.get("companyName") },
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { password, ...dataWithoutPassword } = data;

  const finalPayload = {
    ...dataWithoutPassword,
    plainPassword: password,
  };

  try {
    const response = await fetch(`${process.env.BASE_API_URL}/api/users`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload),
    });
    const result = await response.json();

    console.log(response);
    if (response.ok) {
      return {
        success: true,
        user: result,
        status: response.status,
      };
    } else {
      return {
        success: false,
        error: result.message || "Erreur lors de l'inscription",
        status: response.status,
      };
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    return {
      success: false,
      error: "Erreur de connexion. Veuillez réessayer",
    };
  }
};

export default function RegisterPage() {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const [isSuccessfullySend, setIsSuccessFullySend] = useState(false);
  const [isNotSend, setIsNotSend] = useState(false);

  const {
    formState: { errors, isValid },
    register,
    watch,
    reset,
  } = useRemixForm<FormData>({
    mode: "onBlur",
    resolver,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = new FormData();
    form.set("firstname", watch("firstname"));
    form.set("lastname", watch("lastname"));
    form.set("email", watch("email"));
    form.set("password", watch("password"));
    form.set("companyName", watch("company.name"));

    if (form) {
      submit(form, {
        method: "post",
        encType: "multipart/form-data",
      });
    }
  };

  useEffect(() => {
    if (actionData?.success) {
      setIsSuccessFullySend(true);
      reset();
    }

    if (actionData?.error) {
      setIsNotSend(true);
    }
  }, [actionData?.success, reset]);
  return (
    <section className="container mx-auto mb-12 flex flex-row gap-6">
      <div className="w-1/2">
        <img
          src="img/contact-atecna.png"
          alt="représentation des bureau d'atecna"
          className="rounded-lg"
        />
      </div>
      <div className="flex w-1/2 flex-col">
        <h1 className="text-coral">S'inscrire</h1>
        <div className="flex grow flex-row items-center justify-center">
          <div className="relative w-96">
            <div className="bg-coral-light relative z-40 flex h-full w-full rounded-xl ring-8 ring-white">
              <div className="flex w-full flex-col p-3">
                <Form method="post" onSubmit={handleSubmit}>
                  {/* Prénom */}
                  <div className="mb-2">
                    <Input
                      label="Prénom"
                      placeholder="Votre prénom"
                      {...register("firstname")}
                      error={errors.firstname?.message}
                    />
                  </div>

                  {/* Nom */}
                  <div className="mb-2">
                    <Input
                      label="Nom"
                      placeholder="Votre nom"
                      {...register("lastname")}
                      error={errors.lastname?.message}
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-2">
                    <Input
                      label="Email"
                      placeholder="Votre email"
                      {...register("email")}
                      error={errors.email?.message}
                    />
                  </div>
                  <div className="mb-4">
                    <Input
                      label="Nom de l'entreprise"
                      placeholder="Nom de l'entreprise"
                      {...register("company.name")}
                      error={errors.company?.name?.message}
                    />
                  </div>

                  {/* Mot de passe */}
                  <div className="mb-2">
                    <Input
                      label="Mot de Passe"
                      placeholder="Mot de Passe"
                      type="password"
                      {...register("password")}
                      error={errors.password?.message}
                    />
                  </div>

                  {/* Confirmation */}
                  <div className="mb-2">
                    <Input
                      label="Confirmation du Mot de Passe"
                      placeholder="Confirmation du Mot de Passe"
                      type="password"
                      {...register("confirm")}
                      error={errors.confirm?.message}
                    />

                    {isSuccessfullySend && (
                      <p className="text-left text-xs font-bold text-green-500">
                        Votre compte à bien été enregistré !
                      </p>
                    )}
                    {isNotSend && (
                      <p className="text-left text-xs font-bold text-red-500">
                        Une erreur s'est produite lors de l'enregistrement,
                        veuille réessayer.
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="bg-coral hover:bg-coral-dark cursor-pointer rounded-lg p-2 text-white transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      S'inscrire
                    </button>
                  </div>
                </Form>
              </div>
            </div>
            <div className="bg-coral-dark absolute top-4 left-4 z-30 h-full w-full rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

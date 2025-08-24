import {
  Form,
  Link,
  redirect,
  useActionData,
  useSubmit,
  type ActionFunctionArgs,
} from "react-router";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRemixForm } from "remix-hook-form";
import { loginFormSchema } from "~/types/form/loginFormSchema";
import { useEffect, useState } from "react";
import Input from "~/components/ui/Input";
import { commitSession, getSession } from "~/server/utils/session.server";

type FormData = zod.infer<typeof loginFormSchema>;
const resolver = zodResolver(loginFormSchema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();

  const data = {
    username: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/api/login_check`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    if (response.ok) {
      const result = await response.json();

      if (result.token) {
        session.set("token", result.token);
        session.set("refresh_token", result.refresh_token);

        return redirect("/profil", {
          headers: {
            "Set-Cookie": await commitSession(session),
          },
        });
      }
    }

    return { error: "L'email et/ou le mot de passe son érronés" };
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    return {
      success: false,
      error: "Erreur de connexion. Veuillez réessayer",
    };
  }
};

export default function LoginPage() {
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
    form.set("email", watch("email"));
    form.set("password", watch("password"));

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
  }, [actionData?.error, actionData?.success, reset]);
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
                <div className="text-right">
                  <Link to="/register" className="underline">
                    Pas encore de compte ?
                  </Link>
                </div>
                <Form method="post" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="mb-2">
                    <Input
                      label="Email"
                      placeholder="Votre email"
                      {...register("email")}
                      error={errors.email?.message}
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

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="bg-coral hover:bg-coral-dark cursor-pointer rounded-lg p-2 text-white transition-all duration-300 ease-in-out disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      Se connecter
                    </button>
                  </div>
                </Form>
                <div className="text-right">
                  <Link to="/" className="underline">
                    Mot de passe oublié?
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-coral-dark absolute top-4 left-4 z-30 h-full w-full rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

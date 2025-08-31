import { Form, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Auth } from "~/server/utils/auth.server";
import { redirectTo } from "~/utils/redirectTo";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await Auth(request);

  if (!user) {
    return redirectTo({
      request: request,
      to: "/",
      message: "Merci de vous connecté pour accéder à votre profil",
    });
  }

  return user;
};

export default function ProfilPage() {
  const user = useLoaderData<typeof loader>();
  return (
    <section className="container m-auto">
      <h1>Profil {user?.firstname}</h1>
      <Form method="post" action="/logout">
        <button type="submit">Se déconnecter</button>
      </Form>
    </section>
  );
}

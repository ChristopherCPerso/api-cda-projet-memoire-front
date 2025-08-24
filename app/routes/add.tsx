import { type LoaderFunctionArgs } from "react-router";
import { Auth } from "~/server/utils/auth.server";
import { redirectTo } from "~/utils/redirectTo";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isLogged = await Auth(request);

  if (!isLogged) {
    return redirectTo({
      request: request,
      to: "/",
      message: "Vous devez être connecté pour accéder à cette page",
    });
  }
};

export default function AddRestaurantPage() {
  return (
    <section className="container m-auto">
      <h1 className="text-coral">Créer une fiche restaurant</h1>
    </section>
  );
}

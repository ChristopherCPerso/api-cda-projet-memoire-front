import { redirect, type ActionFunctionArgs } from "react-router";
import { destroySession, getSession } from "~/server/utils/session.server";
export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

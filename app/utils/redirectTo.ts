import { redirect } from "react-router";
import { commitSession, getSession } from "~/server/utils/session.server";

type redirectToProps = {
  request: Request;
  to: string;
  message: string;
};

export async function redirectTo({ request, to, message }: redirectToProps) {
  const session = await getSession(request.headers.get("Cookie"));
  session.flash("modalMessage", message);

  return redirect(to, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

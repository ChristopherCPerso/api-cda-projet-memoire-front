import { commitSession, getSession } from "./session.server";
import { decodeJWT, isTokenExpired } from "./jwt.server";
import type { AuthUser } from "../types/AuthUser";

export type AuthResult = AuthUser | null;

export const Auth = async (request: Request): Promise<AuthResult> => {
  const session = await getSession(request.headers.get("Cookie"));
  let token = session.get("token") as string | undefined;
  const refresh_token = session.get("refresh_token");
  let user = session.get("user") as AuthUser | undefined;

  if (!token) return null;

  // 🔄 Refresh token si expiré
  if (isTokenExpired(token)) {
    if (!refresh_token) return null;

    try {
      const refreshResponse = await fetch(
        `${process.env.BASE_API_URL}/api/token/refresh`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ refresh_token }),
        },
      );

      if (!refreshResponse.ok) throw new Error("Refresh token failed");

      const refreshData = await refreshResponse.json();
      token = refreshData.token;
      session.set("token", token);

      // récupérer le user après refresh
      const decodedToken = decodeJWT(token!);
      const userResponse = await fetch(
        `${process.env.BASE_API_URL}/api/users/${decodedToken?.user_id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!userResponse.ok) throw new Error("User fetch failed");
      const userData: AuthUser = await userResponse.json();
      user = userData;
      session.set("user", user);

      // sauvegarder la session
      await commitSession(session);
    } catch (error) {
      console.error("Erreur refresh token :", error);
      return null;
    }
  }

  // 👤 Si user pas encore en session
  if (!user) {
    try {
      const decodedToken = decodeJWT(token!);
      if (!decodedToken) throw new Error("invalid token");

      const userResponse = await fetch(
        `${process.env.BASE_API_URL}/api/users/${decodedToken.user_id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!userResponse.ok) throw new Error("User fetch failed");
      user = await userResponse.json();
      session.set("user", user);

      await commitSession(session);
    } catch (error) {
      console.error("Erreur fetch user :", error);
      return null;
    }
  }

  if (!user) return null;

  return user;
};

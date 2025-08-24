import jwt from "jsonwebtoken";

export interface Jwt {
  iat: number;
  exp: number;
  roles: string[];
  username: string;
  user_id: number;
}

export function decodeJWT(token: string): Jwt | null {
  try {
    const decoded = jwt.decode(token) as Jwt;

    if (!decoded) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Erreur de decodage JWT", error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  // exp est en secondes, Date.now() en millisecondes
  return decoded.exp * 1000 < Date.now();
}

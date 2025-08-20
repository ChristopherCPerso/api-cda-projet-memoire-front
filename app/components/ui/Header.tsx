import { NavLink } from "react-router";

export default function Header() {
  return (
    <nav className="font-urbanist shadow-atecna container mx-auto mb-10 flex w-full flex-row items-center justify-between rounded-full bg-white px-10 py-4 text-base">
      <div className="text-deeper-red flex flex-row items-center gap-3 text-xl">
        <NavLink to="/">
          <img src="/img/logo_atecna.png" alt="Logo de la société Atecna" />
        </NavLink>
        <NavLink
          to="/"
          className="hover:text-coral-dark transition-all duration-300"
          aria-label="Retour à l'acceuil"
        >
          <p>
            <span className="font-bold">atecna</span>dvisor
          </p>
        </NavLink>
      </div>
      <ul className="flex flex-row items-center gap-6">
        <li>
          <NavLink
            to="/restaurant"
            className="hover:text-coral-dark transition-all duration-300 hover:underline"
            aria-label="Voir tous les restaurants"
          >
            Restaurants
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className="hover:text-coral-dark transition-all duration-300 hover:underline"
            aria-label="Accéder à la page contact"
          >
            Contactez-nous
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" aria-label="Accéder à votre profil utilisateur">
            <img src="/img/SignIn.png" alt="Icône de connexion" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

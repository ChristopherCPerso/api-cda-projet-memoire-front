import { NavLink } from "react-router";

export default function Header() {
  return (
    <nav className="font-urbanist shadow-atecna container mx-auto mb-10 flex flex-row items-center justify-between rounded-full p-10 py-4 text-base">
      <div className="text-deeper-red flex flex-row items-center gap-3 text-xl">
        <NavLink to="/">
          <img src="/img/logo_atecna.png" alt="Logo de la société Atecna" />
        </NavLink>
        <p>
          <span className="font-bold">atecna</span>dvisor
        </p>
      </div>
      <ul className="flex flex-row items-center gap-3">
        <li>
          <NavLink to="/restaurant">Restaurants</NavLink>
        </li>
        <li>
          <NavLink to="/">Contactez-nous</NavLink>
        </li>
        <li>
          <NavLink to="/">
            <img src="/img/SignIn.png" alt="Icône de connexion" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

import { NavLink } from "react-router";

export default function Header() {
  return (
    <div className="font-urbanist container mx-auto flex flex-row items-center justify-between rounded-full p-10 py-4 text-base shadow-2xl">
      <div className="flex flex-row items-center gap-3 text-xl">
        <img src="/img/logo_atecna.png" alt="Logo de la société Atecna" />
        <p>
          <span className="font-bold">atecna</span>dvisor
        </p>
      </div>

      <nav>
        <ul className="flex flex-row items-center gap-3">
          <li>
            <NavLink to="/">Restaurant</NavLink>
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
    </div>
  );
}

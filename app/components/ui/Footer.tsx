import { Link } from "react-router";

export default function Footer() {
  const logo = "/img/logo_atecna_big.png";

  return (
    <footer className="bg-blue-night grid min-h-[300px] grid-cols-4 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute -top-8 -left-12">
          <img
            src={logo}
            alt="Logo de la société Atecna"
            className="opacity-20"
          />
        </div>
      </div>

      <div className="font-sm font-open col-span-2 self-end text-center">
        &copy;Atecna - 2025
      </div>

      <div className="font-open flex justify-end self-center p-6">
        <ul className="space-y-3">
          <li>
            {" "}
            <Link className="hover:underline" to="/">
              Restaurant
            </Link>
          </li>
          <li>
            {" "}
            <Link className="hover:underline" to="/">
              Ajouter un restaurant
            </Link>
          </li>
          <li>
            {" "}
            <Link className="hover:underline" to="/">
              Contactez-nous
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

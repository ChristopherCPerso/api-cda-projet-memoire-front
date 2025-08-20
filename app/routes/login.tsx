import { Form, Link } from "react-router";

export default function LoginPage() {
  return (
    <section className="container mx-auto mb-12 flex flex-row gap-6">
      <div className="w-1/2">
        <img
          src="img/contact-atecna.png"
          alt="représentation des bureau d'atecna"
          className="rounded-lg"
        />
      </div>
      <div className="flex w-1/2 flex-col">
        <h1 className="text-coral">Se connecter</h1>
        {/* Ajout de grow pour que cet élément s'étende */}
        <div className="flex grow flex-row items-center justify-center">
          <div className="relative h-96 w-96">
            {/* Z-INDEX PLUS BAS : CET ÉLÉMENT SERA EN DESSOUS */}
            <div className="bg-coral-light relative z-40 flex h-full w-full rounded-xl ring-8 ring-white">
              <div className="flex w-full flex-col p-3">
                <div className="text-right">
                  <Link to="/register" className="underline">
                    Pas encore de compte ?
                  </Link>
                </div>
                <Form></Form>
                <div className="text-right">
                  <Link to="/" className="underline">
                    Mot de passe oublié?
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-coral-dark absolute top-4 left-4 z-30 h-full w-full rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { mount } from "cypress/react";
import { useState } from "react";
import Input from "~/components/ui/Input";

// Petit wrapper pour simuler le formulaire et validation client
function EmailForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleBlur = () => {
    if (!validateEmail(value)) {
      setError("L'adresse e-mail n'est pas valide");
    } else {
      setError("");
    }
  };

  return (
    <form>
      <Input
        name="email"
        label="Email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        error={error}
      />
      {error && <p>{error}</p>}
    </form>
  );
}

describe("Input Email Component", () => {
  it("affiche un message d'erreur si l'email n'est pas valide", () => {
    mount(<EmailForm />);

    cy.get("input[name='email']")
      .type("test") // tape un email invalide
      .blur(); // déclenche la validation

    cy.contains("L'adresse e-mail n'est pas valide").should("be.visible");
  });

  it("n'affiche pas d'erreur si l'email est valide", () => {
    mount(<EmailForm />);

    cy.get("input[name='email']").type("test@example.com").blur();

    cy.contains("L'adresse e-mail n'est pas valide").should("not.exist");
  });
});

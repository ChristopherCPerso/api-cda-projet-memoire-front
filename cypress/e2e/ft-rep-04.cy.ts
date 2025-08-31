import "cypress-plugin-tab";

describe("Page /login - Navigation clavier et accessibilité", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("les champs du formulaire sont présents", () => {
    cy.get("form").should("exist");
    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("button[type='submit']").should("be.visible");
  });

  it("navigation au clavier avec Tab", () => {
    // Attendre que le champ email soit visible (hydratation terminée)
    cy.get("input[name='email']").should("be.visible");
    // 1er Tab -> email
    cy.get("input[name='email']").focus();
    cy.get("input[name='email']").should("have.focus");
    cy.focused().tab();

    // 2ème Tab -> password
    cy.get("input[name='password']").focus();
    cy.get("input[name='password']").should("have.focus");
    cy.focused().tab();

    // 3ème Tab -> bouton submit
    cy.get("button[type='submit']").should("be.disabled");
  });
});

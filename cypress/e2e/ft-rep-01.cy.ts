describe("FT-REP-01 - Page Inscription", function () {
  it("Affiche un message d'erreur si l'email n'est pas valide", function () {
    cy.visit("/register");
    cy.get("input[name='email']").type("test"); // tape quelque chose de non valide
    cy.get("input[name='company.name']").type("test");

    cy.contains("L'adresse e-mail n'est pas valide").should("be.visible");
  });
});

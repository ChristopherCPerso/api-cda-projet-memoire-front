describe("FT-REP-02 - Page Connexion (E2E)", () => {
  beforeEach(() => {
    cy.visit("/login"); // ouvre la page de login
  });

  it("Scénario 1 : identifiants valides redirige vers profil", () => {
    cy.get("input[name='email']").type("bdcajou@cytest.com");
    cy.get("input[name='password']").type("j3Su1sL3mdp!").blur();
    cy.get("button[type='submit']").click();

    // On attend la redirection et vérifie que l'on est sur la page profil
    cy.url().should("include", "/profil");
    cy.contains("Profil").should("be.visible"); // message de bienvenue sur le profil
  });

  it("Scénario 2 : identifiants incorrects affichent un message d'erreur", () => {
    cy.get("input[name='email']").type("wrong@example.com");
    cy.get("input[name='password']").type("wrongpass").blur();
    cy.get("button[type='submit']").click();

    // Vérifie le message d'erreur sur la page login
    cy.contains("L'email et/ou le mot de passe son érronés").should(
      "be.visible",
    );
    cy.url().should("include", "/login"); // on reste sur la page login
  });
});

describe("FT-REP-02 - Création d'une Fiche Restaurant", function () {
  this.beforeEach(() => {
    cy.visit("/login");
    cy.get("input[name='email']").type("bdcajou@cytest.com");
    cy.get("input[name='password']").type("j3Su1sL3mdp!").blur();
    cy.get("button[type='submit']").click();

    // On attend la redirection et vérifie que l'on est sur la page profil
    cy.url().should("include", "/profil");
    cy.visit("/restaurant/add");
  });

  it("Soumission réussie avec tous les champs valides", () => {
    cy.get("input[name='name']").type("Chez Testeur");
    cy.get("input[name='address']").type("123 Rue Exemple");
    cy.get("input[name='postalCode']").type("75001");
    cy.get("input[name='city']").type("Paris");
    cy.get("input[name='phone']").type("0123456789");
    cy.get("textarea[name='description']").type("Super restaurant test");

    // coche une catégorie et un type de règlement (premiers disponibles)
    cy.get("input[name='paymentCategories']").first().check({ force: true });
    cy.get("input[name='categories']").first().check({ force: true }).blur();

    // submit
    cy.get("button[type='submit']").click();

    // vérifie un message de succès ou redirection
    cy.contains("La fiche restaurant a été créee avec succès!").should(
      "be.visible",
    );
  });

  it("Affiche des erreurs si champs obligatoires vides", () => {
    cy.get("button[type='submit']").should("be.disabled");
  });
});

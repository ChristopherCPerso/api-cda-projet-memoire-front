describe("E2E-REP-01 - Inscription, Connexion, Ajout et Vérification Restaurant", () => {
  const firstname = "Benoit";
  const lastname = "De Cajou";
  const company = "Test Academy";
  const email = `testuser${Date.now()}@example.com`; // email unique
  const password = "Password123!";
  const confirm = password;

  //const restaurantName = "Le Testeur Gourmet";

  it("Parcours nominal complet", () => {
    // 1️⃣ Inscription
    cy.visit("/register"); // ou /signup selon ton app
    cy.wait(1500);
    cy.get("input[name='firstname']").type(firstname);
    cy.get("input[name='lastname']").type(lastname);
    cy.get("input[name='company.name']").type(company);
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("input[name='confirm']").type(confirm).blur(); // si tu as un champ confirmation
    cy.get("button[type='submit']").click();

    // Vérifie qu'on est redirigé ou qu'un message de succès apparaît
    cy.contains("Votre compte à bien été enregistré !").should("exist");

    // 2️⃣ Connexion
    cy.visit("/login");
    cy.wait(1500);
    cy.get("input[name='email']").type("bdcajou@cytest.com");
    cy.get("input[name='password']").type("j3Su1sL3mdp!").blur();
    cy.get("button[type='submit']").click();

    // On attend la redirection et vérifie que l'on est sur la page profil
    cy.url().should("include", "/profil");
    cy.contains("Profil").should("be.visible"); // message de bienvenue sur le profil

    // 3️⃣ Création d'un restaurant
    cy.visit("/restaurant/add");
    cy.wait(1500);
    cy.get("input[name='name']").type("Les Testeur Gourmet");
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

    // // 4️⃣ Vérification dans la liste
    cy.visit("/restaurant");
    cy.contains("Les Testeur Gourmet").should("exist").and("be.visible");
  });
});

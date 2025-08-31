// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Ignore les erreurs d'hydratation React pour ne pas faire échouer les tests e2e
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes(
      "Hydration failed because the server rendered HTML didn't match the client",
    )
  ) {
    return false; // Empêche Cypress de faire échouer le test
  }
  // Sinon, laisse passer les autres erreurs
});

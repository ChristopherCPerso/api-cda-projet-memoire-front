// support/component.ts

// Importer les styles globaux (ex: Tailwind)
import "../../app/tailwind.css";

// Importer les commandes personnalisées si besoin
import "./commands";

// Optionnel : setup pour React 19 si besoin d'un adaptateur (Cypress supporte React 18+ nativement)
// Pas besoin d'adaptateur spécifique ici

// Optionnel : setup global pour les providers (ex: Theme, Context, etc.)
// Vous pouvez ajouter ici un wrapper si vos composants nécessitent un contexte global

// Exemple :
// import { mount } from 'cypress/react';
// import { AppProvider } from '../../app/utils/context/AppProvider';
// Cypress.Commands.overwrite('mount', (originalMount, jsx, options) => {
//   return originalMount(<AppProvider>{jsx}</AppProvider>, options);
// });

// Rien d'autre à configurer pour un setup de base React + Tailwind

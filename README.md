# 🍽️ AtecnAdvisor

**AtecnAdvisor** est une application web moderne de conseils et recommandations de restaurants, construite avec React Router, TypeScript et TailwindCSS.

## 🚀 Technologies Utilisées

- **Frontend** : React 19 + TypeScript
- **Framework** : React Router v7 (Full-Stack)
- **Styling** : TailwindCSS v4
- **Build Tool** : Vite
- **Testing** : Cypress
- **Linting** : ESLint + Prettier
- **Containerisation** : Docker

## 📋 Prérequis

- **Node.js** : Version 20.x ou supérieure
- **npm** : Version 9.x ou supérieure
- **Git** : Pour le clonage du repository

## 🛠️ Installation et Configuration

### 1. Clonage du Repository

```bash
# Cloner le repository principal
git clone https://github.com/ChristopherCPerso/front-atecnadvisor
cd atecnadvisor
```

### 2. Installation des Dépendances

```bash
# Installer toutes les dépendances
npm install
```

### 3. Configuration des Variables d'Environnement

**⚠️ IMPORTANT** : Contactez votre lead développeur pour récupérer le fichier `.env` contenant les variables d'environnement nécessaires.

```bash
# Créer le fichier .env à la racine du projet
touch .env

# Ajouter les variables d'environnement fournies par le lead dev
# Exemple de structure (à adapter selon votre configuration) :
NODE_ENV=development
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
# ... autres variables
```

### 4. Lancement du Projet

#### Mode Développement

```bash
# Lancer le serveur de développement avec HMR
npm run dev

# L'application sera accessible sur : http://localhost:5173
```

#### Mode Production

```bash
# Construire l'application pour la production
npm run build

# Démarrer le serveur de production
npm start
```

## 🔧 Scripts Disponibles

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Lance le serveur de développement avec HMR |
| `npm run build`     | Construit l'application pour la production |
| `npm start`         | Démarre le serveur de production           |
| `npm run typecheck` | Vérifie les types TypeScript               |
| `npm test`          | Lance les tests Cypress                    |
| `npm run preview`   | Prévisualise le build de production        |

## 📁 Structure du Projet

```
atecnadvisor/
├── app/                    # Code source principal
│   ├── components/        # Composants React réutilisables
│   ├── routes/           # Routes de l'application
│   ├── context/          # Contextes React (Auth, etc.)
│   ├── types/            # Définitions TypeScript
│   └── assets/           # Assets statiques (icônes, images)
├── build/                 # Build de production
├── cypress/              # Tests end-to-end
├── public/               # Assets publics
├── server/               # Configuration serveur
└── types/                # Types globaux
```

## 🎯 TypeScript

Ce projet utilise **TypeScript** pour une meilleure maintenabilité et sécurité du code :

### Configuration

- **Strict Mode** : Activé pour une vérification stricte des types
- **ES2022** : Cible JavaScript moderne
- **Path Mapping** : Alias `~/*` pour les imports depuis `./app/*`

### Bonnes Pratiques

- Toujours typer vos composants et fonctions
- Utiliser les interfaces pour les props des composants
- Lever des erreurs TypeScript avant de commiter

## 🌿 Workflow Git et Déploiement

### Règle d'Or : Une Tâche = Une Branche

```bash
# 1. Créer une nouvelle branche pour votre tâche
git checkout -b feat/REP-123-ajout-filtre-restaurants

# 2. Développer et tester votre fonctionnalité
# ... votre code ...

# 3. Vérifier les modifications avant de push
git add .
git commit -m "REP-123 : ajout du filtre de recherche par cuisine"

# 4. Pousser votre branche
git push origin feat/REP-123-ajout-filtre-restaurants
```

### Convention de Nommage des Branches

```
<type>/<ticket>-<description>
```

**Types de branches :**

- `feat/` : Nouvelles fonctionnalités
- `fix/` : Corrections de bugs
- `enhance/` : Améliorations
- `chore/` : Tâches de maintenance
- `docs/` : Documentation

**Exemples :**

- `feat/REP-123-ajout-filtre-restaurants`
- `fix/REP-456-correction-bug-connexion`
- `enhance/REP-789-amelioration-performance`

### Création de Pull Request / Merge Request

#### 1. Vérification Pré-PR

```bash
# Vérifier que votre code compile
npm run typecheck

# Lancer les tests
npm test

# Vérifier le linting
npm run lint
```

#### 2. Structure de la PR

```
Titre : [FEAT] REP-123: Ajout du filtre de recherche par cuisine

Description :
## Type de changement
- [ ] Bug fix
- [x] Nouvelle fonctionnalité
- [ ] Amélioration
- [ ] Documentation

## Description
Ajout d'un filtre permettant aux utilisateurs de rechercher des restaurants par type de cuisine.

## Ticket associé
REP-123


## Checklist
- [x] Code conforme aux standards du projet
- [x] Tests ajoutés/modifiés
- [x] Pas de console.log ou debug
```

### Mise en Production

**🚀 La mise en production se fait automatiquement lors du merge sur la branche `main`**

```bash
# 1. Votre PR est approuvée et mergée sur main
# 2. Le pipeline CI/CD se déclenche automatiquement
# 3. Build et déploiement automatiques
# 4. Vérification post-déploiement
```

## 🧪 Tests

### Tests Cypress

```bash
# Ouvrir l'interface Cypress
npm test

# Lancer les tests en mode headless
npx cypress run

# Lancer un test spécifique
npx cypress run --spec "cypress/e2e/ft-rep-01.cy.ts"
```

### Tests TypeScript

```bash
# Vérification des types
npm run typecheck

# Build de vérification
npm run build
```

## 🔍 Développement

### Hot Module Replacement (HMR)

- Modifications automatiques du code sans rechargement
- Disponible en mode développement avec `npm run dev`

### Debugging

- Utilisez les DevTools du navigateur
- Console Node.js disponible dans le terminal
- Logs automatiques avec Morgan

## 📚 Ressources Utiles

- [Documentation React Router](https://reactrouter.com/)
- [Documentation TypeScript](https://www.typescriptlang.org/)
- [Documentation TailwindCSS](https://tailwindcss.com/)
- [Documentation Cypress](https://docs.cypress.io/)

## 🤝 Contribution

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité
3. **Commitez** vos changements
4. **Poussez** vers la branche
5. **Ouvrez** une Pull Request

## 📞 Support

- **Lead Dev** : Christopher Chiarandini
- **Email** : cchiarandini@atecna.fr

---

**AtecnAdvisor** - Construit avec ❤️ par l'équipe Atecna

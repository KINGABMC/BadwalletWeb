Voici un fichier `README.md` complet, propre et prêt à l'emploi pour ton projet **BadWallet**. Il est structuré pour présenter efficacement ton application (parfait pour un dépôt Git ou une soutenance).

Tu as juste à créer un fichier nommé `README.md` à la racine de ton projet et à y copier-coller ce contenu.

---

```markdown
# 💳 BadWallet Dashboard

Une application web de Fintech moderne inspirée des solutions de paiement mobile (Wave, Orange Money), développée avec **Angular** pour le frontend et connectée à une API **Spring Boot** pour la gestion des portefeuilles et des transactions.

---

## 🚀 Fonctionnalités

L'application est divisée en deux espaces distincts et sécurisés selon le rôle de l'utilisateur :

### ⚙️ Espace Agent (Admin)
* **Gestion des Portefeuilles :** Visualisation complète de la liste des comptes enregistrés.
* **Enregistrement Client :** Formulaire de création et d'inscription de nouveaux clients.
* **Opérations de Guichet :** Interface dédiée pour effectuer des dépôts et des retraits physiques.

### 👤 Espace Client
* **Double Authentification Intermédiaire :** Accès sécurisé via la vérification du numéro de téléphone.
* **Suivi du Solde :** Affichage en temps réel du solde disponible (formaté en XOF).
* **Transferts de fonds :** Envoi d'argent instantané vers un autre compte.
* **Historique :** Tableau détaillé et coloré de l'historique des transactions (Dépôts, Retraits, Transferts).

---

## 🛠️ Architecture Technique

* **Frontend :** Angular (Architecture Standalone, Angular Signals pour la gestion d'état, Reactive/Template-driven Forms).
* **Backend (API) :** Spring Boot fonctionnant sur `http://localhost:8080`.
* **Design :** CSS3 Moderne avec variables globales, Flexbox, Grid, et un thème sombre/bleu orienté Fintech.

---

## 📦 Installation et Démarrage

### 1. Prérequis
* [Node.js](https://nodejs.org/) (v18 ou supérieur recommandé)
* [Angular CLI](https://angular.dev/) installé globalement (`npm install -g @angular/cli`)
* Le serveur Backend fonctionnant sur le port `8080`.

### 2. Clonage et Installation des dépendances
```bash
git clone <url-de-votre-depot>
cd badwallet-dashboard
npm install

```

### 3. Lancement du projet

Pour démarrer le serveur de développement Angular, exécutez :

```bash
ng serve

```

Rendez-vous ensuite sur `http://localhost:4200` dans votre navigateur.

---

## 🗺️ Structure des Dossiers Principaux

```text
src/app/
├── core/
│   └── services/       # Services d'authentification (SecurityService) et de state (BalanceStore)
├── features/
│   ├── public/         # Zone Publique (Écran de Login général)
│   └── private/        # Zone Privée (Dashboard Client, Transferts, Gestion Agent)
├── layouts/
│   └── private/        # Structure enveloppe (PrivateComponent) et Header dynamique
└── shared/
    └── pipes/          # Pipe de formatage monétaire (XofPipe)

```

---


```
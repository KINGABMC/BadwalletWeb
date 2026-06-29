📝 RAPPORT TECHNIQUE DE DÉVELOPPEMENT : DASHBOARD BADWALLETDate : 29 juin 2026
Technologies clés : Angular (Standalone, Signals, Router), CSS3, API REST Spring Boot
1. Choix d'architecture et alignement fonctionnel
L'objectif était de structurer et sécuriser l'interface de BadWallet, une application Fintech inspirée de solutions comme Wave ou Orange Money, connectée à une API Spring Boot (port 8080). L'enjeu principal consistait à cloisonner les accès et les privilèges selon le rôle de l'utilisateur (AGENT ou CLIENT).
Pour y parvenir, les choix architecturaux suivants ont été appliqués :
•	Composants Standalone : Choix d'une architecture moderne d'Angular sans modules (NgModule) pour maximiser la modularité et accélérer le chargement.
•	Angular Signals : Utilisation des Signals pour une réactivité fine et performante lors de la mise à jour des soldes et du stockage des rôles.
•	Nouvelle syntaxe @if : Remplacement des anciennes directives structurelles (*ngIf) pour optimiser le rendu et s'affranchir des dépendances au CommonModule.
🛠️ 2. Réalisations techniques
•	Restructuration du Routage : Centralisation et hiérarchisation de toutes les fonctionnalités de gestion sous le préfixe /private dans app.routes.ts afin d'éviter les conflits d'URLs.
•	Header Dynamique : Intégration de <app-header> dans la Feature privée. Couplé au SecurityService, il évalue le rôle en temps réel pour masquer les liens sensibles et afficher le menu contextuel approprié.
•	Refonte Graphique Fintech : Modernisation visuelle (Bleu royal, Ardoise, Vert succès, Rouge alerte) basée sur des variables CSS, Flexbox et Grid. L'historique intègre désormais un tableau bancaire équipé de badges de statuts dynamiques (DEPOSIT, TRANSFER_OUT).
•	Cache Réactif Client : Mise en mémoire du numéro de téléphone validé dans le SecurityService. Le cycle de vie (ngOnInit) détecte cette donnée lors des navigations internes pour bypasser automatiquement le formulaire d'accès intermédiaire.
🔬 3. Difficultés rencontrées et résolutions
❌ A. Invisibilité du Header privé après connexion
•	Cause : Une erreur de liaison de classe dans les routesenfants ciblait le mauvais composant. De plus, le composant enveloppe n'avait pas déclaré la classe Header dans ses métadonnées (imports: [...]), poussant Angular à ignorer la balise HTML inconnue <app-header>.
•	Résolution : Réalignement des classes de routes et intégration du composant dans les imports du décorateur TypeScript pour forcer l'instanciation immédiate du menu.
❌ B. Flux bloqués et Erreur net::ERR_CONNECTION_REFUSED
•	Cause : Lors de la phase d'initialisation (ngOnInit), le client HTTP d'Angular tentait de joindre le backend sans succès. L'erreur de connexion (status 0) indiquait que le serveur Spring Boot local était éteint ou inaccessible.
•	Résolution : Implémentation de l'opérateur RxJS catchError pour sécuriser le flux frontend et synchronisation du démarrage du serveur d'API sur le port 8080.
❌ C. Non-application des styles CSS sur les boutons
•	Cause : Les sélecteurs CSS possédaient une imbrication parent-enfant trop rigide. Suite à une légère modification du balisage HTML pour fluidifier la saisie, les styles sont devenus caducs, laissant place au design générique du navigateur.
•	Résolution : Désimbrication des règles pour créer des classes utilitaires indépendantes (.btn-primary et .btn-action) et application ciblée de la directive de priorité !important pour écraser le rendu natif du navigateur.


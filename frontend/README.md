# DevTools

## Introduction
Les DevTools sont un ensemble d'outils intégrés dans les navigateurs web pour aider les développeurs à inspecter, déboguer et analyser les pages web.

Source 1 : [Chrome Developer Tools](https://www.markup.io/blog/chrome-developer-tools/#:~:text=Well%2C%20with%20'Design%20Mode%2C,on%2C%E2%80%9D%20and%20hit%20enter.)

## Sommaire
- [Elements](#elements)
- [Console](#console)
- [Sources](#sources)
- [Network](#network)
- [Performance](#performance)
- [Memory](#memory)
- [Application](#application)
- [Security](#security)
- [Shortcuts](#shortcuts)
- [Ajouter TailwindCSS ou Bootstrap](#ajouter-tailwindcss-ou-bootstrap)

## Elements
![Badge](https://img.shields.io/badge/Onglet-Elements-blue)
L'onglet **Elements** permet de visualiser et de modifier le HTML et le CSS d'une page web.

### Fonctionnalités Principales
- **Inspecter les éléments** : Cliquez avec le bouton droit sur un élément de la page et sélectionnez "Inspecter".
- **Modifier le HTML** : Double-cliquez sur un élément HTML pour le modifier.
- **Modifier le CSS** : Modifiez les styles directement dans le panneau de style.

![image](https://github.com/user-attachments/assets/5d41fd79-75f6-40f6-80f3-7f4f4c300702)
![image](https://github.com/user-attachments/assets/cdd7f995-8135-489d-aa65-406e2688a75f)


## Console
![Badge](https://img.shields.io/badge/Onglet-Console-blue)
L'onglet **Console** est utilisé pour afficher les messages de journalisation, exécuter des JavaScript et diagnostiquer les erreurs.

### Fonctionnalités Principales
- **Journalisation** : Utilisez `console.log()` pour afficher des messages.
- **Exécution de JavaScript** : Tapez du code JavaScript et appuyez sur Entrée pour l'exécuter.
- **Messages d'erreur** : Les erreurs JavaScript apparaissent automatiquement ici.

![image](https://github.com/user-attachments/assets/6977d102-1a6d-42ef-b833-ee28e15a7563)

## Sources
![Badge](https://img.shields.io/badge/Onglet-Sources-blue)
L'onglet **Sources** permet de visualiser et de déboguer le code JavaScript.

### Fonctionnalités Principales
- **Déboguer le code** : Ajoutez des points d'arrêt et parcourez le code ligne par ligne.
- **Éditeur de fichiers** : Modifiez le JavaScript directement dans l'onglet.

Excellent pour debug du JS

![image](https://github.com/user-attachments/assets/8e0305bf-bb3e-4f06-816c-0c1233336691)


## Network
![Badge](https://img.shields.io/badge/Onglet-Network-blue)
L'onglet **Network** affiche toutes les requêtes réseau effectuées par la page web.

### Fonctionnalités Principales
- **Suivi des requêtes** : Visualisez les requêtes HTTP et les réponses.
- **Analyse de la performance** : Identifiez les requêtes lentes ou échouées.

![image](https://github.com/user-attachments/assets/397af4de-3e70-439d-8f9d-8d973c0faac7)
![image](https://github.com/user-attachments/assets/b7469714-30ca-4b9c-af6d-2f60afd34a2f)


## Performance
![Badge](https://img.shields.io/badge/Onglet-Performance-blue)
L'onglet **Performance** permet de profiler les performances de votre page web.

### Fonctionnalités Principales
- **Enregistrement de la performance** : Capturez et analysez les performances de la page.
- **Analyse des animations** : Identifiez les problèmes de performance avec les animations.

![image](https://github.com/user-attachments/assets/454d5e9d-3757-49e7-8f39-a4895f107950)
![image](https://github.com/user-attachments/assets/8055f58c-b732-4c5c-a600-c6815608596d)


## Memory
![Badge](https://img.shields.io/badge/Onglet-Memory-blue)
L'onglet **Memory** est utilisé pour profiler l'utilisation de la mémoire et détecter les fuites de mémoire.

### Fonctionnalités Principales
- **Profils de mémoire** : Capturez des instantanés de la mémoire pour analyse.
- **Détection des fuites** : Identifiez les objets qui ne sont pas libérés correctement.

## Application
![Badge](https://img.shields.io/badge/Onglet-Application-blue)
L'onglet **Application** fournit des outils pour gérer le stockage, les caches et les services workers.

### Fonctionnalités Principales
- **Gestion du stockage** : Visualisez et modifiez le LocalStorage, le SessionStorage, et les cookies.
- **Service Workers** : Gérez les service workers enregistrés sur votre site.

![image](https://github.com/user-attachments/assets/23e126a7-8b78-49cb-956f-a623407b4db8)

## Security
![Badge](https://img.shields.io/badge/Onglet-Security-blue)
L'onglet **Security** affiche des informations sur la sécurité de la connexion.

### Fonctionnalités Principales
- **Certificats SSL** : Vérifiez les informations sur les certificats SSL.
- **Sécurité des ressources** : Assurez-vous que les ressources sont chargées de manière sécurisée.

![image](https://github.com/user-attachments/assets/6c6ac817-9e12-4bcd-b094-d25bdbd376db)


## Shortcuts
![Badge](https://img.shields.io/badge/Raccourcis-Clavier-blue)
Voici quelques raccourcis clavier utiles pour les DevTools en français :

| Action | Raccourci |
| ------ | --------- |
| Ouvrir/Fermer les DevTools | `Ctrl + Shift + I` |
| Basculer le mode responsive | `Ctrl + Shift + M` |
| Recharger sans le cache | `Ctrl + Shift + R` |
| Ouvrir l'onglet Elements | `Ctrl + Shift + C` |
| Ouvrir l'onglet Console | `Ctrl + Shift + J` |
| Ouvrir l'onglet Network | `Ctrl + Shift + E` |

## Ajouter TailwindCSS ou Bootstrap

### Utiliser TailwindCSS via CDN

TailwindCSS est un framework CSS utilitaire qui permet de créer des interfaces modernes rapidement.

#### Étape 1: Ajouter le lien CDN

Ajoutez le lien CDN de TailwindCSS dans la balise `<head>` de votre fichier HTML :

```html
<head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
```

#### Étape 2: Utiliser les classes Tailwind

Utilisez les classes TailwindCSS directement dans vos éléments HTML :

```html
<div class="bg-blue-500 text-white p-4">
    Bonjour, TailwindCSS !
</div>
```

### Utiliser Bootstrap via CDN

Bootstrap est un framework CSS populaire pour développer des sites web réactifs et mobiles.

#### Étape 1: Ajouter le lien CDN

Ajoutez le lien CDN de Bootstrap dans la balise `<head>` de votre fichier HTML :

```html
<head>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
```

#### Étape 2: Utiliser les classes Bootstrap

Utilisez les classes Bootstrap directement dans vos éléments HTML :

```html
<div class="container">
    <div class="alert alert-primary" role="alert">
        Bonjour, Bootstrap !
    </div>
</div>
```

### Conclusion

Utiliser des frameworks CSS comme TailwindCSS ou Bootstrap via CDN est une méthode rapide et facile pour améliorer l'apparence de votre site web sans configuration complexe. Profitez des puissantes fonctionnalités de ces outils pour créer des interfaces utilisateur attrayantes et réactives.

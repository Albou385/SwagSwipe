# tch099-demo-web-app
Ce dépôt sera utilisé comme application web PHP démo à déployer sur le cloud Azure

[Example Anis](https://github.com/AnisBoubaker/TCH056-20242/tree/main/cours13)

1. [DB](https://github.com/antoinebou12/TCH099/blob/main/db/README.md)
2. [MyMobileApp](https://github.com/antoinebou12/TCH099/blob/main/MyMobileApp/README.md)
3. [API](https://github.com/antoinebou12/TCH099/blob/main/api/README.md)
4. [Frontend](https://github.com/antoinebou12/TCH099/blob/main/frontend/README.md)

## Prérequis

- Docker
- Docker Compose
- Compte Azure Student

## Fonctionnalités

- **Points de terminaison API:** Créez des points de terminaison API personnalisés pour votre application.
- **Authentification utilisateur:** Implémentez l'authentification utilisateur avec les fonctionnalités de connexion, inscription et déconnexion.
- **Intégration de base de données:** Utilisez la base de données MySQL pour stocker les données des utilisateurs et autres informations.
- **Pages Frontend:** Créez des pages frontend avec HTML, CSS et JavaScript.
- **Support Docker:** Exécutez l'application localement en utilisant Docker Compose.

## Configuration de l'environnement
```
DB_HOST=tch099-db
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=mydatabase
MYSQL_USER=user
MYSQL_PASSWORD=password
```

## Utilisation de Docker

Pour exécuter l'application localement en utilisant Docker:

```bash
- App: http://localhost:8001

- DB: mysql:host=localhost;port=3306;dbname=mydatabase

- Phpmyadmin: http://localhost:8060

Nom d'utilisateur: admin
Mot de passe: rootpassword

Nom d'utilisateur: user
Mot de passe: password
```

```
docker-compose up -d --build
```

## Initialisation de la base de données

```
cd db
python3 -m pip3 install mysql-connector-python python-dotenv
python3 db.py

or

to phpmyadmin
```

## Structure du projet

```
├── api/                        # Dossier contenant les scripts de points de terminaison API
└── utils/                      # Dossier contenant les scripts utilitaires
    └── utils.php               # Fonctions utilitaires pour l'application
│   ├── hello-world.php         # Point de terminaison API pour les messages Hello World
│   ├── login.php               # Point de terminaison API pour la connexion utilisateur
│   ├── logout.php              # Point de terminaison API pour la déconnexion utilisateur
│   ├── randomimage.php         # Point de terminaison API pour obtenir une image aléatoire
│   ├── signup.php              # Point de terminaison API pour l'inscription utilisateur
│   ├── user_details.php        # Point de terminaison API pour récupérer les détails de l'utilisateur
│   └── clients.php             # Point de terminaison API pour récupérer tous les clients

├── db/                         # Dossier contenant les scripts SQL pour la configuration de la base de données
│   ├── 1create.sql             # Script SQL pour créer les tables de la base de données
│   ├── 2contraines.sql         # Script SQL pour ajouter des contraintes
│   ├── 3insert.sql             # Script SQL pour insérer les données initiales dans les tables de la base de données
│   └── db.py                   # Script Python pour créer, modifier et insérer les données initiales dans les tables de la base de données

├── frontend/                   # Dossier contenant les actifs et les pages frontend
│   ├── css/                    # Dossier contenant les fichiers CSS
│   │   └── styles.css          # Feuille de style principale pour le frontend
│   ├── images/                 # Dossier pour stocker les actifs d'image
│   ├── js/                     # Dossier contenant les fichiers JavaScript
│   │   └── script.js           # Fichier JavaScript principal pour le frontend
│   └── pages/                  # Dossier contenant les pages HTML
│       ├── hello-world.html    # Page HTML pour la fonctionnalité Hello World
│       ├── index.html          # Page HTML pour la page d'accueil
│       ├── admin.html          # Page HTML qui voit tous les clients
│       ├── login.html          # Page HTML pour le formulaire de connexion
│       ├── random-image.html   # Page HTML pour afficher une image aléatoire
│       ├── signup.html         # Page HTML pour le formulaire d'inscription
│       └── 404.html            # Page HTML pour les erreurs 404 Not Found

├── config.php                  # Fichier de configuration principal pour le projet
├── router.php                  # Fichier de routage principal pour la gestion du routage URL
├── routes.php                  # Fichier définissant les routes pour l'application
├── Dockerfile                  # Dockerfile pour construire l'image docker
├── docker-compose.yml          # Fichier de configuration Docker Compose pour configurer l'environnement de développement
├── composer.json               # Gestionnaire de dépendances PHP
├── nginx.conf                  # Configuration nginx pour le déploiement Azure
```

## Acteurs

- **Utilisateur:** Un utilisateur qui interagit avec l'application en se connectant, s'inscrivant et accédant à diverses fonctionnalités.
- **Administrateur:** Un utilisateur avec des privilèges élevés qui peut gérer les utilisateurs et d'autres aspects de l'application.

## Cas d'utilisation

![Cas d'utilisation](https://www.plantuml.com/plantuml/dpng/PP51QiGm34NtFeMOVQzGPfZ242WKMjnj4Oam1bi9jaolNyUDgnJlelSYyhzopO99IWm6PraJs4pfUBmjqRCn9TECcU3ouHs3tIw06UpzQn_jflfrTJ1njtMQ-BzyAtAoTLBzwUcxVHfUID27t5_SnSuFh1iFOaee18z499vTt-YYy_EAm3loiaQO8ZhI3Vd5ZPuB4y4j1BW7Jon_cIgkz836jDXFptgIJlGC7MXp9KD5LKCNTMFgzhUg6nDUYPSImmy0)

## Diagramme de classe

![Diagramme de classe](https://www.plantuml.com/plantuml/dpng/RSnD2W8n38RXVK-HlNY70GyYeGqOIDgQ7rs8TzTk1i5Pvdd3jtcWHQgKAkWE5s7guV0g02Tky42hDpJ0Z77cNetqsrTC9-kejBzavtlIIgJ8Sk0JtP_3zjLbDeH-xsg4GUsA0S5A7gXpUSxsx--oKM-fyW40)

## Points de terminaison API

### Authentification utilisateur

#### Connexion

**Point de terminaison:** `/api/login.php`

![Diagramme de séquence de connexion](https://www.plantuml.com/plantuml/dpng/ROv1QyCm38Nl-XMYf_RGvPx3w49M60nQs7OR3CrH6uEZ65l-_xCNvYxGwzEdzxv3L0gQ9WTaT0xu4Ja0-9nPOps9ukOOPb6MuLEsRhvQUHXrShiDKiJZyzThYTOFJ-UNolhHBsWExx4zANrJvFnWPhdOw-sZxm2W-E3-iIwrUF8iU1E1lqkXwaYBvzFREpRaRLD5e9mhstVjKbCcjZleEzolAtwtAUd8aeL9UVZVi99QifYCuHYR2rcN0iE1PKYJ-m40)

**Méthode:** `POST`

**Corps de la requête:**

```json
{
  "username": "exemple",
  "password": "motdepasse"
}
```

**Réponse:**

```json
{
  "status": "success",
  "message": "Connexion réussie"
}
```

#### Inscription

![Diagramme de séquence d'inscription](https://www.plantuml.com/plantuml/dpng/RP2_JiD03CPtFuNLgHrAzWoeHA4IKoiA6n8o5pSzANLEjlF-v8hK8uZry-_x8-_CINsw3a31HyLtOmL8inP3J2IEgxsEuYpTXwmjzZAbXujVXyqAoN3__7cwQKlBq_6bqEcIVk1P_PTkoUcBZ6TB6EKS-s9f6u0y2RUFfQl6GsB1NsFWVijWwQdnU3YzOKKfLcKD523ZRLEZSX_DMNFNUWDjWzi_GVbonxXRP2p7lTuW9O-Ze4qXi5brfZXCoW0xbcv-zpS0)

**Point de terminaison:** `/api/signup.php`

**Méthode:** `POST`

**Corps de la requête:**

```json
{
  "username": "exemple",
  "password": "motdepasse",
  "email": "exemple@exemple.com",
  "role": "utilisateur"
}
```

**Réponse:**

```json
{
  "status": "success",
  "message": "Inscription réussie"
}
```

#### Déconnexion

![Déconnexion](https://www.plantuml.com/plantuml/dpng/NP0nQyCm48Nt-nL7fcH8idiegQi60eK6scw1S9NLH5Gv2UaC_VcrRBUEl3vzzxs7TaaeIdjpG5fyn8za8a3eCgjj81PSxADdCToSU6cvCJ-RgzpSQe6KSFzyFkIeF7Wy7awyTVxYMzc4Q-ZHBZo_z549AnBwf6Gwk_RyPI_vOh2h6W3o85m__5TL-EIi_iRHzHTdPAgeyFZwzevR2lPk1qn0nbLTuV2OEvOhK3MkPvgHJgtM9gL2K6oQSJl3JVxJNm00)

**Point de terminaison:** `/api/logout.php`

**Méthode:** `POST`

**Réponse:**

```json
{
  "status": "success",
  "message": "Déconnexion réussie"
}
```

#### Détails de l'utilisateur

![Détails de l'utilisateur](https://www.plantuml.com/plantuml/dpng/ROu_Ry8m4CNt-nGd9XY0FKD58qF5r0xjXXHTuojOSYwMVPRQRzyO-eSGrdVtUx-tIKfHS-U1MkqZlYME0126qBKka2ZETh4NPR47cJkn_BawQUSNCwI4ksspBz4OU7pP7sIT4yV6ifBpQHLEuGmCfwOup2KVSuQKtYdn86fx-N37Wbr4fWOe72uV_gGLFWSM_Dy4lvVoTMEgy6dxYciARZ8CRbuBRUeAZwnNwNm1fiRblURpi9_2QTbeiN4fUFh2V8t0XiNcpdy3)

**Point de terminaison:** `/api/user_details.php`

**Méthode:** `GET`

**Réponse:**

```json
{
  "status": "success",
  "data": {
    "username": "exemple",
    "email": "exemple@exemple.com",
    "role": "utilisateur"
  }
}
```

### Admin
![Admin](https://www.plantuml.com/plantuml/dpng/TP1DIi0m48NtSugtr4NLHLU1IaLFKEW1GZhIOFfZPhBmzgQD44enYy1yx-LZI2zgewOba7MwHOp2aMZFp3k_srKnR4avtf5SqAW-2ELp2D2ybauq6FWxiIYUxRJubKvS2sBmFhFxAXCLbjFYC_3oTZnxU2GRj4xeEcXCJ01A5KrLrgZwZhKCFhpimVxWtELfrYKG1-6h-DC6-STSivjwuCb7TWhTqBwqV_9reZvV-Nz_0G00)


### Hello World

#### Obtenir le message de salutation

![Hello World](https://www.plantuml.com/plantuml/dpng/RO_DJiCm48JlVefLnI4vXDnpG2KA1IIaLlo8IoMq98jZuQmjUoDUdxe5L9TUFVFjDrv6mI3pP1NsuWAyH0fAUGnYUkEH1HQhu5Y8XoqN8rdhgYyNx70vocJB1M24rStRNGfox7fpl-NwcF2Zt_TtoG5uJSyvrQ7WEqRQoNh77qOdwg3fMgNIFAYk_fGDh3qndEvIltdgvhe6DkkdPwZHc-DnzOL5rZEfl9tuhcsW7wd_JF87fmqNfUfQgCxStk-pgGDHKEPuUkyCeuafeD1j81B3kYZ_GTcF7qdcmA1_wZ1HZAX9gINnC4_s6m00)

**Point de terminaison:** `/api/hello-world/$langue`

**Méthode:** `GET` ou `POST`

**Paramètres de requête:**

- `nom` (optionnel)
- `prenom` (optionnel)

**Réponse:**

```json
{
  "nom": "Doe",
  "prenom": "John",
  "langue": "fr",
  "message": "Bonjour le monde John Doe!"
}
```

### Image aléatoire

![Image aléatoire](https://www.plantuml.com/plantuml/dpng/RP31IiGm48RlynJ3ddOFwzxt85NQIa5GYhqLP6nZ6sWc8Pc-lsaLDUqUP-R_-7uc2q9UPZC1TM8zDa5v01TtkjEEMF1GUikYk6_vw8bxQyxQqA3kHZ7JwO0Ki2pUw_MIWW-lLSkNX76ZMubu-a6gPPzoEGbzK51Hs5d-rCE2VPloHu2b8fxl_wnNV76ASLSEVXCnlbLUyQbummivlMi8c-XDUb3oRsxgv-DfpwKjQoMpPrmz60d8ubVZwxy0)

**Point de terminaison:** `/api/random-image`

**Méthode:** `GET`

**Réponse:**

Une URL d'image aléatoire.


## Déploiement sur Azure VM

![image](https://github.com/user-attachments/assets/521aef53-e157-4309-a3ce-3292ad022779)

![image](https://github.com/user-attachments/assets/7e67e536-4f69-4f9d-9fa0-3424cffdc6d9)

Après d'avoir créer ta machine virtuel connect par ssh change le user et le ip
```
ssh azureuser@10.20.10.12
```
Enter password

```bash
git clone https://github.com/antoinebou12/TCH099

sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

cd TCH099
sudo docker-compose up -d
```

## Déploiement sur Azure avec le portail

### Diagramme de déploiement

![Diagramme de déploiement](https://www.plantuml.com/plantuml/dpng/XP5FImCn44Vlyob-vk9fmMjxa2vhiOTQjksg1_6GPaSCngJcZwAotzsD4A5GwTp2UxnCo2n4wMDwDNJMyvEsZCsywUhLzN8EPMG8H595vt4Rs1Cfur8FKNybpsZoGU2RC8vrFKFSwJ4c3LOSFvn_AV2Ft_CEM_Rlx0igyz0kMcHSx_T6Ancriu_560uhLpBAdGpyN-hcSxjUebXJHFLyCPbKuTS-Z0uq49sZSTQoodS6oYz5LLqUNmbJY4NNjTZmM-8GWw3ZNYwSs2It2iCwiTSyvcPi-_53VW00)

- Source 1: [https://learn.microsoft.com/fr-fr/azure/app-service/quickstart-php?tabs=cli&pivots=platform-linux](https://learn.microsoft.com/fr-fr/azure/app-service/quickstart-php?tabs=cli&pivots=platform-linux)
- Source 2: [https://learn.microsoft.com/fr-fr/azure/app-service/configure-language-php?pivots=platform-linux](https://learn.microsoft.com/fr-fr/azure/app-service/configure-language-php?pivots=platform-linux)
- Source 3: [https://learn.microsoft.com/en-us/azure/app-service/tutorial-php-mysql-app#2---set-up-database-connectivity](https://learn.microsoft.com/en-us/azure/app-service/tutorial-php-mysql-app#2---set-up-database-connectivity)

### 1. Créer un service d'application web et une base de données

![Créer un service d'application web et une base de données](https://github.com/user-attachments/assets/b2eea129-7197-4f87-aab4-40978f5cd3ad)

### 2. Choisir MySQL et PHP

![Choisir MySQL et PHP](https://github.com/user-attachments/assets/cacfc5b4-a09d-4ca2-a8b4-e83ab1e005ae)

### 3. Centre de déploiement pour créer la CI/CD

![Centre de déploiement](https://github.com/user-attachments/assets/2ac1d270-4c44-4d87-b1b1-95ff3e778379)

### 4. Ajouter une commande de démarrage
```bash
# mettre cette ligne dans la commande de démarrage
cp /home/site/wwwroot/nginx.conf /etc/nginx/sites-available/default && service nginx reload
```

![Commande de démarrage](https://github.com/user-attachments/assets/3108acb5-5dc6-48fe-98bd-fab10d182deb)

### 5. Vérifier les variables d'environnement

![Variables d'environnement](https://github.com/user-attachments/assets/d2fe5651-4a29-490c-a1e3-c71401e411f5)

### 6. SSH dans le conteneur

![SSH](https://github.com/user-attachments/assets/eb93150a-519c-4cc9-973d-f6bff36b8abe)

### 7. Créer un fichier .ENV avec les bonnes variables en fonction de l'environnement Azure

```
DB_HOST=tch099-db
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=mydatabase
MYSQL_USER=user
MYSQL_PASSWORD=password
```

![ENV](https://github.com/user-attachments/assets/e92362e5-2ad2-41a6-8b3b-c4586033251c)

### 8. Assure toi d'avoir un private link

Naviguer sur la page de la base de données MySQL dans votre groupe de ressources pour accéder à votre base de données.

![image](https://github.com/user-attachments/assets/0a1d1e07-ea3d-4837-9caa-f04fc680f222)

![image](https://github.com/user-attachments/assets/d765bdac-7c4a-4cb9-911e-7ba9a907b72c)

Naviguer sur la page de la base de données MySQL dans votre groupe de ressources pour accéder à votre base de données.

![image](https://github.com/user-attachments/assets/bc94ca69-1a27-40e6-bd7f-95d45f8a9fea)

Ouvrir le firewall pour votre base de données

![image](https://github.com/user-attachments/assets/36eb7526-6de5-4858-abeb-fa7f5db24c5f)

Utiliser DB beaver pour accéder à votre base de données

![image](https://github.com/user-attachments/assets/11e12afc-4dc6-47ac-b025-fd353c2c4352)

Utiliser SSL pour ce connecter sur la base de données

![image](https://github.com/user-attachments/assets/925525ad-1889-4e29-935c-21d5bb30eb56)

![image](https://github.com/user-attachments/assets/404c5762-c1f6-4e7b-a17b-e1c2aef815f7)


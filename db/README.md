# Introduction à SQL

## Qu'est-ce que SQL?

SQL (Structured Query Language) est un langage utilisé pour gérer les bases de données. Il permet de créer, lire, mettre à jour et supprimer des données.

## Principales commandes SQL

### 1. **CREATE TABLE**
Crée une nouvelle table dans la base de données.

```sql
CREATE TABLE Clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'client') NOT NULL DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    order_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);
```

### 2. **INSERT INTO**
Ajoute de nouvelles données dans une table.

```sql
INSERT INTO Clients (username, email, password, role)
VALUES ('user', 'u@u.com', '1234', 'client');
```

### 3. **SELECT**
Récupère des données de la base de données.

```sql
SELECT * FROM Clients;
```

### 4. **UPDATE**
Met à jour des données existantes dans une table.

```sql
UPDATE Clients
SET password = 'new_password'
WHERE username = 'user';
```

### 5. **DELETE**
Supprime des données d'une table.

```sql
DELETE FROM Clients
WHERE username = 'user';
```

### 6. **JOIN**
Combine des lignes de deux tables ou plus, basées sur une colonne liée entre elles.

Pour illustrer les différents types de jointures SQL et les résultats obtenus, utilisons les deux tables suivantes : `Clients` et `Orders`.

### Table Clients

| id | username | email       | password | role   | created_at          | updated_at          |
|----|----------|-------------|----------|--------|---------------------|---------------------|
| 1  | alice    | alice@a.com | pass123  | client | 2023-01-01 00:00:00 | 2023-01-01 00:00:00 |
| 2  | bob      | bob@b.com   | pass456  | client | 2023-02-01 00:00:00 | 2023-02-01 00:00:00 |
| 3  | carol    | carol@c.com | pass789  | admin  | 2023-03-01 00:00:00 | 2023-03-01 00:00:00 |

### Table Orders

| order_id | client_id | order_date | status  |
|----------|-----------|------------|---------|
| 101      | 1         | 2023-07-01 | shipped |
| 102      | 1         | 2023-07-15 | pending |
| 103      | 3         | 2023-08-01 | shipped |

### Exemple de résultats des jointures

#### INNER JOIN
Sélectionne les enregistrements qui ont des valeurs correspondantes dans les deux tables.

```sql
SELECT Clients.username, Orders.order_id
FROM Clients
INNER JOIN Orders ON Clients.id = Orders.client_id;
```

| username | order_id |
|----------|----------|
| alice    | 101      |
| alice    | 102      |
| carol    | 103      |

#### LEFT JOIN (ou LEFT OUTER JOIN)
Renvoie tous les enregistrements de la table de gauche (Clients), et les enregistrements correspondants de la table de droite (Orders). Renvoie NULL pour les enregistrements de la table de droite qui n'ont pas de correspondance.

```sql
SELECT Clients.username, Orders.order_id
FROM Clients
LEFT JOIN Orders ON Clients.id = Orders.client_id;
```

| username | order_id |
|----------|----------|
| alice    | 101      |
| alice    | 102      |
| bob      | NULL     |
| carol    | 103      |

#### RIGHT JOIN (ou RIGHT OUTER JOIN)
Renvoie tous les enregistrements de la table de droite (Orders), et les enregistrements correspondants de la table de gauche (Clients). Renvoie NULL pour les enregistrements de la table de gauche qui n'ont pas de correspondance.

```sql
SELECT Clients.username, Orders.order_id
FROM Clients
RIGHT JOIN Orders ON Clients.id = Orders.client_id;
```

| username | order_id |
|----------|----------|
| alice    | 101      |
| alice    | 102      |
| carol    | 103      |

#### FULL JOIN (ou FULL OUTER JOIN)
Renvoie tous les enregistrements lorsque qu'il y a une correspondance dans une des tables. Renvoie NULL lorsqu'il n'y a pas de correspondance.

```sql
SELECT Clients.username, Orders.order_id
FROM Clients
FULL JOIN Orders ON Clients.id = Orders.client_id;
```

| username | order_id |
|----------|----------|
| alice    | 101      |
| alice    | 102      |
| bob      | NULL     |
| carol    | 103      |

Ces exemples montrent comment les différentes jointures SQL affectent les résultats en fonction des correspondances entre les tables.

## Types de données importants

### 1. **INT**
Un nombre entier. Utilisé pour les identifiants, les âges, etc.

### 2. **VARCHAR**
Une chaîne de caractères de longueur variable. Utilisé pour les noms, adresses e-mail, etc.

### 3. **TEXT**
Une longue chaîne de caractères. Utilisé pour des descriptions ou commentaires.

### 4. **DATE**
Stocke une date (année, mois, jour).

### 5. **TIMESTAMP**
Stocke une date et une heure.

### 6. **ENUM**
Une liste de valeurs possibles. Utilisé pour des options comme 'admin' ou 'client'.

### 7. **BOOLEAN**
Vrai ou faux (1 ou 0).

### 8. **BIGINT**
Un nombre entier plus grand. Utilisé pour des valeurs très grandes qui dépassent la capacité des INT.

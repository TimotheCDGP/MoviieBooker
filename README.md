# 🎬 API MoviieBooker

Une API RESTful développée avec [NestJS](https://nestjs.com/) pour gérer l'inscription, la connexion des utilisateurs, la consultation de films, et la réservation de séances. L'authentification se fait via JWT.

---

## 🚀 Fonctionnalités

- **Authentification JWT** : Inscription et connexion des utilisateurs avec génération de token sécurisé.
- **Catalogue de Films** : Récupération de la liste des films disponibles.
- **Réservations** : Création, récupération et suppression de réservations personnelles.
- **Documentation Swagger** : Documentation interactive via Swagger.

---

## 🛠️ Frontend (je n'ai pas eu le temps de faire)

 **Afficher une liste de films du moment dans le menu d'accueil**

 ➤ GET /movies dans paramètres renvoie la liste des films du moment.

  **Boutons pour ajouter / supprimer des films**

 ➤ Si on est connecté on peut s'ajouter des films, à condition de respecter un espacement de 2h entre chaque film.

---

## 📦 Routes de l'API

### 🔐 Authentification

- `POST /auth/register`  
  ➤ Inscription d'un nouvel utilisateur

- `POST /auth/login`  
  ➤ Connexion d'un utilisateur, retourne un token JWT

### 🎞️ Films

- `GET /movies`  
  ➤ Récupérer la liste des films disponibles

### 🪑 Réservation

- `POST /reservation/{id}`  
  ➤ Créer une réservation pour un film (ID du film requis) — nécessite un token JWT

- `GET /reservation`  
  ➤ Récupérer les réservations de l'utilisateur connecté

- `DELETE /reservation`  
  ➤ Supprimer une réservation de l'utilisateur connecté


## 🛠️ Initier la base de données POSTRESLQ
```
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "reservations" JSONB DEFAULT '[]'
);
```
---
## 🛠️ Lancement en local

```bash
git clone https://github.com/TimotheCDGP/MoviieBooker
cd backend
npm install
npm run start:dev
```

Accéder à la documentation Swagger :  
👉 [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧾 Notes

- Certaines routes de réservation nécessitent un token JWT.
- Utilisez Swagger pour tester facilement les endpoints.

---

## 📫 Auteur
PEYREGNE Timothé
Développé avec ❤️ en NestJS

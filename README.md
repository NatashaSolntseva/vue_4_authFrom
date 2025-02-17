# 🔥 Vue 3 Pokémon Explorer

**A modern Pokémon exploration app** that allows users to browse Pokémon, view detailed information, and authenticate via Firebase. Built with Vue 3, TypeScript, and TailwindCSS, this project provides an engaging and seamless user experience.

---

## 🚀 Technologies Used

- **Vue 3**: JavaScript framework for building the user interface.
- **Vite**: Lightning-fast build tool for modern web projects.
- **TypeScript**: Static typing for JavaScript to improve code quality.
- **TailwindCSS**: Utility-first CSS framework for flexible styling.
- **Axios** – Fetching Pokémon data from PokeAPI.
- **PokeAPI** – Retrieves live Pokémon data. [API](https://pokeapi.co/)
- **Firebase Authentication** – Secure user authentication.
- **Vue Router** – Client-side navigation.
- **ESLint + Prettier**: Linting and code formatting.

---

## 🛠️ Features

- **Browse Pokémon** – Displays a list of Pokémon with images and names.
- **Pokémon Details** – View stats, types, and official artwork.
- **User Authentication** – Sign up, log in, and log out with Firebase.
- **Protected Routes** – Users must be logged in to access Pokémon details.
- **Responsive Design** – Works on all screen sizes.
- **Optimized Performance** – Built with Vite for fast development and production builds.
- **Error Handling** – Gracefully handles API errors.

---

## 🔧 Project Setup

Follow these steps to set up and run the project locally:

### 1. Clone the repository:

```bash
git clone git@github.com:NatashaSolntseva/vue_4_authFrom.git
cd vue_4_authFrom
```

### 2. Install dependencies:

```bash

npm install

```

### 3. Add API Keys:

Create a .env file in the root directory and add your API keys:

```bash
# Firebase API Config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the development server:

```bash
npm run dev

```

### 5. Build for production:

```bash
npm run build
```

### 6. Preview the production build:

```bash
npm run preview
```

## 🌐 Live Demo

Visit the live version of this form: [Pokémon Explorer](https://pokemonizer.netlify.app/)

---

## 👩‍💻 Author

Natasha Solntseva

[LinkedIn](https://www.linkedin.com/in/natalia-shmatenko-2766b830)

---

## 📜 License

This project is licensed under the MIT License.

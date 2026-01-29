# Dashboard App (AdminHub)

A modern **Admin Dashboard Web Application** built using **React, Vite, Tailwind CSS, and React Router**. This project demonstrates real-world frontend architecture, authentication flow, role-based navigation, and clean UI/UX practices.

---

##  Features

*  Login Authentication (Admin & User roles)
*  Dashboard with analytics & reports pages
*  Sidebar with nested navigation
*  Dark / Light mode toggle
*  Notification dropdown
*  Fully responsive (mobile + desktop)
*  Fast development with Vite

---

##  Tech Stack

* **Frontend:** React.js
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Icons:** Lucide React
* **State Management:** React Hooks & Context API

---

##  Project Structure

```
dashboard-app/
├── public/
├── src/
│   ├── components/      # Navbar, Sidebar, UI components
│   ├── pages/           # Login, Dashboard, Analytics, etc.
│   ├── hooks/           # Custom hooks (useAuth)
│   ├── context/         # Auth context
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

##  Demo Credentials

Use these credentials to log in:

* **Admin:** `admin@test.com` / any password
* **User:** `user@test.com` / any password
* Live Demo : https://react-admin-dashboard-five-gamma.vercel.app

---

##  Installation & Setup

Follow these steps to run the project locally:

```bash
# 1. Clone the repository
git clone <your-repo-url>

# 2. Go to project folder
cd dashboard-app

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

##  Important Notes

* `node_modules/` is **not committed** (handled by `.gitignore`)
* This project uses **mock authentication** (no backend yet)
* Can be extended easily with real APIs (Node / Firebase / Supabase)

---

##  Future Improvements

* Backend integration (Node.js / Firebase)
* Role-based protected routes
* Real database (MongoDB / PostgreSQL)
* Charts using Recharts or Chart.js
* Unit testing

---

##  Author

**Your oggu pavan**
Frontend Developer | react.js

---

##  If you like this project

Give it a ⭐ on GitHub — it really helps!

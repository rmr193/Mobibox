# 🎬 Movie Explorer

A responsive **Movie Explorer Application** built with **React** and **Vite**, fetching live data from the **TVMaze API**.

---

## 📌 Project Overview

This application was developed as part of the **Movie Explorer Assignment**. Users can browse popular TV shows and movies, search for specific titles in real-time, and view comprehensive information (ratings, summaries, release dates, and platforms) inside an interactive details modal.

- **GitHub Repository:** [https://github.com/rmr193/Mobibox](https://github.com/rmr193/Mobibox)
- **Data Source:** [TVMaze API](https://www.tvmaze.com/api)

---

## 🛠️ Technology Stack

* **Frontend Library:** React (Functional Components & Hooks: `useState`, `useEffect`)
* **Build Tool:** Vite
* **Routing:** React Router DOM
* **Styling:** Vanilla CSS (CSS Grid, Flexbox, Responsive Design, Dark Theme)
* **Icons:** Lucide React
* **Data API:** TVMaze REST API
  * All Shows: `GET https://api.tvmaze.com/shows`
  * Search Shows: `GET https://api.tvmaze.com/search/shows?q=:query`

---

## 📋 Features Implemented

### 1. 🏠 Home Page
* **Navbar:**
  * Brand logo and title (`🎬 MovieExplorer`).
  * Navigation links (`Home`, `Movies`).
  * Prominent Call-to-Action button navigating to the **Movie Listing Page**.
  * Mobile-responsive toggle menu for smaller screens.
* **Hero Banner:**
  * Movie-themed backdrop with clean dark overlay.
  * Title: `DISCOVER MOVIES`.
  * Short, engaging description: *"Explore and discover your favorite movies from around the world."*
  * Prominent **Explore Now** button navigating directly to the **Movie Listing Page**.
* **Featured Movies Section:**
  * Displays a curated row of popular trending titles on the landing page with "See Details" buttons.
* **Footer:**
  * Application name, quick navigation links, TVMaze API attribution, and copyright notice (`© 2026 MovieExplorer`).

---

### 2. 🎞️ Movie Listing Page (`/movies`)
* **Search Functionality:**
  * Prominent search bar at the top of the page (`🔍 Search for a movie...`).
  * Searches live data by show/movie title using `https://api.tvmaze.com/search/shows?q=:query`.
  * Dynamic debounced updates as the user types, with a clear (`✕`) button.
  * Defaults to all shows (`https://api.tvmaze.com/shows`) when search is empty.
* **Movie Cards:**
  * High-quality poster image with fallback placeholder when unavailable.
  * Title/name.
  * Release year (`📅 2024`).
  * Rating (`⭐ 8.5` or `⭐ N/A`).
  * Prominent **"See Details"** button.
  * CSS Grid responsive layout (1 column on mobile, 3–4+ columns on larger screens).

---

### 3. 🔍 Movie Details Modal
* Triggered when clicking the **See Details** button on any movie card.
* **Modal Contents:**
  * High-resolution movie backdrop/poster.
  * Movie title.
  * Star rating and release date badges.
  * Runtime and status.
  * Genres tags.
  * Clean overview/summary text.
  * Network/Platform and official website link.
* **Interactions:**
  * Closable via the top-right `✕` button.
  * Closable by clicking outside the modal on the background overlay.
  * Closable via the bottom `Close` button.
  * Closable by pressing the keyboard `Escape` key.
  * Disables background page scrolling when the modal is open.

---

## 📁 Project Structure

```text
Mobibox/
├── index.html               # Main HTML entry file
├── package.json             # Project dependencies & scripts
├── vite.config.js           # Vite configuration
├── README.md                # Project documentation
├── public/                  # Static assets
└── src/
    ├── main.jsx             # React entry point with BrowserRouter
    ├── App.jsx              # Main layout, routes, and modal handler
    ├── index.css            # Responsive CSS stylesheet
    ├── api/
    │   └── tvmaze.js        # API helper functions (getAllShows, searchShows)
    ├── components/
    │   ├── Navbar.jsx       # Header navigation bar
    │   ├── HeroBanner.jsx   # Home hero section with CTA button
    │   ├── SearchBar.jsx    # Search input with clear button
    │   ├── MovieCard.jsx    # Individual movie card component
    │   ├── MovieModal.jsx   # Interactive details modal overlay
    │   └── Footer.jsx       # Footer with credits and copyright
    └── pages/
        ├── HomePage.jsx     # Landing page (Hero + Featured)
        └── MoviesPage.jsx   # Dedicated movie listing & search page
```

---

## 🚀 Getting Started & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/rmr193/Mobibox.git
cd Mobibox
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🌐 Deployment Instructions

### Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository `Mobibox`.
4. Vite will be automatically detected. Click **Deploy**.

### Netlify
1. Log in to [Netlify](https://netlify.com) and select **"Add new site" > "Import an existing project"**.
2. Connect your GitHub repository.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Click **Deploy site**.

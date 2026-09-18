# 🎬 MovieExplorer

A responsive, feature-rich **Movie & TV Show Explorer** web application built with **React**, **Vite**, and styled with modern **CSS Design Tokens & Glassmorphism**, powered by the live **TVMaze API**.

![MovieExplorer Banner](https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Live Demo & Repository

- **Live Deployment:** [Deploy on Vercel / Netlify](https://vercel.com)
- **GitHub Repository:** [https://github.com/your-username/movie-explorer](https://github.com)

---

## 📋 Features Overview

### 1. 🏠 Home Page
- **Navigation Bar:**
  - Application brand logo with custom film reel icon (`🎬 MovieExplorer`).
  - Navigation links to **Home**, **Movies**, and **Watchlist** (with a live count badge).
  - Prominent Call-to-Action button navigating to the **Movie Listing Page**.
  - Fully responsive mobile drawer navigation with hamburger toggle.
- **Hero Banner:**
  - Immersive cinematic dark gradient backdrop and film aesthetics.
  - Headline: *"DISCOVER MOVIES & TV SHOWS"*.
  - Engaging description inviting users to explore titles worldwide.
  - Interactive quick search bar directing straight into search queries.
  - Prominent **Explore Now** CTA button.
  - Highlight statistics counter (*10,000+ Titles*, *⭐ 8.8+ Verified Ratings*, *100% Free & Live API*).
- **Featured / Trending Row:**
  - Showcases top-rated critically acclaimed shows loaded dynamically from TVMaze.
  - Direct "View All Movies" link to the catalog.
- **Why MovieExplorer Highlights:**
  - Responsive cards explaining catalog richness, instant filtering, and detailed metadata modals.
- **Footer:**
  - Branding, description, quick navigation links, TVMaze API attribution, copyright notices (`© 2026 MovieExplorer`), and social links.

---

### 2. 🎞️ Movie Listing Page
- **Search Functionality:**
  - Prominent search bar at the top of the page.
  - Search by movie or TV show title via TVMaze endpoint: `GET https://api.tvmaze.com/search/shows?q=:query`.
  - Debounced input (350ms) to provide fluid real-time search without API rate limiting.
  - Instant clear (`✕`) button and search submit button.
  - URL query synchronization (`?search=query`) allowing bookmarkable and shareable search links.
- **Filter & Sort Controls:**
  - Horizontal genre filter pills: *All, Drama, Comedy, Action, Sci-Fi, Thriller, Romance, Crime, Adventure, Horror, Mystery, Fantasy, Animation*.
  - Sort dropdown:
    - *Featured / Default*
    - *Rating: High to Low*
    - *Rating: Low to High*
    - *Premiered: Newest First*
    - *Premiered: Oldest First*
    - *Title: A to Z*
  - Live results count display (*e.g., "Showing 48 titles"*).
- **Responsive Movie Cards:**
  - High-resolution poster image with graceful fallback for missing images.
  - Card title with multi-line clamping and full-text tooltip.
  - Release year badge (`📅 2024`).
  - Rating badge (`⭐ 8.5`).
  - Genre tags.
  - Quick Watchlist toggle button.
  - Prominent **"See Details"** button opening the interactive modal.
  - Hover elevation, zoom animations, and glowing accent borders.
- **Loading & State Handling:**
  - Shimmering skeleton loader cards while data is fetching.
  - Informative empty states when no search results match, complete with a "Reset Filters" button.
  - Error state with friendly messages and a "Try Again" retry action.

---

### 3. 🔍 Movie Details Modal
- Triggered by clicking any **"See Details"** button or movie card.
- **Modal Contents:**
  - Cinematic hero header with high-resolution original backdrop image (`image.original`).
  - Movie title and quick metadata chips (Star Rating `/ 10`, Premiered date, Runtime in minutes, Status badge: *Running / Ended*).
  - Genres list with accent pills.
  - Formatted Overview / Summary text (with HTML tags safely sanitized).
  - Detailed metadata grid: *Network / Streaming Platform, Original Language, Show Type, Air Schedule & Time*.
  - Action buttons:
    - **Add to Watchlist / In Watchlist** toggle.
    - **Official Site** external link.
    - **Close** button.
- **Interaction Requirements:**
  - Closable via the top-right `✕` icon button.
  - Closable via the bottom `✕ Close` button.
  - Closable by clicking outside the modal on the backdrop overlay.
  - Closable via the keyboard `Escape` key.
  - Locks background page scrolling while modal is open.

---

### 4. 📌 Watchlist / Favorites Management
- Add or remove any movie directly from the card or details modal.
- Live badge count in the top navigation bar.
- Stored persistently in browser `localStorage`.
- Dedicated Watchlist Page (`/watchlist`) with quick removal and "Clear All" option.

---

## 🛠️ Technology Stack

- **Framework:** React 18+ (Functional Components & Hooks)
- **Tooling & Bundler:** Vite 6+ (Fast HMR & optimized production bundling)
- **Routing:** React Router DOM (`v7`)
- **Styling:** Vanilla CSS with custom design tokens, flexbox, CSS Grid, and glassmorphism
- **Icons:** Lucide React & inline SVGs
- **Data Source:** [TVMaze REST API](https://www.tvmaze.com/api)
  - Shows catalog: `GET https://api.tvmaze.com/shows`
  - Show search: `GET https://api.tvmaze.com/search/shows?q=:query`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/your-username/movie-explorer.git
cd movie-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the local development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📱 Responsive Design Breakpoints

| Device | Breakpoint | Grid Columns |
| :--- | :--- | :--- |
| **Mobile** | `< 480px` | 1 Column (stacked, touch-optimized) |
| **Tablet** | `481px - 1024px` | 2 - 3 Columns |
| **Desktop** | `> 1024px` | 4 - 5 Columns |

---

## 🌐 Deployment Guide

### Deploy to Vercel
1. Push code to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `movie-explorer` repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **Deploy**.

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
2. Connect your GitHub repository.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Click **Deploy site**.

---

## 📄 License & Credits

- Data provided by [TVMaze](https://www.tvmaze.com/api).
- Developed for the Movie Explorer Assignment © 2026 MovieExplorer.

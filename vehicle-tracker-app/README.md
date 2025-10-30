# 🚗 Vehicle Movement on a Map — React + React-Leaflet Project

## 🧭 Overview

This project is a **frontend-only React application** that simulates a vehicle's movement along a predefined route on an interactive map. It is designed to demonstrate how to use **React, Leaflet, and Tailwind CSS** to visualize geospatial data dynamically.

The app:
- Displays an **interactive map**.
- Renders a **complete route path**.
- Simulates a **vehicle marker moving** along that route.
- Provides **Play/Pause/Reset controls**.
- Shows **real-time metadata** such as coordinates, timestamps, and speed.

---

## 🧩 Tech Stack

| Category | Tool / Technology | Purpose |
|-----------|------------------|----------|
| **Frontend Framework** | [React.js](https://react.dev/) | Component-based UI development |
| **Map Library** | [React-Leaflet](https://react-leaflet.js.org/) + [Leaflet](https://leafletjs.com/) | Interactive map and route visualization |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/docs) | Utility-first, responsive design |
| **Data Format** | JSON | Stores dummy route data |
| **Dev Setup** | Node.js + Vite / Create React App | Project scaffolding and build tools |

---

## 🏗️ Setup Instructions

### 1. Create the React Project

Use Vite or Create React App:

```bash
# Using Vite (Recommended)
npm create vite@latest vehicle-tracker-app -- --template react

# OR using CRA
npx create-react-app vehicle-tracker-app

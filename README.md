# Good As You Are

A modern React + Vite + TypeScript website for ACT Therapy, Motivation Coaching, and Lectures on Narcissism.

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Strapi v5** - Headless CMS (separat installation)
- **TanStack React Query** - Data fetching och caching
- **Axios** - HTTP client

## Viktigt

- **Strapi måste köra** när du utvecklar (port 1337)
- **Båda servrarna måste köra samtidigt** (Strapi + React)
- Se `PROJECT_STATUS.md` för detaljerad status och kända problem

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Page components (Home, About kopplade till Strapi)
├── services/       # API-funktioner för Strapi
├── hooks/          # React Query hooks för Strapi-data
├── types/          # TypeScript-typer för Strapi
├── config/         # Strapi-konfiguration
├── lib/            # Axios och React Query setup
├── App.tsx         # Main app component with routing
└── main.tsx        # Entry point
```

## Vanliga problem

### 404-fel från Strapi API
- Kontrollera att endpoint-namnet är korrekt (Strapi v5 pluraliserar annorlunda)
- `home-hero` → `/api/home-heroes` (med "es")
- Testa endpoint direkt i webbläsare: `http://localhost:1337/api/home-heroes?populate=*`

### 403 Forbidden
- Gå till Strapi Admin → Settings → Users & Permissions → Roles → Public
- Bocka i `find` och `findOne` för Content Type

### Cache-problem
- Hård uppdatering: `Ctrl + Shift + R`
- Rensa Vite cache: Ta bort `node_modules/.vite` mappen
- Starta om dev-servern

### Bilder visas inte
- Kontrollera att bilden är kopplad i Strapi
- Kontrollera att innehållet är publicerat (inte Draft)
- Använd `populate=*` i API-anropet

Se `PROJECT_STATUS.md` för mer detaljerad felsökningsguide.

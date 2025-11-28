# Good As You Are - Projektstatus

## Översikt
Detta är en React + Vite + TypeScript webbapplikation som är kopplad till Strapi CMS för innehållshantering. Projektet är byggt om från WordPress till en modern React-applikation.

## Teknisk Stack
- **Frontend:** React 18 + Vite + TypeScript
- **Routing:** React Router DOM
- **Data Fetching:** TanStack React Query (med caching)
- **HTTP Client:** Axios
- **CMS:** Strapi (lokal installation)
- **Styling:** CSS (custom)

## Projektstruktur

```
goodasyouare/                    # React-applikation
├── src/
│   ├── components/              # Reusable komponenter
│   │   ├── Layout.tsx          # Huvudlayout med navigation
│   │   └── Layout.css
│   ├── pages/                   # Sidor
│   │   ├── Home.tsx            # ✅ Kopplad till Strapi
│   │   ├── About.tsx           # ⏳ Väntar på Strapi-koppling
│   │   ├── ACT.tsx              # ⏳ Väntar på Strapi-koppling
│   │   ├── Toxism.tsx          # ⏳ Väntar på Strapi-koppling
│   │   ├── Services.tsx        # ⏳ Väntar på Strapi-koppling
│   │   └── Contact.tsx          # ⏳ Väntar på Strapi-koppling
│   ├── hooks/
│   │   └── useStrapi.ts        # ✅ Custom hooks för Strapi-data
│   ├── services/
│   │   └── strapi.ts           # ✅ API-funktioner för Strapi
│   ├── types/
│   │   └── strapi.ts            # ✅ TypeScript-typer för Strapi
│   ├── config/
│   │   └── strapi.ts            # ✅ Strapi-konfiguration
│   ├── lib/
│   │   ├── axios.ts             # ✅ Axios-instans för Strapi
│   │   └── queryClient.ts       # ✅ React Query konfiguration
│   └── App.tsx                  # ✅ Routing setup
└── assets/                      # Bilder och media

[STRAPI-MAPP]/                   # Strapi CMS (separat mapp, flyttad från root)
└── (Strapi-installation)
```

## Status: Vad som är klart ✅

### 1. React-applikation
- ✅ Projektstruktur skapad
- ✅ Routing konfigurerad (Home, About, ACT, Toxism, Services, Contact)
- ✅ Layout med navigation och footer
- ✅ Responsiv design
- ✅ TypeScript konfigurerat

### 2. Strapi-integration
- ✅ React Query installerat och konfigurerat
- ✅ Axios installerat och konfigurerat
- ✅ Strapi-konfiguration (`src/config/strapi.ts`)
- ✅ API service-funktioner (`src/services/strapi.ts`)
- ✅ Custom hooks med caching (`src/hooks/useStrapi.ts`)
- ✅ TypeScript-typer för Strapi-data (`src/types/strapi.ts`)

### 3. Home-sidan
- ✅ Kopplad till Strapi för hero-innehåll
- ✅ Kopplad till Strapi för testimonial
- ✅ Loading states implementerade
- ✅ Error handling implementerad
- ✅ Fallback till hårdkodad text om Strapi inte svarar
- ✅ Bildhantering (Strapi eller fallback)

### 4. Strapi CMS Setup
- ✅ Strapi installerat i separat mapp (flyttad från root)
- ✅ Content Types skapade:
  - `home-hero` (title, subtitle, image)
  - `home-testimonial` (text)
  - `about` (title, section1Title, section1Content, section2Title, section2Content, backgroundImage, profileImage)
- ✅ Public permissions konfigurerade (find, findOne)
- ✅ Innehåll tillagt och publicerat

## Status: Vad som återstår ⏳

### 1. Strapi API-problem (LÖST ✅)
- ✅ **Löst:** API:et använder nu rätt endpoints för Strapi v5
- **Lösning:**
  - Endpoint för `home-hero` är `/api/home-heroes` (plural med "es")
  - Koden uppdaterad för att hantera Strapi v5-struktur (data direkt på objektet, inte i `attributes`)
  - Bildhantering uppdaterad för att stödja både v4 och v5

### 2. Övriga sidor
- ✅ About-sidan - kopplad till Strapi (med två sektioner: section1Title/section1Content och section2Title/section2Content)
- ⏳ ACT-sidan - koppla till Strapi
- ⏳ Toxism-sidan - koppla till Strapi
- ⏳ Services-sidan - koppla till Strapi
- ⏳ Contact-sidan - koppla till Strapi (eller behåll statisk)

### 3. Ytterligare Content Types i Strapi
- ⏳ Skapa Content Types för övriga sidor
- ⏳ Konfigurera permissions
- ⏳ Lägg till innehåll

### 4. Caching-verifiering
- ⏳ Testa att caching fungerar korrekt (steg 7 i original-planen)
- ⏳ Verifiera att data uppdateras i bakgrunden

### 5. Environment variables
- ⚠️ `.env`-filen behöver skapas manuellt:
  ```
  VITE_STRAPI_API_URL=http://localhost:1337/api
  ```

## Hur man startar projektet

### 1. Starta Strapi
```bash
cd [SÖKVÄG TILL STRAPI-MAPP]
npm run develop
```
- Öppnar automatiskt `http://localhost:1337/admin`
- Strapi måste köra när du utvecklar
- **OBS:** Strapi har flyttats till en egen mapp - uppdatera sökvägen ovan

### 2. Starta React-appen
```bash
cd C:\Users\albin\Documents\GoodAsYouAre\GoodAsYouAre
npm run dev
```
- Öppnar vanligtvis `http://localhost:5173`

### 3. Skapa `.env`-fil (om den inte finns)
I projektets root-mapp (`GoodAsYouAre`), skapa `.env`:
```
VITE_STRAPI_API_URL=http://localhost:1337/api
```

## Kända problem och lösningar

### 1. Strapi v5 API-endpoints (LÖST ✅)
- **Problem:** Strapi v5 pluraliserar Content Types annorlunda
- **Lösning:** 
  - `home-hero` → `/api/home-heroes` (med "es", inte "s")
  - `about` → `/api/abouts` (med "s")
  - `home-testimonial` → `/api/home-testimonials` (med "s")
- **OBS:** Om du ser 404-fel, kontrollera att endpoint-namnet matchar Strapis pluralisering

### 2. Strapi v5 datastruktur (LÖST ✅)
- **Problem:** Strapi v5 returnerar data direkt på objektet, inte i `attributes`
- **Lösning:** Koden hanterar nu både v4 och v5-strukturer automatiskt
- **Bilder:** I Strapi v5 ligger bild-URL direkt på `image.url`, inte i `image.data.attributes.url`

### 3. Cache-problem (LÖST ✅)
- **Problem:** Webbläsaren kan cachad gammal JavaScript-kod med fel endpoints
- **Lösning:**
  - Hård uppdatering: `Ctrl + Shift + R` eller `Ctrl + F5`
  - Rensa Vite cache: `Remove-Item -Path "node_modules\.vite" -Recurse -Force`
  - Starta om Vite dev-servern efter cache-rensning

### 4. Permissions i Strapi (VIKTIGT ⚠️)
- **Problem:** 403 Forbidden-fel när API anropas
- **Lösning:** 
  - Gå till Settings → Users & Permissions Plugin → Roles → Public
  - Bocka i `find` och `findOne` för varje Content Type
  - **OBS:** Måste göras för varje ny Content Type!

### 5. Hårdkodad text (LÖST ✅)
- **Problem:** All hårdkodad text togs bort från alla sidor
- **Status:** Alla sidor hämtar nu innehåll från Strapi eller visar ingenting
- **OBS:** CTA-sektionen (Call-to-Action) togs bort från Home-sidan - finns inte i Strapi ännu

## Nästa steg (prioriterade)

1. **Koppla övriga sidor till Strapi** 🔴
   - ACT-sidan
   - Toxism-sidan
   - Services-sidan
   - Contact-sidan (eller behåll statisk)

2. **Skapa Content Types i Strapi för övriga sidor**
   - ACT Content Type
   - Toxism Content Type
   - Services Content Type
   - Contact Content Type (om behövs)

3. **Verifiera att allt fungerar korrekt**
   - Testa att data hämtas från alla sidor
   - Kontrollera att bilder laddas korrekt
   - Verifiera caching fungerar

4. **Felsökning vid behov**
   - Om 404-fel: Kontrollera endpoint-namn (pluralisering)
   - Om 403-fel: Kontrollera permissions i Strapi
   - Om cache-problem: Rensa Vite cache och hård uppdatera webbläsare

## Viktiga filer att känna till

- `src/services/strapi.ts` - API-anrop till Strapi
- `src/hooks/useStrapi.ts` - React Query hooks med caching
- `src/config/strapi.ts` - Strapi-konfiguration
- `src/pages/Home.tsx` - Exempel på hur Strapi-data används
- `STRAPI_SETUP.md` - Guide för Strapi-setup

## Caching-konfiguration

React Query är konfigurerat med:
- **staleTime:** 5 minuter (data anses färsk i 5 min)
- **gcTime:** 30 minuter (data caches i 30 min)
- **Hero/Testimonial:** 10 min stale, 1 timme cache
- **Sidor:** 5 min stale, 30 min cache

## Noteringar

- Strapi och React-appen är separata projekt i olika mappar
- Båda måste köra samtidigt för att integrationen ska fungera
- Strapi körs på port 1337
- React-appen körs på port 5173 (Vite default)
- Alla Content Types måste vara publicerade i Strapi för att synas via API

## Kontakt/Referens

- Strapi-dokumentation: https://docs.strapi.io
- React Query-dokumentation: https://tanstack.com/query/latest
- Projekt skapat: 2024

---

**Senast uppdaterad:** 2025-11-28 (efter flytt till ny mapp)
**Nästa session:** Koppla övriga sidor (ACT, Toxism, Services, Contact) till Strapi

## Session-sammanfattning 2025-11-28

### Vad vi gjorde:
1. ✅ Uppdaterade projektstruktur efter flytt till ny mapp
2. ✅ Fixade Strapi v5 API-endpoints (home-heroes med "es")
3. ✅ Uppdaterade bildhantering för Strapi v5-struktur
4. ✅ Kopplade About-sidan till Strapi med två sektioner
5. ✅ Tog bort all hårdkodad text från alla sidor
6. ✅ Fixade cache-problem (Vite och webbläsare)
7. ✅ Lade till debug-loggar för felsökning

### Problem vi stötte på:
1. **404-fel:** Fel endpoint-namn (`home-heros` vs `home-heroes`)
   - **Lösning:** Uppdaterade till korrekt pluralisering för Strapi v5
2. **403-fel:** Saknade permissions i Strapi
   - **Lösning:** Konfigurerade Public-rollen med find/findOne
3. **Cache-problem:** Gammal JavaScript-kod kördes
   - **Lösning:** Rensade Vite cache och hård uppdaterade webbläsare
4. **Bildhantering:** Strapi v5 har annan bildstruktur
   - **Lösning:** Uppdaterade `getStrapiImageUrl` för att hantera v5-struktur
5. **Escaped newlines:** `\n` visades som text istället för radbrytningar
   - **Lösning:** Lade till `.replace(/\\n/g, '\n')` för att konvertera escaped newlines

### Viktiga noteringar:
- Strapi körs på port 1337
- React-appen körs på port 5173
- Båda måste köra samtidigt
- Alla Content Types måste vara publicerade (inte Draft)
- Permissions måste konfigureras för varje Content Type
- Om något inte fungerar: Kontrollera console för fel, testa API-endpoints direkt i webbläsare

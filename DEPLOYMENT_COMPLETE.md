# Komplett Deployment Guide - Render

Denna guide visar steg-för-steg hur du deployar både Strapi och React-appen på Render.

---

## Översikt

Du kommer att deploya:
1. **Strapi** (`goodasyouare-cms`) - Som Web Service
2. **React-appen** (`goodasyouare`) - Som Static Site

---

## Steg 1: Förbered GitHub Repos

### Alternativ A: Ett repo för båda
Om du har både Strapi och React i samma repo:
- Strapi ligger i: `goodasyouare-cms/` (mapp utanför GoodAsYouAre)
- React ligger i: `GoodAsYouAre/`

### Alternativ B: Separata repos (rekommenderat)
1. Skapa ett nytt GitHub-repo för Strapi
2. Pusha Strapi-koden dit
3. Behåll React-appen i nuvarande repo

---

## Steg 2: Deploya Strapi

### 2.1 Skapa Web Service på Render

1. Gå till [render.com](https://render.com) och logga in
2. Klicka **"New +"** → **"Web Service"**
3. Koppla ditt GitHub-repo (Strapi-repot)

### 2.2 Konfigurera Web Service

**Basic Settings:**
- **Name:** `goodasyouare-cms`
- **Environment:** `Node`
- **Region:** Frankfurt (närmaste för Sverige)
- **Branch:** `main`
- **Root Directory:** 
  - Om Strapi ligger i root: Lämna tomt
  - Om Strapi ligger i undermapp: Ange mappnamnet (t.ex. `goodasyouare-cms`)

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

### 2.3 Lägg till Environment Variables

I Render Dashboard → **Environment**, lägg till:

**Grundläggande:**
```
NODE_ENV=production
HOST=0.0.0.0
PORT=10000
```

**Secrets (generera lokalt):**
Kör detta kommando 5 gånger:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Lägg till resultaten:
```
APP_KEYS=<string1>,<string2>,<string3>,<string4>
API_TOKEN_SALT=<generera-random-string>
ADMIN_JWT_SECRET=<generera-random-string>
JWT_SECRET=<generera-random-string>
TRANSFER_TOKEN_SALT=<generera-random-string>
```

**CORS (uppdatera efter att React-appen är deployad):**
```
CORS_ORIGIN=https://din-react-app-url.onrender.com,https://www.goodasyouare.com
```

### 2.4 PostgreSQL (Rekommenderat)

1. I Render Dashboard, klicka **"New +"** → **"PostgreSQL"**
2. Välj **Free** plan
3. Namn: `goodasyouare-db`
4. När databasen är klar, kopiera **Internal Database URL**
5. Lägg till i Strapi Web Service Environment Variables:

```
DATABASE_CLIENT=postgres
DATABASE_URL=<klistra-in-database-url-här>
```

### 2.5 Deploya

1. Klicka **"Create Web Service"**
2. Vänta på att builden är klar (kan ta 5-10 minuter)
3. Kopiera URL:en (t.ex. `https://goodasyouare-cms.onrender.com`)

### 2.6 Skapa Admin-konto

1. Gå till `https://din-strapi-url.onrender.com/admin`
2. Skapa admin-konto (eller logga in om du redan har ett)
3. **VIKTIGT:** Lägg till allt innehåll och publicera det

---

## Steg 3: Deploya React-appen

### 3.1 Skapa Static Site på Render

1. I Render Dashboard, klicka **"New +"** → **"Static Site"**
2. Koppla ditt GitHub-repo (React-appens repo)

### 3.2 Konfigurera Static Site

**Basic Settings:**
- **Name:** `goodasyouare`
- **Branch:** `main`
- **Root Directory:** Lämna tomt (React-appen ligger i root)

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
dist
```

### 3.3 Lägg till Environment Variables

I Render Dashboard → **Environment**, lägg till:

```
VITE_STRAPI_API_URL=https://din-strapi-url.onrender.com/api
VITE_EMAILJS_SERVICE_ID=ditt_service_id
VITE_EMAILJS_TEMPLATE_ID=ditt_template_id
VITE_EMAILJS_PUBLIC_KEY=ditt_public_key
```

**OBS:****
- Ersätt `din-strapi-url` med den faktiska Strapi URL:en från Steg 2.5
- Kopiera EmailJS-värdena från din lokala `.env`-fil

### 3.4 Deploya

1. Klicka **"Create Static Site"**
2. Vänta på att builden är klar
3. Kopiera URL:en (t.ex. `https://goodasyouare.onrender.com`)

---

## Steg 4: Uppdatera CORS i Strapi

När du har React-appens URL:

1. Gå tillbaka till Strapi Web Service på Render
2. **Environment** → Uppdatera `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://din-react-url.onrender.com,https://www.goodasyouare.com
   ```
3. **Save Changes** → Render kommer att restarta Strapi

---

## Steg 5: Testa

1. **Testa React-appen:** Gå till `https://din-react-url.onrender.com`
2. **Testa Strapi Admin:** Gå till `https://din-strapi-url.onrender.com/admin`
3. **Testa formulär:** Kontrollera att EmailJS fungerar
4. **Testa på mobil:** Kontrollera prestanda

---

## Petra's inloggning

**Strapi Admin URL:** `https://din-strapi-url.onrender.com/admin`

- Samma inloggning som lokalt
- Alla Content Types och innehåll finns där
- Kan redigera allt direkt
- Ändringar syns direkt på webbplatsen

---

## Custom Domain (valfritt)

### För React-appen:
1. I Static Site settings → **Custom Domains**
2. Lägg till `www.goodasyouare.com` (eller din domän)
3. Följ instruktionerna för DNS-konfiguration

### För Strapi:
1. I Web Service settings → **Custom Domains**
2. Lägg till `cms.goodasyouare.com` (eller subdomän)
3. Följ instruktionerna för DNS-konfiguration

**OBS:** Om du lägger till custom domain för Strapi, uppdatera `VITE_STRAPI_API_URL` i React-appen med den nya URL:en.

---

## Viktiga punkter

### Strapi Sleep Mode (Gratis tier)
- Strapi går i "sleep mode" efter 15 min inaktivitet
- Första request kan ta 30-60 sekunder att "wake up"
- **Lösning:** 
  - Uppgradera till betalt plan ($7/månad)
  - Eller använd en "ping service" (t.ex. UptimeRobot) för att hålla den vaken

### Databas
- **SQLite:** Fungerar men inte idealiskt för produktion (data kan försvinna vid omstart)
- **PostgreSQL:** Rekommenderat (Render har gratis PostgreSQL)

### Automatisk Deployment
- Render deployar automatiskt när du pushar till GitHub
- Environment Variables uppdateras vid rebuild

---

## Nästa steg efter deployment

1. ✅ **Testa Strapi Admin:** Logga in och verifiera att allt fungerar
2. ✅ **Testa React-appen:** Kontrollera att den hämtar data från Strapi
3. ✅ **Testa formulär:** Kontrollera att EmailJS fungerar
4. ✅ **Testa på mobil:** Kontrollera prestanda
5. ✅ **Google Search Console:** Verifiera webbplatsen och skicka in sitemap

---

## Felsökning

### Strapi startar inte
- Kontrollera att alla Environment Variables är korrekt satta
- Kontrollera build-loggarna i Render Dashboard

### CORS-fel
- Kontrollera att `CORS_ORIGIN` innehåller React-appens URL
- Kontrollera att URL:en är korrekt (med `https://`)

### Bilder visas inte
- Kontrollera att Strapi har rätt permissions för Media Library
- Kontrollera att bilderna är publicerade i Strapi

### React-appen kan inte hämta data
- Kontrollera att `VITE_STRAPI_API_URL` är korrekt
- Kontrollera att Strapi är uppe och körs
- Kontrollera CORS-inställningar i Strapi


# Render Deployment Guide

Denna guide visar hur du deployar både Strapi och React-appen på Render.

## Översikt

Du kommer att deploya:
1. **Strapi** - Som en Web Service på Render
2. **React-appen** - Som en Static Site på Render

---

## Steg 1: Förbered Strapi för produktion

### 1.1 Uppdatera Strapi config för produktion

I din Strapi-mapp, skapa/uppdatera `config/database.ts` (om den inte finns):

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
    useNullAsDefault: true,
  },
});
```

**OBS:** För produktion bör du använda PostgreSQL istället för SQLite. Render har gratis PostgreSQL-databaser.

### 1.2 Lägg till CORS-konfiguration

I Strapi-mappen, skapa/uppdatera `config/middlewares.ts`:

```javascript
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['https://goodasyouare.onrender.com', 'https://www.goodasyouare.com'], // Uppdatera med din React-app URL
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

---

## Steg 2: Deploya Strapi på Render

### 2.1 Skapa nytt projekt på Render

1. Gå till [render.com](https://render.com) och logga in
2. Klicka på **"New +"** → **"Web Service"**
3. Koppla ditt GitHub-repo (eller skapa ett nytt repo för Strapi)

### 2.2 Konfigurera Strapi Web Service

**Basic Settings:**
- **Name:** `goodasyouare-cms` (eller vad du vill)
- **Environment:** `Node`
- **Region:** Välj närmaste (t.ex. Frankfurt för Sverige)
- **Branch:** `main` (eller din default branch)
- **Root Directory:** Om Strapi ligger i en undermapp, ange den här (t.ex. `strapi`)

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

**OBS:** Om du använder `npm run develop` lokalt, ändra `package.json` så att `npm start` kör produktion.

### 2.3 Lägg till Environment Variables

I Render Dashboard, gå till **Environment** och lägg till:

```
NODE_ENV=production
APP_KEYS=generera-4-random-strings-här
API_TOKEN_SALT=generera-random-string
ADMIN_JWT_SECRET=generera-random-string
JWT_SECRET=generera-random-string
TRANSFER_TOKEN_SALT=generera-random-string
```

**För att generera secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Kör detta 5 gånger och kopiera varje resultat.

**För PostgreSQL (rekommenderat):**
Om du skapar en PostgreSQL-databas på Render, lägg också till:
```
DATABASE_URL=postgresql://user:password@host:port/database
```

### 2.4 Spara och deploya

1. Klicka **"Create Web Service"**
2. Render kommer att bygga och deploya Strapi
3. När det är klart, kopiera URL:en (t.ex. `https://goodasyouare-cms.onrender.com`)

### 2.5 Skapa admin-konto

1. Gå till `https://din-strapi-url.onrender.com/admin`
2. Skapa admin-konto (eller logga in om du redan har ett)
3. **VIKTIGT:** Lägg till allt innehåll och publicera det

---

## Steg 3: Deploya React-appen på Render

### 3.1 Skapa nytt projekt på Render

1. I Render Dashboard, klicka **"New +"** → **"Static Site"**
2. Koppla ditt GitHub-repo (samma repo eller separat för frontend)

### 3.2 Konfigurera Static Site

**Basic Settings:**
- **Name:** `goodasyouare` (eller vad du vill)
- **Branch:** `main`
- **Root Directory:** Lämna tomt (eller om frontend ligger i undermapp)

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
dist
```

### 3.3 Lägg till Environment Variables

I Render Dashboard, gå till **Environment** och lägg till:

```
VITE_STRAPI_API_URL=https://din-strapi-url.onrender.com/api
VITE_EMAILJS_SERVICE_ID=ditt_service_id
VITE_EMAILJS_TEMPLATE_ID=ditt_template_id
VITE_EMAILJS_PUBLIC_KEY=ditt_public_key
```

**OBS:** Ersätt `din-strapi-url` med den faktiska URL:en från Steg 2.4

### 3.4 Spara och deploya

1. Klicka **"Create Static Site"**
2. Render kommer att bygga och deploya React-appen
3. När det är klart, kopiera URL:en (t.ex. `https://goodasyouare.onrender.com`)

---

## Steg 4: Uppdatera CORS i Strapi

När du har React-appens URL:

1. Gå tillbaka till Strapi Web Service på Render
2. **Environment** → Uppdatera CORS-origin med React-appens URL
3. **Save Changes** → Render kommer att restarta Strapi

---

## Steg 5: Konfigurera Custom Domain (valfritt)

### För React-appen:
1. I Static Site settings → **Custom Domains**
2. Lägg till `www.goodasyouare.com` (eller din domän)
3. Följ instruktionerna för DNS-konfiguration

### För Strapi:
1. I Web Service settings → **Custom Domains**
2. Lägg till `cms.goodasyouare.com` (eller subdomän)
3. Följ instruktionerna för DNS-konfiguration

---

## Steg 6: Uppdatera React-appens Environment Variables

När du har custom domain för Strapi:

1. Gå till React Static Site på Render
2. **Environment** → Uppdatera `VITE_STRAPI_API_URL` med ny Strapi-URL
3. **Save Changes** → Render kommer att rebuilda

---

## Petra's inloggning

När allt är deployat:

1. **Strapi Admin URL:** `https://din-strapi-url.onrender.com/admin`
   - Samma inloggning som lokalt
   - Alla Content Types och innehåll finns där
   - Kan redigera allt direkt

2. **Webbplatsen:** `https://din-react-url.onrender.com`
   - Visar innehåll från Strapi
   - Uppdateras automatiskt när Petra ändrar i Strapi

---

## Viktiga punkter

### Strapi:
- **Gratis tier:** Strapi går i "sleep mode" efter 15 min inaktivitet
- **Första request:** Kan ta 30-60 sekunder att "wake up"
- **Lösning:** Uppgradera till betalt plan eller använd en "ping service" för att hålla den vaken

### React-appen:
- **Static Site:** Snabb och gratis
- **Rebuild:** Automatiskt när du pushar till GitHub
- **Environment Variables:** Uppdateras vid rebuild

### Databas:
- **SQLite:** Fungerar men inte idealiskt för produktion
- **PostgreSQL:** Rekommenderat (Render har gratis PostgreSQL)

---

## Nästa steg efter deployment

1. **Testa Strapi Admin:** Logga in och verifiera att allt fungerar
2. **Testa React-appen:** Kontrollera att den hämtar data från Strapi
3. **Testa formulär:** Kontrollera att EmailJS fungerar
4. **Testa på mobil:** Kontrollera prestanda
5. **Google Search Console:** Verifiera webbplatsen och skicka in sitemap


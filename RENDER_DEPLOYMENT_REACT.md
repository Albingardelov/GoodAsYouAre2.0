# React App Deployment på Render

## Snabbguide

### 1. Skapa Static Site på Render

1. Gå till [render.com](https://render.com) och logga in
2. Klicka **"New +"** → **"Static Site"**
3. Koppla ditt GitHub-repo (samma repo eller separat för frontend)

### 2. Konfigurera Static Site

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

### 3. Environment Variables

Lägg till dessa i Render Dashboard → Environment:

```
VITE_STRAPI_API_URL=https://din-strapi-url.onrender.com/api
VITE_EMAILJS_SERVICE_ID=ditt_service_id
VITE_EMAILJS_TEMPLATE_ID=ditt_template_id
VITE_EMAILJS_PUBLIC_KEY=ditt_public_key
```

**OBS:** 
- Ersätt `din-strapi-url` med den faktiska Strapi URL:en från Render
- Kopiera EmailJS-värdena från din lokala `.env`-fil

### 4. Deploya

1. Klicka **"Create Static Site"**
2. Vänta på att builden är klar
3. Kopiera URL:en (t.ex. `https://goodasyouare.onrender.com`)

### 5. Uppdatera CORS i Strapi

När du har React-appens URL:

1. Gå tillbaka till Strapi Web Service på Render
2. **Environment** → Lägg till/uppdatera:
   ```
   CORS_ORIGIN=https://din-react-url.onrender.com,https://www.goodasyouare.com
   ```
3. **Save Changes** → Render kommer att restarta Strapi

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

## Automatisk Deployment

Render deployar automatiskt när du pushar till GitHub-repot.

---

## Testa efter deployment

1. **Testa React-appen:** Kontrollera att den hämtar data från Strapi
2. **Testa formulär:** Kontrollera att EmailJS fungerar
3. **Testa på mobil:** Kontrollera prestanda
4. **Google Search Console:** Verifiera webbplatsen och skicka in sitemap


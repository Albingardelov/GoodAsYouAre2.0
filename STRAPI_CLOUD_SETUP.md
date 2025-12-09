# Strapi Cloud Setup Guide

## Steg 1: Skapa Strapi Cloud-konto

1. Gå till https://cloud.strapi.io
2. Klicka på **"Sign up"** eller **"Get started"**
3. Skapa konto med email (eller GitHub/Google)
4. Verifiera email om det krävs

## Steg 2: Skapa nytt projekt

1. I Strapi Cloud dashboard, klicka **"Create new project"**
2. Välj **"Deploy from Git"** (rekommenderat)
3. Koppla ditt GitHub-konto (om du inte redan gjort det)
4. Välj repository: **`Albingardelov/goodasyouare-cms`**
5. Välj branch: **`main`**
6. Strapi Cloud kommer automatiskt:
   - Klona ditt repo
   - Installera alla dependencies
   - Deploya din befintliga Strapi-installation
   - **Alla dina Content Types kommer med automatiskt!** ✅

## Steg 3: Konfigurera projekt

1. **Projektnamn**: `goodasyouare-cms` (eller valfritt)
2. **Region**: Välj närmaste region (t.ex. Europe)
3. **Plan**: Börja med **Free tier** (kan uppgraderas senare)

## Steg 4: Environment Variables

Strapi Cloud kommer att fråga efter environment variables. 

**OBS**: Strapi Cloud hanterar automatiskt:
- Database (PostgreSQL) - **Du behöver inte konfigurera DATABASE_URL**
- Image storage (Cloudinary) - **Automatiskt konfigurerat**
- SSL certificates - **Automatiskt**
- Backups - **Automatiskt**

Du behöver bara lägga till om du har custom environment variables i din `.env` fil. Annars kan du hoppa över detta steg.

## Steg 5: Vänta på deployment

- Strapi Cloud kommer att:
  1. Klona ditt GitHub repo
  2. Installera dependencies
  3. Köra migrations
  4. Starta Strapi

Detta tar vanligtvis 5-10 minuter.

## Steg 6: Skapa admin-användare

1. När deployment är klar, klicka på **"Open Admin Panel"**
2. Skapa första admin-användare:
   - Email: (Petras email)
   - Password: (säkert lösenord)
   - First name: Petra
   - Last name: (efternamn)

## Steg 7: Hämta Strapi Cloud URL

1. I Strapi Cloud dashboard, hitta din **Project URL**
2. Den ser ut ungefär så här: `https://goodasyouare-cms-xxxxx.strapi.app`
3. **API URL** blir: `https://goodasyouare-cms-xxxxx.strapi.app/api`

## Steg 8: Migrera innehåll från Render

**Viktigt**: Dina Content Types (strukturen) kommer automatiskt med från GitHub-repot! ✅

Du behöver bara migrera **innehållet** (data) från Render till Strapi Cloud.

### Alternativ 1: Exportera/Importera med Strapi Transfer (Rekommenderat)

1. **Exportera från Render**:
   - Logga in på Render Strapi Admin: `https://goodasyouare-cms.onrender.com/admin`
   - Gå till: **Settings** → **Transfer Tokens** → **Create new transfer token**
   - Kopiera token
   - Kör lokalt (från `goodasyouare-cms` mappen):
     ```bash
     cd C:\Users\albin\Documents\GoodAsYouAre\goodasyouare-cms
     npx @strapi/strapi export --no-encrypt
     ```
   - Detta skapar en `export.tar.gz` fil

2. **Importera till Strapi Cloud**:
   - Logga in på Strapi Cloud Admin
   - Gå till: **Settings** → **Transfer Tokens** → **Create new transfer token**
   - Kopiera token
   - Kör lokalt:
     ```bash
     npx @strapi/strapi import --no-encrypt
     ```
   - Följ instruktionerna och ange Strapi Cloud URL och token

### Alternativ 2: Manuell import (Enklare, men tar längre tid)

1. Logga in på båda:
   - Render Admin: `https://goodasyouare-cms.onrender.com/admin`
   - Strapi Cloud Admin: (din Strapi Cloud URL)

2. Gå igenom varje Content Type och kopiera innehåll:
   - Home Hero
   - Home Testimonial
   - About
   - ACT
   - Toxism
   - Services
   - Contact
   - Privacy
   - Privacy Policy
   - Disclaimer

3. **Viktigt**: Lägg till innehåll för både **svenska (sv-SE)** och **engelska (en)** i Strapi Cloud

4. Ladda upp bilder från Render Media Library till Strapi Cloud Media Library

## Steg 9: Konfigurera Permissions

1. I Strapi Cloud Admin, gå till:
   - **Settings** → **Users & Permissions** → **Roles** → **Public**
2. För varje Content Type, bocka i:
   - `find`
   - `findOne`
3. Klicka **Save**

## Steg 10: Uppdatera React-appen

1. Uppdatera environment variable i React-appen:
   - Lokalt: `.env` fil
   - Vercel: Environment Variables i dashboard

2. Lägg till:
   ```
   VITE_STRAPI_API_URL=https://goodasyouare-cms-xxxxx.strapi.app/api
   ```

3. Rebuild och deploya React-appen

## Steg 11: Testa

1. Testa att React-appen kan hämta data från Strapi Cloud
2. Testa både svenska och engelska
3. Testa att ladda upp bilder i Strapi Cloud Media Library
4. Verifiera att bilderna visas korrekt på webbplatsen

## Steg 12: Uppdatera CORS (om nödvändigt)

Strapi Cloud hanterar vanligtvis CORS automatiskt, men om du får CORS-fel:

1. I Strapi Cloud Admin:
   - **Settings** → **Users & Permissions** → **Advanced Settings**
   - Lägg till din React-app URL i **CORS allowed origins**

## Nästa steg

- [ ] Skapa Strapi Cloud-konto
- [ ] Deploya Strapi till Cloud
- [ ] Migrera innehåll
- [ ] Uppdatera React-appen
- [ ] Testa allt

## Support

Om du stöter på problem:
- Strapi Cloud dokumentation: https://docs.strapi.io/cloud
- Strapi Cloud support: support@strapi.io


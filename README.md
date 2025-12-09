# Good As You Are

A modern React + Vite + TypeScript website for ACT Therapy, Motivation Coaching, and Lectures on Narcissism.

## 🚀 Deployment Status

- **Frontend**: Deployed to [Vercel](https://vercel.com)
- **Backend**: Deployed to [Strapi Cloud](https://cloud.strapi.io)
- **Status**: ✅ Production Ready

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

**Note**: For local development, you can use local Strapi (`http://localhost:1337`) or point to Strapi Cloud by updating `.env` file.

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
- **Strapi v5** - Headless CMS (deployed on Strapi Cloud)
- **TanStack React Query** - Data fetching och caching
- **Axios** - HTTP client
- **EmailJS** - Contact form email service
- **Silktide Cookie Consent** - GDPR-compliant cookie banner
- **React Helmet Async** - SEO metadata management

## ✨ Features Implemented

### Content Management
- ✅ All content managed through Strapi Cloud
- ✅ Multi-language support (Swedish/English) with i18n
- ✅ Dynamic content for all pages:
  - Home (Hero + Testimonial)
  - About (with background and profile images)
  - ACT (8 sections)
  - Toxism (8 sections)
  - Services (3 sections)
  - Contact (form with EmailJS)
  - Privacy Policy (full page)
  - Disclaimer (full page)

### User Experience
- ✅ Language switcher (Swedish/English)
- ✅ Responsive design
- ✅ SEO optimized (meta tags, sitemap, robots.txt)
- ✅ Cookie consent banner (Silktide)
- ✅ Contact form with EmailJS integration

### Deployment
- ✅ Frontend deployed to Vercel
- ✅ Backend deployed to Strapi Cloud
- ✅ Automatic image storage (no ephemeral storage issues)
- ✅ Environment variables configured
- ✅ CORS properly configured

## 📁 Project Structure

```
src/
├── components/          # Reusable components (Layout, SEO, LanguageSwitcher)
├── pages/              # Page components (all connected to Strapi)
├── services/           # API functions for Strapi
├── hooks/              # React Query hooks for Strapi data
├── types/              # TypeScript types for Strapi
├── config/             # Strapi configuration
├── contexts/           # React contexts (LanguageContext)
├── lib/                # Axios and React Query setup
├── translations/       # Hardcoded translations (navigation)
├── App.tsx             # Main app component with routing
└── main.tsx            # Entry point

public/
├── cookie-banner/      # Silktide cookie consent files
├── robots.txt          # SEO robots file
└── sitemap.xml         # SEO sitemap
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_STRAPI_API_URL=https://cozy-dance-65e2c8ae4f.strapiapp.com/api
VITE_STRAPI_API_TOKEN=your_api_token_here
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**For Vercel deployment**: Add these same variables in Vercel Dashboard → Settings → Environment Variables.

## 🌐 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel Dashboard
3. Deploy automatically on push to main branch

### Backend (Strapi Cloud)
1. Connected to GitHub: `Albingardelov/goodasyouare-cms`
2. Automatic deployments on push to main branch
3. Content managed through Strapi Cloud Admin Panel

## 📝 Content Management

All content is managed through Strapi Cloud Admin:
- URL: `https://cozy-dance-65e2c8ae4f.strapiapp.com/admin`
- Login with admin credentials
- All content types support Swedish (sv) and English (en) locales
- Images are automatically stored in Strapi Cloud (persistent storage)

## 🍪 Cookie Consent

Silktide cookie banner is implemented with:
- **Necessary cookies**: Always active (language preference)
- **Functional cookies**: Optional (for EmailJS)
- **Analytics cookies**: Optional (for future Google Analytics)
- **Marketing cookies**: Optional (for future Facebook Pixel/Google Ads)

Banner automatically switches language based on user's language preference.

## ⚠️ Viktigt

- **Strapi Cloud** is used for production (not local Strapi)
- **Environment variables** must be set in Vercel for production
- **CORS** is configured in Strapi Cloud to allow Vercel domain
- **All content** must be published in Strapi for both languages (sv and en)

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

## 🐛 Vanliga problem

### 404-fel från Strapi API
- Kontrollera att endpoint-namnet är korrekt (Strapi v5 pluraliserar annorlunda)
- `home-hero` → `/api/home-heroes` (med "es")
- Testa endpoint direkt: `https://cozy-dance-65e2c8ae4f.strapiapp.com/api/home-heroes?populate=*`

### 403 Forbidden
- Gå till Strapi Cloud Admin → Settings → Users & Permissions → Roles → Public
- Bocka i `find` och `findOne` för Content Type

### "Error loading content"
- Kontrollera att innehåll är publicerat för båda språken (sv och en) i Strapi
- Kontrollera att API token är korrekt i environment variables
- Kolla browser Console för exakta felmeddelanden

### Cache-problem
- Hård uppdatering: `Ctrl + Shift + R`
- Rensa Vite cache: Ta bort `node_modules/.vite` mappen
- Starta om dev-servern

### Bilder visas inte
- Kontrollera att bilden är kopplad i Strapi Cloud
- Kontrollera att innehållet är publicerat (inte Draft)
- Använd `populate=*` i API-anropet

### Cookie banner visas inte
- Kontrollera att filerna finns i `public/cookie-banner/`
- Kolla browser Console för JavaScript-fel
- Cookie banner initieras efter att React är redo (kan ta några sekunder)

## 🎯 Nästa steg (valfritt)

### Kortsiktigt
- [ ] **Custom Domain**: Koppla `goodasyouare.com` till Vercel
  - Lägg till domain i Vercel Dashboard
  - Uppdatera CORS i Strapi Cloud för att inkludera custom domain
  - Konfigurera DNS-inställningar

- [ ] **Ta bort debug-logging**: Rensa console.log från `src/lib/axios.ts`
  - Ta bort debug-logging för renare production-kod

- [ ] **Skapa Contact Content Type**: Lägg till `contact` Content Type i Strapi Cloud
  - För att ta bort 404-fel i Console (formuläret fungerar ändå med fallback-värden)

### Långsiktigt
- [ ] **Google Analytics**: Lägg till analytics tracking
  - Installera Google Analytics
  - Uppdatera cookie-config.js för att initialisera GA vid consent
  - Se kommenterad kod i `cookie-config.js`

- [ ] **Facebook Pixel**: Lägg till för marknadsföring (om behövs)
  - Installera Facebook Pixel
  - Uppdatera cookie-config.js för att initialisera Pixel vid consent

- [ ] **Performance Optimization**:
  - Implementera bildlazy loading
  - Optimera bildstorlekar
  - Implementera service worker för offline support

- [ ] **Testing**:
  - Lägg till unit tests
  - Lägg till integration tests
  - Testa på olika enheter och webbläsare

- [ ] **Accessibility**:
  - Lägg till ARIA-labels där det saknas
  - Testa med skärmläsare
  - Kontrollera kontrast och färger

## 📚 Ytterligare dokumentation

- `STRAPI_CLOUD_SETUP.md` - Guide för Strapi Cloud setup
- `EMAILJS_SETUP.md` - Guide för EmailJS konfiguration
- `STRAPI_I18N_SETUP.md` - Guide för språkväxling

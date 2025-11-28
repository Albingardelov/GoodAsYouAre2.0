# SEO & Prestanda Optimering Guide

Denna guide sammanfattar alla SEO- och prestandaoptimeringar som är implementerade.

## ✅ Implementerat

### 1. SEO Metadata
- **react-helmet-async** installerat för dynamisk SEO
- **SEO-komponent** skapad med:
  - Title tags (unik för varje sida)
  - Meta descriptions
  - Keywords
  - Open Graph tags (Facebook, LinkedIn)
  - Twitter Cards
  - Canonical URLs
  - Structured Data (JSON-LD)

### 2. Sökordsoptimering
Varje sida har specifika keywords:
- **Home:** "ACT Therapy, Motivation Coaching, Narcissism, Good As You Are, goodasyouare"
- **About:** "ACT Therapist, About, Narcissism Specialist"
- **ACT:** "ACT Therapy, Acceptance and Commitment Therapy"
- **Toxism:** "Toxism, Narcissism, Toxic Relationships"
- **Services:** "ACT Therapy Services, Motivation Coaching"
- **Contact:** "Contact Good As You Are, Book Therapy Session"

### 3. Structured Data (JSON-LD)
- Home-sidan har ProfessionalService schema
- Hjälper Google att förstå vad webbplatsen handlar om

### 4. Prestandaoptimeringar

#### Bilder:
- **Lazy loading** på alla bilder (utom hero-bild)
- **Width/height attribut** för att förhindra layout shift
- **fetchPriority="high"** på hero-bild

#### Vite Build:
- **Code splitting** (vendor chunks)
- **Minifiering** med terser
- **Console.log borttagning** i produktion
- **Tree shaking** för mindre bundle size

### 5. Mobiloptimering
- **Viewport meta tag** optimerad
- **Theme color** för mobil
- **Apple mobile web app** support
- **Responsive design** (redan implementerat)

### 6. SEO-filer
- **robots.txt** - Tillåter alla crawlers
- **sitemap.xml** - Alla sidor listade med språk-alternativ

## 📋 Ytterligare rekommendationer

### 1. Bildoptimering
- **Konvertera bilder till WebP** format (mindre filstorlek)
- **Använd Strapi's bildoptimering** (formats: thumbnail, small, medium, large)
- **Lägg till alt-texter** på alla bilder i Strapi

### 2. Content
- **Använd H1, H2, H3** korrekt (redan implementerat)
- **Lägg till mer text** på sidorna (Google gillar innehållsrika sidor)
- **Inkludera sökord naturligt** i texterna

### 3. Tekniska optimeringar
- **Aktivera gzip/brotli** på servern
- **Använd CDN** för statiska filer
- **Implementera Service Worker** för offline support (valfritt)

### 4. Google Search Console
1. **Verifiera webbplatsen** i Google Search Console
2. **Skicka in sitemap.xml**
3. **Övervaka prestanda** och sökord

### 5. PageSpeed Insights
- **Testa sidan** på [PageSpeed Insights](https://pagespeed.web.dev/)
- **Mål:** 90+ på mobil och desktop
- **Fixa eventuella problem** som rapporteras

## 🚀 Nästa steg

1. **Bygg produktion:** `npm run build`
2. **Testa lokalt:** `npm run preview`
3. **Deploya** till produktion
4. **Verifiera** att robots.txt och sitemap.xml är tillgängliga
5. **Skicka in sitemap** till Google Search Console

## 📊 Monitoring

Efter deployment:
- **Google Search Console** - Övervaka sökningar och klick
- **Google Analytics** - Spåra besökare (lägg till senare om önskat)
- **PageSpeed Insights** - Övervaka prestanda


# Strapi Setup Guide

Denna guide visar hur du installerar och konfigurerar Strapi lokalt för Good As You Are-projektet.

## Steg 1: Installera Strapi

Öppna en ny terminal och navigera till önskad plats för Strapi-projektet:

```bash
cd [SÖKVÄG TILL ÖNSKAD PLATS]
npx create-strapi-app@latest goodasyouare-cms --quickstart
```

**OBS:** Strapi har flyttats till en egen mapp. Om du redan har Strapi installerat, navigera till den mappen istället.

Detta kommer att:
- Skapa en ny mapp `goodasyouare-cms`
- Installera Strapi
- Starta Strapi automatiskt

**Obs:** Det kan ta några minuter första gången.

## Steg 2: Skapa Admin-konto

När Strapi startar öppnas automatiskt:
- `http://localhost:1337/admin`

Där skapar du ditt första admin-konto:
- Förnamn
- Efternamn
- Email
- Lösenord

## Steg 3: Skapa Content Types

### 3.1 Skapa "home-hero"

1. I Strapi admin, gå till **Content-Type Builder** (vänstermenyn)
2. Klicka på **"Create new collection type"**
3. Namn: `home-hero` (använd bindestreck, inte mellanslag)
4. Klicka **Continue**
5. Lägg till fält:
   - **Display name:** `Title`
   - **Type:** Text
   - **Name:** `title` (låt det vara auto-genererat)
   - Klicka **Finish**
   
   - **Display name:** `Subtitle`
   - **Type:** Text
   - **Name:** `subtitle`
   - Klicka **Finish**
   
   - **Display name:** `Image`
   - **Type:** Media
   - **Media type:** Single media
   - **Name:** `image`
   - Klicka **Finish**

6. Klicka **Save** (högst upp till höger)

### 3.2 Skapa "home-testimonial"

1. I **Content-Type Builder**, klicka **"Create new collection type"**
2. Namn: `home-testimonial`
3. Klicka **Continue**
4. Lägg till fält:
   - **Display name:** `Text`
   - **Type:** Text
   - **Type of text:** Long text
   - **Name:** `text`
   - Klicka **Finish**

5. Klicka **Save**

## Steg 4: Gör Content Types publika (viktigt!)

För att React-appen ska kunna läsa data måste vi göra API:erna publika:

1. Gå till **Settings** (vänstermenyn längst ner)
2. Klicka på **Users & Permissions Plugin**
3. Klicka på **Roles**
4. Klicka på **Public** (den enda rollen)
5. Scrolla ner till **Permissions**
6. Hitta `home-hero` och bocka i:
   - ✅ `find` (hämta alla)
   - ✅ `findOne` (hämta en)
7. Hitta `home-testimonial` och bocka i:
   - ✅ `find`
   - ✅ `findOne`
8. Klicka **Save** (högst upp)

## Steg 5: Lägg till innehåll

### 5.1 Lägg till Hero-innehåll

1. Gå till **Content Manager** (vänstermenyn)
2. Klicka på **home-hero**
3. Klicka **"Create new entry"**
4. Fyll i:
   - **Title:** 
     ```
     ACT Therapy
     Motivation Coaching
     Lectures on Narcissism
     ```
   - **Subtitle:** `Specialized in narcissistic personality`
   - **Image:** Klicka på fältet och ladda upp en bild
5. Klicka **Save** (högst upp)
6. Klicka **Publish** (högst upp) - **VIKTIGT!** Innehåll måste publiceras.

### 5.2 Lägg till Testimonial

1. I **Content Manager**, klicka på **home-testimonial**
2. Klicka **"Create new entry"**
3. I **Text**-fältet, klistra in:
   ```
   "I have never felt so seen and appreciated by anyone. I was put on the highest of all pedestals and lived in a dream, but a short-lived one.

   From lots of declarations of love, flowers and chocolates, it quickly changed to constant insults, devaluation and gaslighting. The latter is the technique that makes us question our own reality and identity.

   The hierarchy quickly became visible, where I went from top to bottom from one second to another. The feeling that I am walking on eggshells has set in and I'm just waiting for the next attack. It is always my fault when hen have done something and nothing I do is enough, never.

   I have now, without even thinking, quickly adapted. I have started to act proactively by constantly doing everything before hen point out what I have not done. My whole world became one of internal stress, and I am constantly trying to improvise and give more. In a very short, intense time, I went from being overjoyed to questioning my own reality and dignity"
   ```
4. Klicka **Save**
5. Klicka **Publish**

## Steg 6: Verifiera att det fungerar

1. Öppna webbläsaren och gå till: `http://localhost:1337/api/home-heroes` (observera "es" i slutet)
2. Du ska se JSON-data med ditt innehåll
3. Testa även: `http://localhost:1337/api/home-testimonials`

**OBS:** Strapi pluraliserar Content Type-namn automatiskt. Om Content Type heter `home-hero` blir endpointen `home-heroes`.

## Steg 7: Koppla React-appen

1. I React-projektet (`C:\Users\albin\Documents\GoodAsYouAre\GoodAsYouAre`), skapa en `.env`-fil i root (om den inte finns):
   ```
   VITE_STRAPI_API_URL=http://localhost:1337/api
   ```

2. Starta React-appen:
   ```bash
   cd C:\Users\albin\Documents\GoodAsYouAre\GoodAsYouAre
   npm run dev
   ```

3. Nu ska React-appen hämta data från Strapi!

## Tips

- **Strapi måste köras** när du utvecklar (port 1337)
- **Innehåll måste publiceras** för att vara synligt via API
- Om du ändrar Content Types måste du starta om Strapi
- Strapi sparar data i en SQLite-databas (i `goodasyouare-cms/.tmp/data.db`)

## Felsökning

**Problem:** React-appen kan inte hämta data
- Kontrollera att Strapi körs på port 1337
- Kontrollera att innehåll är publicerat
- Kontrollera att Public-rollen har rättigheter (find, findOne)

**Problem:** CORS-fel
- Strapi ska hantera detta automatiskt i development, men om det inte fungerar, lägg till i `goodasyouare-cms/config/middlewares.ts`:
  ```js
  cors: {
    enabled: true,
    origin: ['http://localhost:5173'] // Vite default port
  }
  ```

## Nästa steg

När detta fungerar kan du:
- Lägga till fler Content Types för andra sidor
- Redigera innehåll direkt i Strapi admin
- Byt bilder utan att ändra kod

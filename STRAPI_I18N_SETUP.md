# Strapi i18n Setup Guide

Denna guide visar hur du aktiverar flerspråkighet (svenska/engelska) i Strapi och frontend.

## Steg 1: Aktivera i18n-plugin i Strapi

1. **Gå till Strapi Admin** (`http://localhost:1337/admin`)
2. **Settings** → **Internationalization** (i18n)
3. Om du inte ser "Internationalization", behöver du installera plugin:
   - Gå till **Marketplace** i Strapi admin
   - Sök efter "i18n" eller "Internationalization"
   - Installera plugin: `@strapi/plugin-i18n`

## Steg 2: Lägg till språk

1. Gå till **Settings** → **Internationalization**
2. Klicka på **"Add a locale"**
3. Lägg till:
   - **Svenska (sv)**: 
     - Code: `sv`
     - Display name: `Svenska`
   - **Engelska (en)**:
     - Code: `en`
     - Display name: `English`

**OBS:** Strapi har redan ett default-språk (troligen `en`). Du behöver bara lägga till `sv` om det inte finns.

## Steg 3: Aktivera i18n för Content Types

För varje Content Type du vill ha flerspråkig:

1. Gå till **Content-Type Builder**
2. Klicka på Content Type (t.ex. `home-hero`)
3. Klicka på **"Configure the view"** (kugghjuls-ikonen)
4. Aktivera **"Enable localization for this Content-Type"**
5. Klicka **Save**
6. Upprepa för alla Content Types:
   - `home-hero`
   - `home-testimonial`
   - `about`
   - `act`
   - `toxism`
   - `services`
   - `contact` (om du skapar den)

## Steg 4: Lägg till innehåll på båda språken

1. Gå till **Content Manager**
2. Välj en Content Type (t.ex. `Home Hero`)
3. Du kommer nu se en språk-väljare (t.ex. "English" / "Svenska")
4. Skapa/redigera innehåll för varje språk:
   - Välj "English" och lägg till engelskt innehåll
   - Välj "Svenska" och lägg till svenskt innehåll
5. **Publicera** innehållet för båda språken

## Steg 5: Konfigurera API-permissions

1. Gå till **Settings** → **Users & Permissions** → **Roles** → **Public**
2. För varje Content Type, aktivera:
   - `find` (för att hämta lista)
   - `findOne` (för att hämta enstaka items)
3. **Spara**

## Steg 6: Testa API

Testa att hämta innehåll med locale-parameter:

- **Svenska:** `http://localhost:1337/api/home-heroes?locale=sv&populate=*`
- **Engelska:** `http://localhost:1337/api/home-heroes?locale=en&populate=*`

Du ska få olika innehåll beroende på locale.

## Nästa steg

När detta är klart, kommer frontend-koden att:
1. Visa en språkväxlare
2. Spara valt språk i localStorage
3. Hämta rätt språk från Strapi baserat på användarens val


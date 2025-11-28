# Strapi Privacy/Disclaimer Setup Guide

Denna guide visar hur du skapar Privacy/Disclaimer Content Type i Strapi för att kunna översätta texterna.

## Steg 1: Skapa Privacy/Disclaimer Content Type

1. **Gå till Content-Type Builder** i Strapi admin
2. **Klicka på "Create new collection type"**
3. **Namn:** `privacy` (singular)
4. **Klicka Continue**

## Steg 2: Lägg till fält

Lägg till ett enda fält:

1. **Footer Text** (Text)
   - Display name: `Footer Text`
   - Name: `footerText`
   - Type: Text (Long text)
   - Detta kommer att innehålla hela footer-texten (Privacy Policy, Disclaimer, Copyright, etc.)

2. **Klicka Save**

## Steg 3: Aktivera i18n

1. **Klicka på kugghjulsikonen** bredvid `privacy` Content Type
2. **Kryssa i "Internationalization"**
3. **Klicka Finish**

## Steg 4: Konfigurera permissions

1. **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Aktivera **find** och **findOne** för `privacy`
3. **Spara**

## Steg 5: Lägg till innehåll

1. **Gå till Content Manager**
2. **Välj "Privacy"**
3. **Välj språk** (English/Svenska)
4. **Lägg till innehåll:**

   **För English:**
   - Footer Text: `Privacy Policy – Disclaimer`
   
   **För Svenska:**
   - Footer Text: `Integritetspolicy – Ansvarsfriskrivning`

   **OBS:** Copyright-raden (`© 2024 Good As You Are`) läggs till automatiskt i koden, så du behöver bara lägga till första raden.

5. **Publicera** innehållet för båda språken

## Nästa steg

När detta är klart kommer frontend-koden att:
1. Hämta Privacy/Disclaimer-text från Strapi
2. Visa rätt språk baserat på användarens val
3. Uppdatera automatiskt när du ändrar texten i Strapi


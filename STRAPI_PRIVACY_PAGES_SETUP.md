# Strapi Privacy Policy & Disclaimer Pages Setup Guide

Denna guide visar hur du skapar Privacy Policy och Disclaimer Content Types i Strapi.

## Steg 1: Skapa Privacy Policy Content Type

1. **Gå till Content-Type Builder** i Strapi admin
2. **Klicka på "Create new collection type"**
3. **Namn:** `privacyPolicy` (singular, camelCase - INTE bindestreck)
4. **Klicka Continue**

**OBS:** Strapi tillåter inte bindestreck i Content Type-namn. Använd `privacyPolicy` (camelCase).

## Steg 2: Lägg till fält för Privacy Policy

Lägg till dessa fält:

1. **Title** (Text)
   - Display name: `Title`
   - Name: `title`
   - Type: Text
   - Default: `Privacy Policy`

2. **Content** (Text)
   - Display name: `Content`
   - Name: `content`
   - Type: Text (Long text)
   - Detta kommer att innehålla hela Privacy Policy-texten

3. **Klicka Save**

## Steg 3: Skapa Disclaimer Content Type

1. **Gå till Content-Type Builder** i Strapi admin
2. **Klicka på "Create new collection type"**
3. **Namn:** `disclaimer` (singular)
4. **Klicka Continue**

## Steg 4: Lägg till fält för Disclaimer

Lägg till dessa fält:

1. **Title** (Text)
   - Display name: `Title`
   - Name: `title`
   - Type: Text
   - Default: `Disclaimer`

2. **Content** (Text)
   - Display name: `Content`
   - Name: `content`
   - Type: Text (Long text)
   - Detta kommer att innehålla hela Disclaimer-texten

3. **Klicka Save**

## Steg 5: Aktivera i18n (valfritt)

Om du vill ha översättningar senare:

1. **Klicka på kugghjulsikonen** bredvid varje Content Type
2. **Kryssa i "Internationalization"**
3. **Klicka Finish**

**OBS:** För nu behöver du bara engelska, så du kan hoppa över i18n om du vill.

## Steg 6: Konfigurera permissions

1. **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Aktivera **find** och **findOne** för:
   - `privacyPolicy`
   - `disclaimer`
3. **Spara**

## Steg 7: Lägg till innehåll

### Privacy Policy:

1. **Gå till Content Manager**
2. **Välj "Privacy Policy"**
3. **Lägg till:**
   - Title: `Privacy Policy`
   - Content: Klistra in hela Privacy Policy-texten (den långa texten du har)
4. **Publicera**

### Disclaimer:

1. **Gå till Content Manager**
2. **Välj "Disclaimer"**
3. **Lägg till:**
   - Title: `Disclaimer`
   - Content: Klistra in hela Disclaimer-texten (den långa texten du har)
4. **Publicera**

## Steg 8: Uppdatera Footer Privacy Content Type

Om du redan har skapat `privacy` Content Type för footern, uppdatera den:

1. **Gå till Content-Type Builder**
2. **Klicka på `privacy`**
3. **Lägg till/uppdatera fält:**
   - **Privacy Policy Text** (Text) - Text för länken (t.ex. "Privacy Policy")
   - **Disclaimer Text** (Text) - Text för länken (t.ex. "Disclaimer")
4. **Spara**

5. **Gå till Content Manager** → **Privacy**
6. **Lägg till innehåll:**
   - Privacy Policy Text: `Privacy Policy` (eller `Integritetspolicy` på svenska)
   - Disclaimer Text: `Disclaimer` (eller `Ansvarsfriskrivning` på svenska)
7. **Publicera**

## Nästa steg

När detta är klart kommer:
1. Länkarna i footern att vara klickbara
2. Klick på "Privacy Policy" öppnar `/privacy-policy` med hela texten
3. Klick på "Disclaimer" öppnar `/disclaimer` med hela texten


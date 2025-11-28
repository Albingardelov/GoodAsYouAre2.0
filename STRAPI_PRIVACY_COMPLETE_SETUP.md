# Komplett Guide: Privacy Policy & Disclaimer i Strapi

Denna guide visar exakt vad du behöver skapa i Strapi för Privacy Policy och Disclaimer.

## Översikt

Du behöver skapa **3 Content Types** i Strapi:

1. **`privacy`** - För footer-länkarna (korta texter)
2. **`privacyPolicy`** - För Privacy Policy-sidan (lång text)
3. **`disclaimer`** - För Disclaimer-sidan (lång text)

---

## Content Type 1: `privacy` (för footer-länkarna)

### Steg 1: Skapa Content Type
1. Gå till **Content-Type Builder** i Strapi
2. Klicka **"Create new collection type"**
3. **Namn:** `privacy` (singular, små bokstäver)
4. Klicka **Continue**

### Steg 2: Lägg till fält
Lägg till dessa **2 fält** (båda Text):

1. **Privacy Policy Text**
   - Display name: `Privacy Policy Text`
   - Name: `privacyPolicyText` (auto-genererat)
   - Type: **Text**

2. **Disclaimer Text**
   - Display name: `Disclaimer Text`
   - Name: `disclaimerText` (auto-genererat)
   - Type: **Text**

3. Klicka **Save**

### Steg 3: Aktivera i18n
1. Klicka på **kugghjulsikonen** bredvid `privacy`
2. Kryssa i **"Internationalization"**
3. Klicka **Finish**

### Steg 4: Permissions
1. **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Aktivera **find** och **findOne** för `privacy`
3. **Spara**

### Steg 5: Lägg till innehåll
1. **Content Manager** → **Privacy**
2. **Välj språk: English**
   - Privacy Policy Text: `Privacy Policy`
   - Disclaimer Text: `Disclaimer`
3. **Publicera**
4. **Välj språk: Svenska**
   - Privacy Policy Text: `Integritetspolicy`
   - Disclaimer Text: `Ansvarsfriskrivning`
5. **Publicera**

---

## Content Type 2: `privacyPolicy` (för Privacy Policy-sidan)

### Steg 1: Skapa Content Type
1. Gå till **Content-Type Builder**
2. Klicka **"Create new collection type"**
3. **Namn:** `privacyPolicy` (camelCase, INTE bindestreck!)
4. Klicka **Continue**

### Steg 2: Lägg till fält
Lägg till dessa **2 fält**:

1. **Title**
   - Display name: `Title`
   - Name: `title` (auto-genererat)
   - Type: **Text**

2. **Content**
   - Display name: `Content`
   - Name: `content` (auto-genererat)
   - Type: **Text** → Välj **Long text**

3. Klicka **Save**

### Steg 3: Permissions
1. **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Aktivera **find** och **findOne** för `privacyPolicy`
3. **Spara**

### Steg 4: Lägg till innehåll
1. **Content Manager** → **Privacy Policy**
2. **Title:** `Privacy Policy`
3. **Content:** Klistra in hela Privacy Policy-texten (den långa texten du har)
4. **Publicera**

**OBS:** Denna är bara på engelska för nu, så du behöver bara lägga till en gång.

---

## Content Type 3: `disclaimer` (för Disclaimer-sidan)

### Steg 1: Skapa Content Type
1. Gå till **Content-Type Builder**
2. Klicka **"Create new collection type"**
3. **Namn:** `disclaimer` (singular, små bokstäver)
4. Klicka **Continue**

### Steg 2: Lägg till fält
Lägg till dessa **2 fält**:

1. **Title**
   - Display name: `Title`
   - Name: `title` (auto-genererat)
   - Type: **Text**

2. **Content**
   - Display name: `Content`
   - Name: `content` (auto-genererat)
   - Type: **Text** → Välj **Long text**

3. Klicka **Save**

### Steg 3: Permissions
1. **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Aktivera **find** och **findOne** för `disclaimer`
3. **Spara**

### Steg 4: Lägg till innehåll
1. **Content Manager** → **Disclaimer**
2. **Title:** `Disclaimer`
3. **Content:** Klistra in hela Disclaimer-texten (den långa texten du har)
4. **Publicera**

**OBS:** Denna är bara på engelska för nu, så du behöver bara lägga till en gång.

---

## Sammanfattning

Efter att du har skapat allt ovan kommer:

1. **Footer** att visa länkar: "Privacy Policy – Disclaimer" (eller svenska versionen)
2. **Klick på "Privacy Policy"** öppnar `/privacy-policy` med hela Privacy Policy-texten
3. **Klick på "Disclaimer"** öppnar `/disclaimer` med hela Disclaimer-texten

All text kommer från Strapi, inget är hårdkodat i koden!


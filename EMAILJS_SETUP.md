# EmailJS Setup Guide

Denna guide visar hur du konfigurerar EmailJS för kontaktformuläret på Contact-sidan.

## Steg 1: Skapa EmailJS-konto

1. Gå till [https://www.emailjs.com/](https://www.emailjs.com/)
2. Klicka på **"Sign Up"** (gratis)
3. Skapa ett konto (eller logga in med Google/GitHub)

## Steg 2: Skapa Email Service

1. I EmailJS Dashboard, gå till **Email Services**
2. Klicka på **"Add New Service"**
3. **VIKTIGT för Loopia:** Scrolla ner eller sök efter **"Custom SMTP Server"** (INTE Gmail, Outlook eller andra providers)
4. Välj **"Custom SMTP Server"**
5. Fyll i SMTP-inställningar för Loopia:
   - **SMTP Server:** `smtp.loopia.se` (eller `mail.loopia.se`)
   - **SMTP Port:** `587` (för TLS) eller `465` (för SSL)
   - **SMTP Username:** Din fullständiga email-adress (t.ex. `dittnamn@dindomän.se`)
   - **SMTP Password:** Ditt email-lösenord
   - **Secure Connection:** Välj **TLS** (för port 587) eller **SSL** (för port 465)
5. Klicka **"Create Service"**
6. **Spara Service ID** (du behöver det senare)

**OBS för Loopia:**
- **Välj INTE Gmail/Outlook** - dessa kräver "App Password" och fungerar inte med Loopia
- Du måste välja **"Custom SMTP Server"** för att se rätt fält (SMTP Server, Port, Username, Password)
- Om du ser fält för "User" och "App Password" har du valt fel provider - gå tillbaka och välj "Custom SMTP Server"
- Om port 587 inte fungerar, prova port 465 med SSL
- Kontrollera att din email-adress är fullständig (inkluderar @domän.se)
- Om du har problem, kontrollera Loopia's dokumentation för SMTP-inställningar

## Steg 3: Skapa Email Template

1. Gå till **Email Templates** i EmailJS Dashboard
2. Klicka på **"Create New Template"**
3. Använd följande variabler i mallen:
   - `{{from_name}}` - Avsändarens namn
   - `{{from_email}}` - Avsändarens email
   - `{{message}}` - Meddelandet

4. Exempel på template:
   ```
   Subject: Nytt meddelande från {{from_name}}
   
   Från: {{from_name}}
   Email: {{from_email}}
   
   Meddelande:
   {{message}}
   ```

5. **Spara Template ID** (du behöver det senare)

## Steg 4: Hämta Public Key

1. Gå till **Account** → **General**
2. Hitta **Public Key** (eller "API Keys")
3. **Kopiera Public Key**

## Steg 5: Lägg till i .env-fil

I projektets root-mapp, lägg till dessa rader i `.env`-filen:

```
VITE_STRAPI_API_URL=http://localhost:1337/api
VITE_EMAILJS_SERVICE_ID=ditt_service_id
VITE_EMAILJS_TEMPLATE_ID=ditt_template_id
VITE_EMAILJS_PUBLIC_KEY=ditt_public_key
```

**OBS:** Ersätt `ditt_service_id`, `ditt_template_id` och `ditt_public_key` med dina faktiska värden från EmailJS.

## Steg 6: Skapa Contact Content Type i Strapi (valfritt)

Om du vill kunna redigera formulärtexter via Strapi:

1. **Gå till Content-Type Builder** i Strapi admin
2. **Skapa ny Collection Type:**
   - Namn: `contact` (singular)
   - Klicka **Continue**

3. **Lägg till fält:**
   - **Title** (Text) - Huvudrubrik
   - **Name Label** (Text) - Label för namn-fält
   - **Email Label** (Text) - Label för email-fält
   - **Message Label** (Text) - Label för meddelande-fält
   - **Submit Button Text** (Text) - Text på submit-knappen
   - **Privacy Policy Text** (Text) - Text för privacy policy checkbox
   - **Success Message** (Text) - Meddelande när formulär skickats
   - **Error Message** (Text) - Meddelande vid fel

4. **Spara** och konfigurera permissions (Settings → Users & Permissions → Roles → Public → find, findOne)

5. **Lägg till innehåll** i Content Manager och publicera

## Testa formuläret

1. Starta React-appen: `npm run dev`
2. Gå till Contact-sidan
3. Fyll i formuläret och skicka
4. Kontrollera att du får email

## Felsökning

**Problem:** "EmailJS is not configured"
- Kontrollera att `.env`-filen finns och innehåller alla tre variabler
- Starta om Vite dev-servern efter att ha lagt till `.env`-variabler

**Problem:** Email skickas inte
- Kontrollera att Service ID, Template ID och Public Key är korrekta
- Kontrollera EmailJS Dashboard för eventuella fel
- Kontrollera browser console för detaljerade felmeddelanden

**Problem:** Formulär validerar inte
- Kontrollera att alla required-fält är ifyllda
- Kontrollera att privacy policy checkbox är ikryssad

**Problem med Loopia SMTP:**
- **Port 587 fungerar inte:** Prova port 465 med SSL istället
- **"Authentication failed":** Kontrollera att du använder fullständig email-adress (t.ex. `kontakt@dindomän.se`) som username
- **"Connection timeout":** Kontrollera att SMTP-servern är korrekt (`smtp.loopia.se` eller `mail.loopia.se`)
- **Kontrollera Loopia's SMTP-inställningar:** Logga in på Loopia's kundportal och kontrollera SMTP-inställningar för din domän
- **Testa SMTP-inställningar:** Du kan testa SMTP-inställningarna i EmailJS Dashboard under "Test Service"


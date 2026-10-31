# 🏫 School Register – GitHub Pages + GAS API

Frontend: **GitHub.io** (static HTML)  
Backend: **Google Apps Script** + **Google Sheets**

---

## ફોલ્ડર સ્ટ્રક્ચર

```
GitHub_GAS_School/
├── index.html          ← લોગિન
├── register.html       ← રજિસ્ટર
├── home.html           ← લોગિન પછી
├── css/style.css
├── js/
│   ├── config.js       ← ★ GAS URL અહીં
│   └── api.js
├── gas/
│   └── Code.gs         ← Apps Script API
└── README.md
```

---

## ભાગ 1: Google Apps Script API સેટઅપ

1. [script.google.com](https://script.google.com) → **New project**
2. `Code.gs` ખોલો → બધું ડિલીટ → `gas/Code.gs` ની કન્ટેન્ટ પેસ્ટ → **Save**
3. **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. **Deploy** → **Web App URL** કોપી કરો  
   ઉદા: `https://script.google.com/macros/s/AKfycbxxxx/exec`
5. પહેલી વાર URL બ્રાઉઝરમાં ખોલો → Google પરવાનગી (Drive/Sheets) **Allow** કરો

### API ટેસ્ટ (બ્રાઉઝર/Postman)

POST body (raw text):
```json
{"action":"ping"}
```

જવાબ: `{"ok":true,"msg":"API OK",...}`

---

## ભાગ 2: GitHub Pages

1. [github.com](https://github.com) → **New repository**  
   નામ ઉદા: `school-register` (Public)
2. આ ફોલ્ડરની ફાઇલો અપલોડ ( `gas/` વગર પણ ચાલે – GAS અલગ છે)
3. **`js/config.js`** ખોલો અને URL મૂકો:

```javascript
var GAS_API_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
```

4. Repo → **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)`
   - Save
5. 1–2 મિનિટ પછી સાઇટ:
   ```
   https://YOUR_USERNAME.github.io/school-register/
   ```

---

## ઉપયોગ

| પેજ | URL | કામ |
|-----|-----|-----|
| લોગિન | `/` અથવા `index.html` | મોબાઇલ + પાસવર્ડ |
| રજિસ્ટર | `register.html` | નવી શાળા + નવી Sheet |
| હોમ | `home.html` | લોગિન પછી માહિતી |

### રજિસ્ટર પછી Google Driveમાં

- **School_Register_Master** – બધી શાળાઓની યાદી  
- **School_{UDISE}_{નામ}** – દરેક શાળાની અલગ Sheet  

---

## API actions

| action | પેરામીટર | વર્ણન |
|--------|----------|--------|
| `ping` | — | API ચાલે છે કે નહીં |
| `register` | schoolName, mobile, udise, email, password | નવી શાળા |
| `login` | mobile, password | લોગિન |
| `info` | mobile | શાળા માહિતી |

---

## મહત્વની નોંધ

1. **GAS_API_URL** વગર frontend કામ નહીં કરે  
2. Web App access **Anyone** હોવું જોઈએ  
3. Code.gs બદલ્યા પછી **New version** Deploy કરો  
4. iframe sandbox warning Consoleમાં આવે તો અવગણો (GitHub પર લાગુ નથી)  
5. પાસવર્ડ ડેમો માટે plain text છે – પ્રોડક્શનમાં hash કરો  

---

## ટ્રબલશૂટિંગ

| સમસ્યા | ઉકેલ |
|--------|------|
| config.js error | GAS_API_URL સેટ કર્યો? |
| CORS / failed fetch | Access = Anyone, New version deploy |
| register fail permission | script.google.com પર એક વાર URL ખોલી Allow કરો |
| ખોટો JSON | Deploy URL `/exec` પર સમાપ્ત થાય? |

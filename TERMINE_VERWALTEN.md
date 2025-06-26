# 📅 Termine und Aufzeichnungen verwalten

## ✅ **Automatische Features**: 
- ✨ **Neue Dateien werden sofort angezeigt**
- 🤖 **Vergangene Termine werden automatisch zu Aufzeichnungen migriert**
- 📅 **Nur zukünftige Termine werden in "Veranstaltungen" angezeigt**
- 💾 **Beispiel-Template ist immer verfügbar (auskommentiert)**

---

## 🤖 **Automatische Migration**

### Wie es funktioniert:
1. **Täglich um 02:00 UTC** prüft ein automatischer Job vergangene Termine
2. **Vergangene Events** werden automatisch in `_recordings/` als Markdown-Dateien erstellt
3. **YouTube-Video** kann nachträglich hinzugefügt werden
4. **Originaldaten** bleiben in der Event-Datei (für Referenz)

### Manuell triggern:
Gehen Sie zu **GitHub Repository → Actions → "Auto-migrate past events"** und klicken Sie "Run workflow"

---

## 📹 **Neue Aufzeichnung hinzufügen**

### 1. Neue Datei erstellen:
**Pfad**: `_recordings/dateiname.md`

### 2. Template verwenden:
```yaml
---
title: "Titel der Aufzeichnung"
date: 2025-01-15  # Datum im Format YYYY-MM-DD
presenter: "Name des Präsentators"
youtube_id: "dQw4w9WgXcQ"  # YouTube Video ID (ohne https://...)
description: "Kurze Beschreibung für die Übersicht"
tags: ["Power Apps", "Grundlagen"]  # Tags für Filterung
category: "Entwicklung & Deployment"  # Kategorie
---

Hier kommt der ausführliche Inhalt der Beschreibung...

- Was wird behandelt?
- Für wen ist es geeignet?
- Was lernt man?
```

### 3. **Tags und Kategorien**:

**Verfügbare Tags:**
- `Power Apps`, `Power Automate`, `Power BI`, `Copilot Studio`
- `Governance`, `ALM`, `AI`, `Dataverse`, `Fabric`
- `Grundlagen`, `Advanced`

**Kategorien-Beispiele:**
- `"AI & Machine Learning"`
- `"Entwicklung & Deployment"`
- `"Daten & Analytics"`
- `"Governance & Compliance"`
- `"AI & Automation"`

### 3. YouTube Video ID finden:
- YouTube URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ` (der Teil nach `v=`)

---

## 📅 **Zukünftige Termine hinzufügen**

### 1. Datei bearbeiten:
**Pfad**: `_data/upcoming_events.yml`

### 2. Neuen Termin hinzufügen:
```yaml
- title: "Titel der Veranstaltung"
  date: "2025-02-15"  # Format: YYYY-MM-DD
  time: "10:00 - 11:30"
  presenter: "Name des Präsentators"
  description: "Beschreibung was behandelt wird..."
  registration_link: "https://link-zur-anmeldung.com"
  status: "Anmeldung offen"  # Optionen: "Anmeldung offen", "Bald verfügbar", "Planung"
```

---

## 🎨 **Status-Optionen für Termine**:

- **"Anmeldung offen"** = Grün + Anmelde-Button
- **"Bald verfügbar"** = Gelb  
- **"Planung"** = Orange

---

## 🚀 **Workflow**:

1. **Datei erstellen/bearbeiten** (siehe oben)
2. **Git commit + push**:
   ```bash
   git add .
   git commit -m "Neue Aufzeichnung: [Titel] hinzugefügt"
   git push origin main
   ```
3. **Warten** (2-3 Minuten) 
4. **Fertig!** ✅ Automatisch auf der Website sichtbar

---

## 📝 **Beispiele**:

### Aufzeichnung ohne Video (noch nicht verfügbar):
```yaml
---
title: "Kommende Session"
date: 2025-01-15
presenter: "Max Mustermann"
youtube_id: ""  # Leer lassen
description: "Beschreibung..."
---
```

### Termin bearbeiten (z.B. von Planung zu Anmeldung offen):
```yaml
# Einfach den Status ändern:
status: "Anmeldung offen"
registration_link: "https://anmeldung.link"
```

---

## ⚡ **Pro-Tipps**:

- **Dateinamen**: Verwenden Sie sprechende Namen wie `power-automate-grundlagen.md`
- **Sortierung**: Aufzeichnungen werden automatisch nach Datum sortiert (**neueste oben** ⬆️)
- **Tags**: Verwenden Sie konsistente Tags für bessere Filterung
- **Farben**: Tags haben automatische Farben (konfigurierbar in `_config.yml`)
- **Termine**: Zukünftige Termine werden in der Reihenfolge der YAML-Datei angezeigt
- **Bilder**: Können in `assets/images/` gespeichert und verlinkt werden

## 🎯 **Filter-Features**:

- **🔍 Suchfunktion**: Durchsucht Titel, Beschreibung und Präsentator
- **📂 Kategorie-Filter**: Filtert nach Themenbereichen
- **🏷️ Tag-Filter**: Filtert nach spezifischen Tags
- **📅 Automatische Sortierung**: Neueste Aufzeichnungen zuerst
- **🎨 Farbkodierung**: Jeder Tag hat seine eigene Farbe

Alles funktioniert **vollautomatisch** - Sie müssen nur die Dateien erstellen! 🎉

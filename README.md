# MegaEinfa.ch - Jekyll GitHub Page

Eine Jekyll-basierte Website für Power Platform-Schulungen und Aufzeichnungen.

## Installation

1. Repository klonen:
```bash
git clone [your-repository-url]
cd megaeinfa
```

2. Dependencies installieren:
```bash
bundle install
```

3. Lokal starten:
```bash
bundle exec jekyll serve
```

Die Website ist dann unter `http://localhost:4000` erreichbar.

## Deployment auf GitHub Pages

1. Repository auf GitHub erstellen
2. Code pushen
3. In den Repository-Einstellungen unter "Pages" die Quelle auf "GitHub Actions" setzen
4. Die GitHub Action wird automatisch ausgeführt und die Seite deployed

## Struktur

- `_config.yml` - Jekyll-Konfiguration
- `_layouts/` - HTML-Templates
- `_recordings/` - Aufzeichnungen als Markdown-Dateien
- `assets/` - CSS, JavaScript und Bilder
- `index.html` - Startseite

## Neue Aufzeichnungen hinzufügen

Erstellen Sie eine neue Markdown-Datei in `_recordings/` mit folgendem Format:

```yaml
---
title: "Titel der Aufzeichnung"
date: YYYY-MM-DD
presenter: "Name des Präsentators"
youtube_id: "YouTube-Video-ID"
description: "Kurze Beschreibung"
---

Detaillierte Beschreibung des Inhalts...
```

## Anpassungen

- Design-Änderungen: `assets/css/main.css`
- JavaScript: `assets/js/main.js`
- Layout-Änderungen: `_layouts/`
- Konfiguration: `_config.yml`

## Support

Bei Fragen wenden Sie sich an: kontakt@thepoweraddicts.com

## 🔄 Automatisierung

Die Seite verfügt über **automatische Event-Synchronisation** mit einer Azure Logic App:

- **📅 Täglich**: Automatische Prüfung auf neue Events
- **🔗 Integration**: Verbindung zu Azure Logic App
- **📝 Auto-Update**: Neue Events werden automatisch hinzugefügt
- **🔍 Duplikat-Schutz**: Verhindert doppelte Einträge

➡️ **[Vollständige Automatisierung-Dokumentation](./AUTOMATION.md)**

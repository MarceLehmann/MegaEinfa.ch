# Deployment Guide für GitHub Pages

## Schritt-für-Schritt Anleitung

### 1. GitHub Repository erstellen
1. Auf GitHub.com ein neues Repository erstellen
2. Repository-Name kann beliebig sein (z.B. `megaeinfa-website`)
3. Repository auf "Public" setzen (für kostenlose GitHub Pages)

### 2. Code hochladen
```bash
# Im Projekt-Verzeichnis
git init
git add .
git commit -m "Initial commit: Jekyll website for MegaEinfa.ch"
git branch -M main
git remote add origin https://github.com/IhrBenutzername/IhrRepositoryName.git
git push -u origin main
```

### 3. GitHub Pages aktivieren
1. In den Repository-Einstellungen (Settings)
2. Zu "Pages" navigieren
3. Source auf "GitHub Actions" setzen
4. Die GitHub Action wird automatisch ausgeführt

### 4. Custom Domain einrichten (optional)
1. Eine `CNAME` Datei im Repository-Root erstellen
2. Domain in der Datei eintragen (z.B. `megaeinfa.ch`)
3. DNS-Einstellungen bei Ihrem Domain-Provider konfigurieren

### 5. Lokal testen vor Deployment
```bash
# Dependencies installieren
bundle install

# Lokal starten
bundle exec jekyll serve

# Website unter http://localhost:4000 testen
```

## Automatisches Deployment

Die GitHub Action (`.github/workflows/jekyll.yml`) wird automatisch ausgeführt bei:
- Push auf den `main` Branch
- Pull Requests

## Troubleshooting

### Häufige Probleme:
1. **Build-Fehler**: Überprüfen Sie die GitHub Actions Logs
2. **CSS/JS nicht geladen**: Prüfen Sie die `baseurl` in `_config.yml`
3. **404-Seite**: Domain-Einstellungen überprüfen

### Useful Links:
- [GitHub Pages Dokumentation](https://docs.github.com/en/pages)
- [Jekyll Dokumentation](https://jekyllrb.com/docs/)
- [GitHub Actions für Jekyll](https://github.com/marketplace/actions/jekyll-actions)

# 🚀 GitHub Actions Deployment Guide

## Problem: Actions erscheinen nicht auf GitHub

### 📋 Checkliste

#### 1. Repository Setup
- [ ] Repository ist auf GitHub erstellt
- [ ] Lokale Dateien sind committed und gepusht
- [ ] Branch ist `main` oder `master`

#### 2. GitHub Actions Aktivierung
- [ ] Repository → Settings → Actions → General
- [ ] "Allow all actions and reusable workflows" ist ausgewählt
- [ ] Workflow permissions: "Read and write permissions" aktiviert

#### 3. Dateien Status
- [ ] `.github/workflows/` Ordner existiert
- [ ] YAML-Dateien sind korrekt benannt (`.yml` oder `.yaml`)
- [ ] Dateien sind ins Repository gepusht

---

## 🔧 Sofort-Lösung

### Schritt 1: Repository prüfen
```bash
# Im lokalen Repository-Ordner:
git status
git add .
git commit -m "Add GitHub Actions workflows"
git push origin main
```

### Schritt 2: GitHub Repository Einstellungen
1. Gehe zu: `https://github.com/[USERNAME]/[REPOSITORY]/settings/actions`
2. Unter "Actions permissions":
   - ✅ "Allow all actions and reusable workflows"
3. Unter "Workflow permissions":
   - ✅ "Read and write permissions"
   - ✅ "Allow GitHub Actions to create and approve pull requests"

### Schritt 3: Actions Seite aufrufen
- Gehe zu: `https://github.com/[USERNAME]/[REPOSITORY]/actions`
- Du solltest jetzt die Workflows sehen

---

## 🧪 Test-Workflow

Ich habe eine **Test-Action** erstellt (`test-action.yml`):

### Was sie macht:
- ✅ Läuft bei manuellem Start
- ✅ Läuft automatisch bei Push
- ✅ Testet grundlegende Funktionalität
- ✅ Zeigt Repository-Informationen

### So verwendest du sie:
1. **Push** alle Dateien zu GitHub
2. Gehe zu **Actions** Tab
3. Wähle **"Test Action"**
4. Klicke **"Run workflow"**

---

## 🔍 Troubleshooting

### Problem: "Actions" Tab fehlt
**Lösung:** Repository ist privat → Settings → Features → Actions aktivieren

### Problem: Workflows werden nicht angezeigt
**Lösung:** 
1. Prüfe YAML-Syntax mit [YAML Validator](https://www.yamllint.com/)
2. Stelle sicher, dass Dateien in `.github/workflows/` liegen
3. Push den `main`/`master` Branch

### Problem: "workflow_dispatch" funktioniert nicht
**Lösung:**
1. Workflow muss mindestens einmal erfolgreich gelaufen sein
2. Branch muss der Standard-Branch sein
3. Permissions müssen korrekt sein

### Problem: Permission denied beim git push
**Lösung:**
- Repository Settings → Actions → General
- Workflow permissions: "Read and write permissions"

---

## 📝 Manuelle Verifizierung

### 1. Lokale Dateien prüfen:
```bash
ls -la .github/workflows/
# Sollte zeigen:
# auto-fetch-events.yml
# test-action.yml
```

### 2. YAML-Syntax prüfen:
```bash
# Installiere yamllint (optional)
pip install yamllint
yamllint .github/workflows/*.yml
```

### 3. Git Status prüfen:
```bash
git log --oneline -5
# Sollte Commits mit Workflow-Dateien zeigen
```

---

## ✅ Erfolg-Indikatoren

Nach korrektem Setup solltest du sehen:

1. **Actions Tab** ist sichtbar auf GitHub
2. **Workflows** sind in der Liste:
   - "Auto-Fetch Events from Logic App"
   - "Test Action"
3. **"Run workflow"** Button ist verfügbar
4. **Scheduled runs** werden angezeigt (täglich um 8:00 UTC)

---

## 🚨 Häufige Fehler

### YAML-Syntax Fehler
```yaml
# ❌ Falsch:
on:
workflow_dispatch:

# ✅ Richtig:
on:
  workflow_dispatch:
```

### Falsche Datei-Endung
```bash
# ❌ Falsch:
auto-fetch-events.yaml

# ✅ Richtig:
auto-fetch-events.yml
```

### Fehlende Permissions
```yaml
# ✅ Füge hinzu:
permissions:
  contents: write
```

---

## 📞 Support

Wenn Actions immer noch nicht erscheinen:

1. **Prüfe Repository URL**: `https://github.com/[USER]/[REPO]/actions`
2. **Browser-Cache leeren** und neu laden
3. **Incognito-Modus** testen
4. **GitHub Status** prüfen: [status.github.com](https://status.github.com)

---

**💡 Tipp**: Der Test-Workflow sollte sofort funktionieren und dir zeigen, ob das grundsätzliche Setup korrekt ist!

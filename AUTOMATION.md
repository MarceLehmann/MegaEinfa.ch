# 🔄 Automatische Event-Synchronisation

Diese GitHub Page ist mit einer Azure Logic App verbunden, die automatisch neue Events synchronisiert.

## 🚀 Wie es funktioniert

### 1. Tägliche Synchronisation
- **Zeitplan**: Jeden Tag um 8:00 UTC (10:00 CEST)
- **Automatisch**: Läuft ohne manuellen Eingriff
- **Manuell**: Kann auch manuell über GitHub Actions ausgelöst werden

### 2. Datenfluss

```
Azure Logic App → GitHub Action → YAML-Datei → Jekyll → Website
```

1. **Logic App Aufruf**: HTTP GET Request an Ihren Azure Logic App Endpoint
2. **Response Parsing**: Verarbeitung der JSON-Response mit "New" und "Old" Events
3. **Event Konvertierung**: Transformation in Jekyll-kompatibles YAML-Format
4. **Duplikat-Prüfung**: Verhindert doppelte Events
5. **Auto-Commit**: Automatischer Commit und Push zur Website

### 3. Response Format

Die Logic App sollte folgendes JSON-Format zurückgeben:

```json
{
  "New": [
    {
      "title": "\"MegaEinfa.ch - PowerPlatform erklärt\" - AI mit der PowerPlatform nutzen",
      "date": "2024-02-24T00:00:00Z",
      "presenter": "Michael Megel",
      "description": "Beschreibung des Events...",
      "linkedin": "https://www.linkedin.com/in/michael-megel/"
    }
  ],
  "Old": [...]
}
```

### 4. Event Transformation

Neue Events werden automatisch transformiert:

- **Titel**: Entfernt Prefix "MegaEinfa.ch - PowerPlatform erklärt"
- **Datum**: Konvertiert ISO-Datum zu YYYY-MM-DD
- **Zeit**: Standard "10:00 - 11:30" (anpassbar)
- **LinkedIn**: Verwendet LinkedIn-URL aus JSON oder generiert Fallback aus Name
- **Zeit**: Verwendet Zeit aus JSON oder Standard "10:00 - 11:30"
- **Status**: Verwendet Status aus JSON oder Standard "Bald verfügbar"
- **Registration**: Verwendet Link aus JSON oder Placeholder-Link

## 🛠️ Konfiguration

### GitHub Secrets (optional)
Aktuell nutzt die Action das Standard `GITHUB_TOKEN`. Für erweiterte Funktionen können Sie zusätzliche Secrets hinzufügen:

- `LOGIC_APP_URL`: Alternative Logic App URL
- `NOTIFICATION_WEBHOOK`: Webhook für Benachrichtigungen

### Action anpassen

Die Action ist in `.github/workflows/auto-fetch-events.yml` konfiguriert:

```yaml
# Zeitplan ändern (aktuell täglich 8:00 UTC)
on:
  schedule:
    - cron: '0 8 * * *'  # Minute Stunde Tag Monat Wochentag
```

**Beispiele:**
- `'0 */6 * * *'` - Alle 6 Stunden
- `'0 9 * * 1'` - Jeden Montag 9:00 UTC
- `'30 7 * * 1-5'` - Werktags 7:30 UTC

## 🔍 Monitoring

### Action Status prüfen
1. GitHub Repository → Actions Tab
2. Workflow "Auto-Fetch Events from Logic App"
3. Letzter Run zeigt Status und Logs

### Logs verstehen
- `🔄 Fetching events...` - Startet HTTP Request
- `📥 Response from Logic App` - Zeigt JSON Response
- `✅ Neue Events gefunden!` - Events werden verarbeitet
- `ℹ️ Keine neuen Events` - Keine Action erforderlich
- `🎉 Erfolgreich abgeschlossen!` - Events hinzugefügt

### Fehlerbehebung

**Häufige Probleme:**

1. **Logic App antwortet nicht**
   - Prüfen Sie die URL und Permissions
   - Logs zeigen HTTP-Fehler

2. **JSON Parse Fehler**
   - Logic App Response ist nicht valides JSON
   - Prüfen Sie das Response-Format

3. **Duplikate werden nicht erkannt**
   - Titel oder Datum unterscheiden sich minimal
   - Prüfen Sie die String-Vergleiche

4. **Git Push schlägt fehl**
   - GitHub Token Permissions prüfen
   - Repository-Einstellungen kontrollieren

## 🎯 Erweiterte Features

### Custom Logic App Response
Erweitern Sie das JSON um zusätzliche Felder:

```json
{
  "New": [
    {
      "title": "Event Title",
      "date": "2024-02-24T00:00:00Z",
      "presenter": "Name",
      "description": "Description",
      "linkedin": "https://www.linkedin.com/in/presenter-name/", // LinkedIn-URL aus Logic App
      "time": "14:00 - 15:30",        // Optionale Zeit
      "registration_link": "https://", // Optionaler Anmelde-Link
      "status": "Anmeldung offen"     // Optionaler Status
    }
  ]
}
```

### Notification Integration
Fügen Sie Webhook-Benachrichtigungen hinzu (Teams, Slack, etc.):

```yaml
- name: Send notification
  if: steps.fetch-events.outputs.has_new_events == 'true'
  run: |
    curl -X POST "${{ secrets.TEAMS_WEBHOOK }}" \
      -H "Content-Type: application/json" \
      -d '{"text": "🎉 Neue Events auf MegaEinfa.ch hinzugefügt!"}'
```

## 📧 Newsletter-Integration

Die Newsletter-Anmeldung ist mit einer Azure Logic App verbunden:

### Funktionalität:
- **Validierung**: E-Mail-Format wird clientseitig geprüft
- **POST Request**: Daten werden an Azure Logic App gesendet
- **Feedback**: Benutzer erhält sofortiges visuelles Feedback
- **Error Handling**: Robuste Fehlerbehandlung bei Verbindungsproblemen

### Datenformat:
```json
{
  "email": "user@example.com",
  "timestamp": "2025-06-27T10:00:00.000Z",
  "source": "megaeinfa.ch"
}
```

### UI-Features:
- Loading-State während der Übertragung
- Toast-Notifications für Erfolg/Fehler
- Automatisches Form-Reset bei Erfolg
- Responsive Design

---

**💡 Tipp**: Testen Sie die Action zunächst manuell über den "Run workflow" Button in GitHub Actions, bevor Sie auf den automatischen Zeitplan vertrauen!

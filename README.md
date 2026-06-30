# Lieferantenvergleich – Materialpreise

Eine eigenständige Anwendung zum Vergleich von Materialpreisen bei Baustoffhändlern.
Keine Installation nötig – die App läuft lokal im Browser.

## Starten

**Einfachste Variante:** Datei `index.html` doppelklicken (öffnet sich im Standardbrowser).

Falls die Beispieldaten dabei nicht geladen werden (manche Browser blockieren
lokale Skripte), die App stattdessen über einen kleinen lokalen Server öffnen:

```
cd "Pfad/zum/Ordner/Lieferantenvergleich"
python3 -m http.server 8777
```

Dann im Browser **http://localhost:8777/index.html** aufrufen.

## Desktop-App (Windows & Mac)

Die App lässt sich auch als installierbares Desktop-Programm (Electron) bauen –
mit **Update-Prüfung** beim Start und über den Button *Einheiten → Version & Updates
→ „Nach Update suchen"*. Sie läuft vollständig offline; nur die Update-Prüfung
fragt online die neueste Version bei GitHub ab.

### Einmalige Einrichtung
1. **GitHub-Repo anlegen** (am besten **öffentlich**, damit die Update-Prüfung
   ohne Login funktioniert) und diesen Ordner hineinlegen.
2. Den eigenen GitHub-Pfad an **zwei** Stellen eintragen:
   - in `index.html`: Konstante `GITHUB_REPO` (z. B. `"meinname/Lieferantenvergleich"`)
   - in `package.json` unter `build.publish`: `owner` und `repo`

### Lokal testen
```
npm install
npm start
```

### Installer bauen & veröffentlichen
1. Version erhöhen in `package.json` (`"version"`).
2. Commit + Tag pushen, z. B.:
   ```
   git tag v1.0.1
   git push origin v1.0.1
   ```
3. Die **GitHub Action** (`.github/workflows/release.yml`) baut automatisch den
   **Windows-Installer (.exe)** und den **Mac-Installer (.dmg)** und hängt sie an
   das GitHub-Release des Tags an. Von dort laden die Nutzer herunter.

Beim nächsten Start (oder per Button) erkennen installierte Apps die neue Version
und bieten den Download an.

> Hinweis: Die Installer sind **nicht code-signiert**. Beim ersten Öffnen erscheint
> daher eine Warnung – Mac: Rechtsklick → „Öffnen"; Windows: „Weitere Informationen
> → Trotzdem ausführen". Für warnungsfreie Installer + vollautomatisches Update
> wären kostenpflichtige Zertifikate nötig (späteres Upgrade möglich).

## Funktionen

- **Vergleich** – Alle Artikel werden allen Firmen gegenübergestellt. Der
  **günstigste** Preis ist grün, der **teuerste** rot markiert; Spalte „Ersparnis"
  zeigt die Differenz. Ein Preis, der **älter als 1 Jahr** ist, gilt nicht als
  günstigster, solange ein anderer Lieferant einen aktuelleren Preis hat (er wird
  dann als „veraltet" gekennzeichnet); erst wenn es gar keinen aktuellen Preis
  gibt, zählt wieder der niedrigste. Unter jedem Preis steht das **Datum (Stand)** des Preises –
  veraltete Preise (älter als der eingestellte Zeitraum) werden dabei bernsteinfarben
  hervorgehoben. Klick auf einen Preis öffnet dessen Historie.
  Über die **Checkbox vor jedem Material** lassen sich mehrere Artikel markieren;
  in der eingeblendeten Aktionsleiste können sie dann gemeinsam **verschoben**
  (einer anderen Kategorie zugeordnet) oder **gelöscht** werden.
  Hat ein Lieferant für einen Artikel noch keinen Preis, steht in der Zelle
  **„+ Preis hinterlegen"** – ein Klick erfasst Preis und Datum direkt (legt bei
  Bedarf das Angebot für diesen Lieferanten automatisch an), die Ansicht bleibt
  dabei erhalten. In jeder
  Untergruppen-Überschrift gibt es zudem eine Checkbox, die **alle Artikel dieser
  einen Untergruppe** auf einmal markiert (nicht darüber hinaus).
  Filter nach Kategorie, Suche nach Artikel/Artikelnummer, optional nur Artikel
  mit mindestens zwei Lieferanten. Die Artikel sind in grobe Überbegriffe
  zusammengefasst (siehe unten), nach denen sich filtern lässt.
  Mit dem Umschalter **Auto / 📋 Tabelle / 🗂 Karten** (rechts in der Filterleiste)
  wählst du die Darstellung: „Auto" passt sich automatisch an die Bildschirmbreite
  an (PC/Tablet → Tabelle, Smartphone → Karten). In der **Kartenansicht** wird
  je Artikel eine Karte mit allen Händlern untereinander gezeigt – der günstigste
  Anbieter ist grün markiert (✓ günstigster), bei den übrigen steht der **Aufpreis
  gegenüber dem günstigsten** in € und %. So ist der Händler-Vergleich auf einen
  Blick erfassbar. Die App ist durchgängig responsiv.
- **Artikel** – Artikel anlegen/bearbeiten und je Firma ein Angebot
  (Artikelnummer + Einheit + Preis) hinterlegen. Hat ein Lieferant noch keinen
  Preis, erscheint die Schaltfläche **„+ Preis hinterlegen"** – ein Klick öffnet
  direkt den Dialog zum Erfassen von Preis und Datum für genau diesen Lieferanten;
  der Artikel bleibt danach aufgeklappt. Standardmäßig als kompakte
  **Liste** (eine Zeile je Artikel mit Lieferantenzahl und „ab"-Preis; per Klick
  aufklappbar zum Verwalten der Angebote) – per Umschalter **☰ Liste / 🗂 Karten**
  auch als Kartenansicht. Wird eine Kategorie gewählt, greift dieselbe
  Untergliederung wie im Vergleich (Unterkategorie-Dropdown, Gruppierung nach
  Nennweite/Bauteiltyp, bei Kanalrohren die aufklappbaren Bereiche PVC-KG / KG 2000).
- **Preishistorie** – Jeder Preis pro Artikel und Firma wird mit Datum erfasst.
  „+ Preis" legt einen neuen Eintrag an; alte Werte bleiben erhalten und sind
  jederzeit abrufbar (inkl. Veränderung in € und %).
- **Lieferanten** – Firmen anlegen/bearbeiten/löschen; ebenfalls als kompakte
  **Liste** (Standard) oder **Karten** (Umschalter ☰ Liste / 🗂 Karten).
  Über **📄 Preisanfrage** je Lieferant entsteht ein druckbares PDF (Browser-Dialog
  „Als PDF sichern") mit allen Artikeln dieses Lieferanten – Artikelnummer,
  Bezeichnung und Einheit, nach Kategorie gruppiert, **ohne Preise**, mit einer
  leeren Spalte „Neuer Preis" zum Ausfüllen. Ideal, um Lieferanten per Mail um
  aktualisierte Preise zu bitten.
- **Einheiten / Einstellungen** – Liste der Einheiten (Stk., Rolle, m, Sack, …)
  jederzeit erweiterbar; dort lässt sich auch einstellen, ab welchem Alter ein
  Preis als veraltet gilt (Standard: 6 Monate).

## Komfortfunktionen

- **Darstellung (Auto / Hell / Dunkel)** – oben rechts umschaltbar; „Auto" folgt
  der Systemeinstellung. Dark Mode für die Augen am Abend.
- **Geräte-Vorschau (Auto / Handy / Tablet / Desktop)** – Leiste unten rechts.
  Zeigt die App in der jeweiligen Gerätebreite (skaliert eingepasst), um zu
  prüfen, wie sie auf Handy, Tablet oder Desktop aussieht. „Auto" zeigt die
  normale Anwendung. Funktioniert zuverlässig, wenn die App über den lokalen
  Server geöffnet wird (siehe oben).
- **Veraltete Preise** – Preise, deren „Stand" älter als der eingestellte
  Zeitraum (Standard 6 Monate) ist, werden mit ⚠ markiert. Über die Statistik
  und den Filter „nur veraltete Preise" siehst du sofort, was nachgepflegt
  werden sollte.

## Kategorien (Überbegriffe)

Die ~200 Einzelbezeichnungen sind zu groben, praxisnahen Überbegriffen
zusammengefasst (über Schlüsselwörter automatisch zugeordnet):

- **Kanalrohre & Formstücke** – KG-/KG2000-/HT-Rohre, Bögen, Abzweiger, Muffen,
  Reduzierungen, Reinigungsrohre, Verschlussdeckel, Rückstauverschlüsse, Steinzeug-Übergänge
- **Drainage & Dränage** – Drän-/Drainagerohre, Kokosrohr, opti-drän / opti-control-Schächte
- **Schächte & Schachtbauteile** – Schachtringe/-konus/-böden/-abdeckungen, SX400, AWA-Schacht, Lichtschächte
- **Abdichtung, Folien & Noppenbahnen** – PE-Folien, Noppenbahnen, Delta-/Nevobahn, Bitumen, Dickbeschichtung
- **Vliese & Geogitter** – Geotextil-/Filter-/Unkrautvliese, Geogitter (Tensar, Begrid, BETEX)
- **Bordsteine, Pflaster & Einfassungen** – Tief-/Hoch-/Rundbord, Randsteine, BASALTIN, Pflaster, Fugenband
- **Beton, Zement & Mörtel** – Zement, Estrich, Mörtel, Trocken-/Schnellbeton, Betonstahlmatten
- **Erdung & Blitzschutz** – V4A-Ringerder, Erdungsbänder, Runddraht
- **Kabelschutz** – Kabuflex-Rohre & -Muffen, Kabelzugdraht
- **Zubehör & Hilfsmittel** – Gleitmittel, Handschuhe, Schlauchverbinder, Brunnenschaum
- **Verpackung, Fracht & Service** – Paletten, Gitterboxen, Anfuhr, Maut, Vorfracht, Kran-/Lieferservice

Beim Anlegen/Bearbeiten eines Artikels werden Kategorie **und Unterkategorie**
automatisch aus der Bezeichnung erkannt; beide lassen sich im Formular auch manuell
festlegen. Zusätzlich kann im **Vergleich** ein **Klick/Tipp auf den Artikelnamen**
den Artikel direkt einer anderen (Unter-)Kategorie zuordnen. Unter
*Einheiten → Einstellungen* zeigt eine **Kategorien-Übersicht** alle Kategorien
mit Anzahl Artikel und Unterkategorien.

### Unterkategorien (zweite Ebene)

Sobald eine Kategorie gewählt ist (im **Vergleich** wie auch im **Artikel**-Tab),
erscheint ein zweites Dropdown **Unterkategorie** und die Liste wird gruppiert.
Die Untergruppen sind **aufklappbare Menüs, die zunächst zugeklappt sind** – per
Klick auf die Überschrift öffnet bzw. schließt sich die jeweilige Gruppe:

- **Kanalrohre & Formstücke** → zuerst nach **Rohrsystem** in zwei aufklappbaren
  Bereichen **PVC-KG** und **KG 2000**, darin jeweils nach **Nennweite** (DN 100,
  DN 125, DN 150 …). Rückstau-Geräte stehen unter „Sonstiges".
- **Kabelschutz** → nach **Nennweite** (DN 100, DN 125, DN 150 …).
  KG/HT-Rohre werden nominal über den **Außendurchmesser** benannt (110, 160, 315 …),
  gearbeitet wird aber mit dem **Innendurchmesser**. Beide Bezeichnungen desselben
  Rohrs werden deshalb zusammengefasst: **110 → DN 100**, **160 → DN 150**,
  **315 → DN 300** (sowie 75 → DN 70, 90 → DN 80).
- **Schächte** → Schachtringe, -konus, -böden, -abdeckungen, Lichtschächte, Systeme (SX400/AWA) …
- **Drainage** → Dränrohre, Dränage-Schächte, Formteile
- **Abdichtung** → Folien, Noppenbahnen, Dränbahnen, Bitumen & Beschichtung
- **Vliese & Geogitter** → Geotextil-, Filter-, Unkraut-/Wurzelvliese, Geogitter
- **Bordsteine** → Tiefborde, Hoch-/Rundborde, Randsteine, Pflaster
- **Beton/Zement/Mörtel** → Zement, Estrich, Mörtel, Beton, Bewehrung
- … (jede Hauptkategorie hat passende Unterteilungen)

### Bauteil-Reihenfolge bei Kanalrohren

Innerhalb der Kanalrohr-Gruppen sind die Artikel fachlich sortiert: zuerst
**Rohre/Meterware** (nach Länge kurz→lang), dann **Bögen** (nach Grad klein→groß),
danach Abzweiger, Überschiebmuffen, Deckel & Stopfen, Reduzierungen, Muffen,
Übergänge und zuletzt Sonderstücke (Reinigungsrohre, Rückstauklappen).
Über den Button **⇅ Reihenfolge** (erscheint bei gewählter Kategorie „Kanalrohre")
lässt sich diese Reihenfolge in einem Menü per **Drag & Drop oder ▲▼** anpassen
und wird gespeichert.

## Daten & Sicherung

- Daten werden lokal im Browser gespeichert (localStorage). Es ist **keine**
  Internetverbindung nötig, die Daten verlassen den Rechner nicht.
- Oben rechts gibt es die Kachel **💾 Sichern / ↺ Wiederherstellen**:
  - **Sichern** schreibt eine `.json`-Sicherungsdatei.
  - **Wiederherstellen** lädt eine zuvor exportierte Datei zurück.

> Hinweis: Die Daten hängen am jeweiligen Browser/Rechner. Für ein Backup oder
> den Wechsel des Rechners die Export-Funktion nutzen.

## Datenmodell

| Begriff      | Bedeutung |
|--------------|-----------|
| Lieferant    | Firma (Bünder, Fassbender, Zaun, Henrich) |
| Artikel      | logischer Artikel = Name + Länge + Nennweite + Grad (+ Gewicht). Identisch über alle Firmen → ermöglicht den Vergleich |
| Angebot      | Verknüpfung Firma ↔ Artikel mit firmenspezifischer Artikelnummer und Einheit |
| Preis        | Eintrag der Preishistorie (Preis, Datum, Notiz). Der aktuellste Eintrag ist der gültige Preis |

## Beispieldaten neu erzeugen

Die Beispieldaten stammen aus der Excel-Preisliste und liegen in `seed.js`
(eingebettet) bzw. `seed.json` (lesbar). Neu erzeugen:

```
python3 build_seed.py
```

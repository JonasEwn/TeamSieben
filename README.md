#Portfolio TeamSieben

##Kurzbeschreibung:
Diese Readme-Datei enthält Informationen zur Verwendung unserer Trading-Webseite mit eigenen PortfolioItems. Die Webseite bietet die folgenden Funktionen:

- Kauf von Aktien mit Realtime-Preisen
- Anzeige der bereits erworbenen Aktien mit Gewinn/Verlust und Gesamtpreisen
- Detaillierte Ansicht zu individuellen Aktien (Durchschnittspreis, Erwerbsdaten)
- Benutzerverwaltung und Anmeldung mit Authentifizierung
- Individuelles Hinzufügen und Entfernen von Favoriten

##Hauptmodule:
- Konfiguration: Konfigurationen für grundlegende Authentifizierung und API-Kommunikation (BasicAuthenticationConfiguration, SwaggerFeignConfig).
- Domain: Entitäten, die die Hauptfunktionalitäten und Datenstrukturen der Anwendung repräsentieren, die die Geschäftslogik abbilden.
- Persistence: Schnittstellen für den Zugriff auf die Datenbank und die Verwaltung von Daten in der Datenbank.
- Service-Klassen: Geschäftslogik und Dienstverarbeitung und interagiert mit dem Domain- und Persistence-Modul.
- Web: Verarbeitung von Webanfragen. Stellt die RESTful API Endpunkte bereit und handhabt HTTP-Anfragen

##Voraussetzungen:
- Ein Webbrowser (Google Chrome)
- Eine Internetverbindung
- JDK 17
- NPM
- Node.js
- [Angular Material (für die Darstellung)](https://material.angular.io/components/categories)

##Installation:
Zunächst muss die Anwendung über unser [Git Repository](https://github.com/JonasEwn/TeamSieben/tree/new_master) heruntergeladen werden. Die vollständige Version ist im Branch "new_master" abrufbar. Der hintergelegte Link führt zu dem genannten Branch.

Gegebenenfalls muss beim erstmaligen Start der Anwendung ein Package Manager installiert werden. Dies kann über die Eingabe von "npm install" im Terminal erfolgen. Für dieses Projekt wurde die Version 10.2.3 verwendet. Um eine bestimmte Version herunterzuladen kann der Befehl "npm install -g npm<version>" genutzt werden.

##Start der Anwendung:
Um die Anwendung benutzerfreundlich zu starten, wurde die Batch File "start.bat" erstellt. Durch das Anklicken der Batch File wird das Portfolio TeamSieben automatisch gestartet und kann genutzt werden. Manuell kann das Programm über eine Entwicklungsumgebung wie beispielsweise Microsoft Visual Studio Code gestartet werden. Dazu müssen Front- und Backend gestartet werden. Die "TeamSiebenApplication.java" startet das Backend. Das Frontend muss über ein Terminal gestartet werden. Im Terminal muss zunächst über "cd frontend" auf das richtige Verzeichnis verwiesen werden. Danach kann das Frontend über den Befehl "ng serve" gestartet werden. Die Anwendung Portfolio TeamSieben ist somit bereit zur Anwendung.

##Verwendung:
Die Anwendung kann nun über einen Browser gestartet werden. Um auf die Anwendung zugreifen zu können, muss in die URL des Browsers "localhost:4200" eingeben werden. Nach dem man sich erfolgreich eingeloggt hat, können die genannten Funktionen genutzt werden. Über die eingerichteten Buttons und Reiter kann der Nutzer über die Webseite navigieren und die Funktionen ausführen.
Es wurden 2 Admin Konten angelegt, um sich anzumelden. Über diese Konten können weitere Benutzer registriert werden. 
Die Admin-Konten sind:
 1. Benutzername: john.doe, Passwort: mypassword
 2. Benutzername: testperson, Passwort: mypassword

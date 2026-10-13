# Wydr GPT — wersja JavaScript + opcjonalne AI

## Co działa
- Losuje 4 pytania z puli przy każdym otwarciu strony.
- Kliknięcie propozycji, tematów w menu, Enter i przycisku wysyłania uruchamiają odpowiedź.
- Bez serwera korzysta z lokalnej bazy wiedzy (gdy otworzysz `public/index.html` w zwykłej przeglądarce obsługującej JavaScript).
- Po uruchomieniu serwera i skonfigurowaniu klucza API odpowiedzi generuje model AI przez OpenAI Responses API.
- Klucz API jest przechowywany po stronie serwera, nie w HTML.

## Uruchomienie trybu AI na komputerze
Wymagany Node.js 20 lub nowszy.

1. Otwórz terminal w folderze projektu.
2. Uruchom `npm install`.
3. Skopiuj `.env.example` do pliku `.env`.
4. W pliku `.env` wpisz swój klucz API po `OPENAI_API_KEY=`. Nie udostępniaj tego pliku ani klucza publicznie. Używanie API może generować opłaty; klucz i konto powinien skonfigurować rodzic/opiekun.
5. Uruchom serwer z ustawionymi zmiennymi środowiskowymi. Przykład macOS/Linux:
   `export OPENAI_API_KEY='TWÓJ_KLUCZ'; npm start`
   Przykład Windows PowerShell:
   `$env:OPENAI_API_KEY='TWÓJ_KLUCZ'; npm start`
6. Otwórz `http://localhost:3000` w przeglądarce.

**Ważne:** samo otwarcie HTML jako podglądu pliku na telefonie nie uruchamia serwera AI. Żeby model działał dla innych osób w internecie, trzeba umieścić backend na serwerze hostingowym. Nie umieszczaj klucza API w kodzie strony.

## Diagnostyka
- Jeżeli przyciski nie działają, otwórz stronę przez `http://localhost:3000` lub w pełnej przeglądarce, nie w podglądzie pliku.
- Bez klucza API powinny nadal działać odpowiedzi z lokalnej bazy.
- Jeżeli AI zwraca błąd, sprawdź klucz API, dostęp do wybranego modelu i rozliczenia API.

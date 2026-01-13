# CryptoTracker - Angular Portfólió Projekt 🚀

Ez egy interaktív webalkalmazás, amely a CoinGecko API segítségével valós idejű és historikus kriptovaluta adatokat jelenít meg, valamint lehetőséget biztosít egy **saját befektetési portfólió** kezelésére. A projekt célja, hogy bemutassa a modern Angular keretrendszer legfontosabb elemeinek gyakorlati alkalmazását, beleértve a Standalone Components architektúrát, a Signals-alapú állapotkezelést és a CRUD műveleteket.

**➡️ Élő Demo:** `https://vmark-buribubi.github.io/Crypto-Tracker/`

## ✨ Funkciók (Features)

*   **📊 Lista Nézet:** Megjeleníti a top 100 kriptovalutát piaci kapitalizáció szerint.
*   **🔍 Keresés & Szűrés:** 
    *   Dinamikus keresés név és szimbólum alapján.
    *   Szűrés 24 órás trend (pozitív/negatív) alapján.
    *   **Kedvencek szűrése:** Egy kapcsolóval ("Show Favorites Only") kizárólag a megjelölt coinok jeleníthetők meg.
*   **💼 Saját Portfólió (CRUD):** Teljes körű portfóliókezelő rendszer. A felhasználó:
    *   **Létrehozhat (Create):** Új tranzakciókat rögzíthet (vételi ár, mennyiség).
    *   **Listázhat (Read):** Láthatja a birtokolt eszközök aktuális értékét és a profitot/veszteséget.
    *   **Szerkeszthet (Update):** Módosíthatja a meglévő tételeket.
    *   **Törölhet (Delete):** Eltávolíthat eszközöket a portfólióból.
    *   *Az adatok a `localStorage`-ban tárolódnak.*
*   **📄 PDF Export:** A részletes nézeten lehetőség van az adatlap (grafikon, leírás, statisztikák) letöltésére PDF formátumban, dinamikus fájlnévvel.
*   **📈 Interaktív Grafikon:** 7 napos historikus árfolyamadatok vizualizációja (`ng2-charts`).
*   **Rendezés:** A táblázat oszlopai (ár, név, piaci kapitalizáció) szerint növekvő/csökkenő sorrendbe rendezhetők.
*   **Lapozás (Pagination):** Kliens oldali lapozás a jobb teljesítmény és átláthatóság érdekében.
*   **Dark Mode:** Választható világos és sötét téma, ami szintén elmentődik.
*   **Reszponzív Design:** Az alkalmazás mobilon és asztali gépen is jól használható.

## 🛠️ Felhasznált Technológiák

Ez a projekt a legmodernebb Angular technikákra épül.

*   **Keretrendszer:** **Angular** (v19+)
    *   **Standalone Components:** Modern, `NgModule`-mentes architektúra.
*   **Állapotkezelés (State Management):** **Angular Signals** (`signal`, `computed`, `effect`) a reaktív és hatékony állapotkezelésért.
*   **Űrlapkezelés:** **Reactive Forms** a portfólió szerkesztéséhez és validációjához.
*   **Adatkezelés:**
    *   **RxJS:** Az aszinkron `HttpClient` hívások kezelésére.
    *   **REST API:** Kommunikáció a [CoinGecko API](https://www.coingecko.com/en/api)-val.
*   **UI / Stílus:**
    *   **Angular Material:** Professzionális UI komponensek (`MatTable`, `MatPaginator`, `MatSort`, `MatDialog`, `MatCard` stb.).
    *   **SCSS:** A rugalmas és strukturált stíluslapokért.
*   **Külső Könyvtárak:**
    *   **Chart.js / ng2-charts:** Adatvizualizáció.
    *   **jspdf & html-to-image:** PDF riportok generálása.
*   **Navigáció:** **Angular Router** a kliens oldali útválasztáshoz.
*   **Perzisztencia:** Böngésző oldali **`localStorage`** a téma, kedvencek és a portfólió adatainak mentéséhez.

## ⚙️ Telepítés és Futtatás

1.  Klónozd a repository-t:
    ```bash
    git clone https://github.com/vmark-buribubi/Crypto-Tracker.git
    ```
2.  Navigálj a projekt mappájába:
    ```bash
    cd Crypto-Tracker
    ```
3.  Telepítsd a függőségeket:
    ```bash
    npm install
    ```
4.  Indítsd el a fejlesztői szervert:
    ```bash
    ng serve
    ```
5.  Nyisd meg a böngészőben: `http://localhost:4200/`

## 🔮 Jövőbeli fejlesztési lehetőségek

*   **Valós idejű frissítés:** WebSocket integrálása az árfolyamok automatikus frissítéséhez.
*   **Felhasználói fiókok:** Firebase vagy Supabase integrálása a felhasználói regisztrációhoz és a portfólió felhőben való mentéséhez.
*   **Bővített grafikonok:** Több időintervallum (1 nap, 1 hónap, 1 év) és gyertya (candlestick) diagramok.

# CryptoTracker - Junior Angular Portfólió Projekt 🚀

Ez egy interaktív webalkalmazás, amely a CoinGecko API segítségével valós idejű és historikus kriptovaluta adatokat jelenít meg. A projekt célja, hogy bemutassa a modern Angular keretrendszer legfontosabb elemeinek gyakorlati alkalmazását, beleértve a Standalone Components architektúrát, a Signals-alapú állapotkezelést és az Angular Material komponensek használatát.

**➡️ Élő Demo:** `https://vmark-buribubi.github.io/Crypto-Tracker/`

## ✨ Funkciók (Features)

*   **Lista Nézet:** Megjeleníti a top 100 kriptovalutát piaci kapitalizáció szerint.
*   **Részletes Nézet:** Kattintásra részletes adatlap minden coinhoz.
*   **Interaktív Grafikon:** 7 napos historikus árfolyamadatok vizualizációja.
*   **Keresés & Szűrés:** Dinamikus keresés név/szimbólum alapján és szűrés a 24 órás trend (pozitív/negatív) alapján.
*   **Rendezés:** A táblázat oszlopai (ár, név, piaci kapitalizáció) szerint növekvő/csökkenő sorrendbe rendezhető.
*   **Lapozás (Pagination):** A lista oldalakra van bontva a jobb teljesítmény és átláthatóság érdekében.
*   **Kedvencek Rendszer:** A felhasználó csillaggal megjelölheti kedvenc coinjait, a választás a böngészőben (`localStorage`) elmentődik.
*   **Dark Mode:** Választható világos és sötét téma, ami szintén elmentődik.
*   **Reszponzív Design:** Az alkalmazás mobilon és asztali gépen is jól használható.

## 🛠️ Felhasznált Technológiák

Ez a projekt a legmodernebb Angular technikákra épül.

*   **Keretrendszer:** **Angular** (v19+)
    *   **Standalone Components:** Modern, `NgModule`-mentes architektúra.
*   **Állapotkezelés (State Management):** **Angular Signals** (`signal`, `computed`, `effect`) a reaktív és hatékony állapotkezelésért.
*   **Adatkezelés:**
    *   **RxJS:** Az aszinkron `HttpClient` hívások kezelésére.
    *   **REST API:** Kommunikáció a [CoinGecko API](https://www.coingecko.com/en/api)-val.
*   **UI / Stílus:**
    *   **Angular Material:** A kész, professzionális UI komponensekért (`MatTable`, `MatPaginator`, `MatSort`, `MatCard` stb.).
    *   **SCSS:** A rugalmas és strukturált stíluslapokért.
*   **Navigáció:** **Angular Router** a kliens oldali útválasztáshoz (dinamikus `:id`-val a részletek oldalhoz).
*   **Adattárolás:** Böngésző oldali **`localStorage`** a téma és a kedvencek mentéséhez.

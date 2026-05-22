# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


# Portale IT Romagna

Portale web per studenti e neolaureati che cercano aziende IT in Romagna.
Progetto realizzato in collaborazione con il DIR (Distretto dell'Informatica Romagnola).

---

## Stack tecnologico

| Tecnologia | Utilizzo |
|---|---|
| **Astro** | Framework frontend |
| **Tailwind CSS** | Stile e layout |
| **TypeScript** | Linguaggio di sviluppo |
| **JSON** | Storage dati aziende |
| **Node.js** | Runtime server-side |

---

## Struttura del progetto

```
src/
├── data/
│   ├── aziende.json       ← dati delle aziende IT
│   ├── citta.json         ← città della Romagna
│   └── ambiti.json        ← ambiti di lavoro (es. Web, AI, Cloud)
├── lib/
│   └── data.ts            ← tutte le funzioni di lettura/scrittura JSON
├── layouts/
│   └── Layout.astro       ← layout base con navbar e footer (da creare)
├── pages/
│   ├── index.astro        ← homepage (da creare)
│   └── aziende/
│       ├── index.astro    ← lista aziende con filtri (da creare)
│       └── [slug].astro   ← pagina dettaglio azienda (da creare)
└── components/            ← componenti riutilizzabili (da creare)
```

---

## Struttura dati JSON

### aziende.json
```json
{
  "id": "string",
  "nome": "string",
  "descrizione": "string",
  "lavoro_da_remoto": "si | no | ibrido",
  "offre_tirocini": "boolean",
  "sito_web": "string",
  "email_contatto": "string",
  "telefono": "string",
  "dimensione": "startup | pmi | grande",
  "logo_url": "string",
  "anno_fondazione": "number",
  "latitudine": "number",
  "longitudine": "number",
  "id_citta": "string (FK → citta.json)",
  "ambiti": "string[] (FK → ambiti.json)"
}
```

### citta.json
```json
{ "id": "string", "nome": "string" }
```

### ambiti.json
```json
{ "id": "string", "nome": "string" }
```

---

## Funzioni disponibili in `src/lib/data.ts`

### Lettura
| Funzione | Descrizione |
|---|---|
| `getAziende()` | Restituisce tutte le aziende |
| `getAziendaById(id)` | Restituisce un'azienda per id |
| `getAziendaBySlug(slug)` | Restituisce un'azienda per slug URL |
| `getAziendeByCitta(idCitta)` | Restituisce aziende per città |
| `getAziendeConTirocini()` | Restituisce aziende che offrono tirocini |
| `getAziendeByFilters(filters)` | Restituisce aziende filtrate |
| `getCitta()` | Restituisce tutte le città |
| `getCittaById(id)` | Restituisce una città per id |
| `getAmbiti()` | Restituisce tutti gli ambiti |
| `getAmbitoById(id)` | Restituisce un ambito per id |
| `getAmbitiByAzienda(azienda)` | Restituisce gli ambiti di un'azienda |
| `getCittaByAzienda(azienda)` | Restituisce la città di un'azienda |
| `slugify(nome)` | Converte un nome in slug URL |

### Scrittura
| Funzione | Descrizione |
|---|---|
| `aggiungiAzienda(dati)` | Aggiunge una nuova azienda |
| `aggiornaAzienda(id, dati)` | Aggiorna i campi di un'azienda |
| `rimuoviAzienda(id)` | Rimuove un'azienda per id |
| `aggiungiCitta(nome)` | Aggiunge una nuova città |
| `rimuoviCitta(id)` | Rimuove una città per id |
| `aggiungiAmbito(nome)` | Aggiunge un nuovo ambito |
| `rimuoviAmbito(id)` | Rimuove un ambito per id |

### Filtri disponibili in `getAziendeByFilters`
```typescript
{
  ricerca?: string        // ricerca testuale su nome e descrizione
  citta?: string[]        // filtra per id città
  ambiti?: string[]       // filtra per id ambiti (almeno uno)
  dimensione?: string[]   // "startup" | "pmi" | "grande"
  lavoro_da_remoto?: string[] // "si" | "no" | "ibrido"
  offre_tirocini?: boolean
}
```

---

## JTBD (Jobs To Be Done)

### Studenti
1. Registrarsi al portale
2. Loggarsi e rimanere loggato tramite cookies
3. Fare logout
4. Cercare un'azienda specifica tramite barra di ricerca
5. Filtrare aziende per città, ambito, dimensione, remoto, tirocini
6. Visualizzare il dettaglio di un'azienda
7. Inviare una candidatura (tirocinio o lavoro)
8. Salvare aziende nei preferiti
9. Visualizzare i preferiti salvati
10. Condividere la pagina di un'azienda
11. Recuperare la password

### Aziende
1. Registrarsi inserendo le informazioni aziendali
2. Aggiornare le informazioni del profilo
3. Vedere quante persone hanno visitato la pagina
4. Vedere le candidature ricevute
5. Toggle "accettiamo tirocinianti"
6. Fare logout
7. Recuperare la password

---

## Decisioni architetturali

- **JSON invece di DB** — per semplicità iniziale; le aziende cambiano raramente
- **Scrittura JSON solo in locale** — su hosting come Vercel il filesystem è read-only
- **Niente shadcn/ui** — Tailwind puro per leggerezza e semplicità
- **Niente React** — componenti Astro nativi dove possibile
- **Slug per gli URL** — `/aziende/techbase-srl` invece di `/aziende/1`

---

## Prossimi passi

- [ ] Creare `src/layouts/Layout.astro` con navbar e footer
- [ ] Creare `src/pages/index.astro` — homepage
- [ ] Creare `src/pages/aziende/index.astro` — lista con filtri
- [ ] Creare `src/pages/aziende/[slug].astro` — dettaglio azienda
- [ ] Valutare soluzione per login e candidature (Supabase?)

---

## Mockup di riferimento

Il mockup visivo è stato generato su **v0.dev**:
- Colore principale: verde `#1D9E75`
- Tono: moderno e giovane
- Target: studenti e neolaureati
- Componenti chiave: barra ricerca, filtri, card aziende, badge tirocini
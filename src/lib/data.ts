import type { Admin, Citta, Dimensione, Remoto } from './types'
import type { Ambito } from './types'
import type { Azienda } from './types'

import aziende from '../data/aziende.json' with { type: "json"}
import citta from '../data/citta.json' with { type: "json"}
import ambiti from '../data/ambiti.json' with { type: "json"}


// Funzioni per le città

export function getCitta(): Citta[] {
    return citta as Citta[]
}

export function getCittaById(id: string): Citta | undefined {
    return citta.find(c => c.id === id) as Citta | undefined
}


// Funzioni per gli ambiti

export function getAmbiti(): Ambito[] {
  return ambiti as Ambito[]
}

export function getAmbitoById(id: string): Ambito | undefined {
  return ambiti.find(a => a.id === id) as Ambito | undefined
}

// Funzioni per le aziende

export function getAziende(): Azienda[] {
  return aziende as Azienda[]
}

export function getAziendaById(id: string): Azienda | undefined {
  return aziende.find(a => a.id === id) as Azienda | undefined
}

export function getAziendaByCitta(idCitta: string): Azienda[] {
    return aziende.filter(a => a.id_citta === idCitta) as Azienda[]
}

//funzione per URL-friendly, fa sì che venga preso il nome dell'azienda tutto in minuscolo da mettere tipo nell'indirizzo web della pagina
export function getAziendaBySlug(slug: string): Azienda | undefined {
    const azienda = aziende.find(
        a => a.nome.toLowerCase().replace(/\s+/g, '-') === slug
    )

    if (!azienda) return undefined

    return {
        ...azienda,
        dimensione: azienda.dimensione as Dimensione,
        lavoro_da_remoto: azienda.lavoro_da_remoto as Remoto
    }
}

export function getAziendeByFilters(filters: {
    ricerca?: string
    citta?: string[]
    ambiti?: string[]
    dimensione?: string[]
    lavoro_da_remoto?: string[]
}): Azienda[] {
    return (aziende as Azienda[]).filter(azienda => {

        //ricerca testuale su nome e descrizione
        if (filters.ricerca) {
            const search = filters.ricerca.toLowerCase()
            const match = 
                azienda.nome.toLowerCase().includes(search) ||
                azienda.descrizione.toLowerCase().includes(search)
            if (!match) return false
        }

        //per citta
        if (filters.citta && filters.citta.length > 0) {
            if (!filters.citta.includes(azienda.id_citta)) return false
        }

        //per ambito
        if (filters.ambiti && filters.ambiti.length > 0) {
            const hasAmbito = filters.ambiti.some(id => azienda.ambiti.includes(id))
            if (!hasAmbito) return false
        }

        //per dimensione
        if (filters.dimensione && filters.dimensione.length > 0) {
            if (!filters.dimensione.includes(azienda.dimensione)) return false
        }

        //per lavoro da remoto
        if (filters.lavoro_da_remoto && filters.lavoro_da_remoto.length > 0) {
            if (!filters.lavoro_da_remoto.includes(azienda.lavoro_da_remoto)) return false
        }

        return true
    })
}

//serve per avere gli ambiti in cui lavora un'azienda come oggetti e non come anonimi id
export function getAmbitiByAzienda(azienda: Azienda): Ambito[] {
    return azienda.ambiti
        .map(id => getAmbitoById(id))
        .filter(Boolean) as Ambito[]        //filter(Boolean) rimuove eventuali undefined
}

//stessa cosa degli ambiti ma con la Città dell'azienda, probabilmente sarà da cambiare perchè un'azienda può avere sedi in città diverse
export function getCittaByAzienda(azienda: Azienda): Citta | undefined {
    return getCittaById(azienda.id_citta)
}

export function slugify(nome: string): string {
    return nome.toLowerCase().replace(/\s+/g, '-')
}


//funzioni SCRITTURA

//aziende
/* function salvaAziende(nuoveAziende: Azienda[]): void {
    fs.writeFileSync(
        path.join(DATA_PATH, 'aziende.json'),
        JSON.stringify(nuoveAziende, null, 2),
        'utf-8'
    )
} */

/* export function aggiungiAzienda(nuovaAzienda: Omit<Azienda, 'id'>): Azienda {
    const aziende = getAziende();
    const id = (aziende.length + 1).toString()
    const aziendaCompleta = { id, ...nuovaAzienda}      //serve a riempire aziendaCompleta con tutti i campi di nuovaAzienda
    salvaAziende([...aziende, aziendaCompleta])     //ogni volta riscrive tutte le aziende e aggiunge la nuova in fondo
    return aziendaCompleta
} */

/* export function rimuoviAzienda(id: string): boolean {
    const aziende = getAziende()
    const nuoveAziende = aziende.filter(a => a.id !== id)       //toglie l'azienda con l'id passato
    if (nuoveAziende.length === aziende.length) return false
    salvaAziende(nuoveAziende)
    return true
} */

/* export function aggiornaAzienda(id: string, dati: Partial<Azienda>): Azienda | undefined {      //Partial fa sì che si possano anche aggiungere solo alcuni campi di azienda e non tutti
    const aziende = getAziende()
    const index = aziende.findIndex(a => a.id === id)
    if (index === -1) return undefined
    aziende[index] = {...aziende[index], ...dati}       //aggiorno l'azienda all'index trovato dell'id che cercavo
    salvaAziende(aziende)
    return aziende[index]
} */

/* export function incrementaVisite(id: string): Azienda | undefined {
    const aziende = getAziende()
    const index = aziende.findIndex(a => a.id === id)
    if (index === -1) return undefined

    aziende[index].visite = (aziende[index].visite || 0) + 1

    salvaAziende(aziende)
    return aziende[index]
} */

//città

/* function salvaCitta(nuoveCitta: Citta[]): void {
  fs.writeFileSync(
    path.join(DATA_PATH, 'citta.json'),
    JSON.stringify(nuoveCitta, null, 2),
    'utf-8'
  )
} */

/* export function aggiungiCitta(nome: string): Citta {
    const citta = getCitta()
    const id = (citta.length + 1).toString()
    const nuovaCitta = { id, nome }
    salvaCitta([...citta, nuovaCitta])
    return nuovaCitta
} */

/* export function rimuoviCitta(id: string): boolean {
    const citta = getCitta()
    const nuoveCitta = citta.filter(c => c.id !== id)
    if (nuoveCitta.length === citta.length) return false
    salvaCitta(nuoveCitta)
    return true
} */

//ambiti di lavoro

/* function salvaAmbiti(nuoviAmbiti: Ambito[]): void {
  fs.writeFileSync(
    path.join(DATA_PATH, 'ambiti.json'),
    JSON.stringify(nuoviAmbiti, null, 2),
    'utf-8'
  )
} */

/* export function aggiungiAmbito(nome: string): Ambito {
    const ambiti = getAmbiti()
    const id = (ambiti.length + 1).toString()
    const nuovoAmbito = {id, nome}
    salvaAmbiti([...ambiti, nuovoAmbito])
    return nuovoAmbito
} */

/* export function rimuoviAmbito(id: string): boolean {
    const ambiti = getAmbiti()
    const nuoviAmbiti = ambiti.filter(a => a.id !== id)
    if (nuoviAmbiti.length === ambiti.length) return false
    salvaAmbiti(nuoviAmbiti)
    return true
} */

//funzioni per gli admin
/* export function getAdmin(): Admin[] {
    return admin as Admin[]
}

export function getAdminById(id: string): Admin | undefined {
    return admin.find(a => a.id === id) as Admin | undefined
}

function salvaAdmin(nuovoAdmin: Admin[]): void {
    fs.writeFileSync(
        path.join(DATA_PATH, 'admin.json'),
        JSON.stringify(nuovoAdmin, null, 2),
        'utf-8'
    )
}

export function aggiungiAdmin(nuovoAdmin: Omit<Admin, 'id'>): Admin {
    const admins = getAdmin();
    const id = (admins.length + 1).toString()
    const adminCompleto = { id, ...nuovoAdmin}
    salvaAdmin([...admin, adminCompleto])
    return adminCompleto
} */

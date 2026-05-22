import aziende from '../data/aziende.json'
import citta from '../data/citta.json'
import ambiti from '../data/ambiti.json'

export type Azienda = {
    id: string
    nome: string
    descrizione: string
    lavoro_da_remoto: string
    sito_web: string
    email_contatto: string
    telefono: string
    dimensione: string
    logo_url: string
    anno_fondazione: number
    latitudine: number
    longitudine: number
    id_citta: string
    ambiti: string[]
}

export type Citta = {
    id: string
    nome: string
}

export type Ambito = {
    id: string
    nome: string
}

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
    return aziende.find(
        a => a.nome.toLowerCase().replace('/\s+g', '-') === slug
    )
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
    return nome.toLowerCase().replace('/\s+g', '-')
}


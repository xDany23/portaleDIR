// Tipi di dati

export interface Citta {
    id: string;
    nome: string
}

export interface Ambito {
    id: string;
    nome: string;
}

export interface Azienda {
    id: string
    nome: string
    descrizione: string
    lavoro_da_remoto: string
    sito_web: string
    email_contatto: string
    password: string
    telefono: string
    dimensione: string
    logo_url: string
    anno_fondazione: number
    latitudine: number
    longitudine: number
    id_citta: string
    ambiti: string[]
}
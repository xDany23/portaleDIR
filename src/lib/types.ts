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
    password_hash: string
    telefono: string
    dimensione: string
    logo_url: string
    anno_fondazione: number
    latitudine: number
    longitudine: number
    id_citta: string
    ambiti: string[]
    da_verificare: boolean
    visite: number
}

export interface Admin {
    id: string
    email: string
    nome: string
    password: string
}
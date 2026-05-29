// Tipi di dati

export type Remoto = "Sì" | "No" | "Ibrido"
export type Dimensione = "Startup" | "PMI" | "Grande Azienda"

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
    lavoro_da_remoto: Remoto
    sito_web: string
    email_contatto: string
    password_hash: string
    telefono: string
    dimensione: Dimensione
    logo_url: string
    anno_fondazione: string
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
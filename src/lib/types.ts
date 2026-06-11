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
    email_avvisi: string
    telefono: string
    dimensione: string
    logo_url: string
    anno_fondazione: string
    via: string
    numero_civico: string
    mapsLink: string
    id_citta: string
    ambiti: string[]
    assume: boolean
    tirocini: boolean
}

export interface Admin {
    id: string
    email: string
    nome: string
    password: string
}
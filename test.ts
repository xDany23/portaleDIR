import { aggiungiAzienda, getAziende, aggiornaAzienda } from './src/lib/data'

// Testa le funzioni
const aggiornata = aggiornaAzienda('2', {
  descrizione: 'Azienda di telefonia',
  anno_fondazione: 2022
})

console.log('Azienda aggiunta:', aggiornata)
console.log('Totale aziende:', getAziende().length)
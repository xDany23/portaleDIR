import type { APIRoute } from "astro";
import { aggiungiAzienda, getAmbiti } from "../../lib/data";
import fs from 'fs';
import path from 'path';
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({request}) => {

    const formData = await request.formData()

    //Solo per il logo
    let logo_url = ''
    const logo = formData.get('logo') as File

    if (logo && logo.size > 0) {
        //crea la cartella loghi se non esiste
        const loghiPath = path.resolve(process.cwd(), 'public/loghi')      //uso process.cwd() per fare in modo che cerchi non da C: del pc ma dalla root del progetto
        if (!fs.existsSync(loghiPath)) {
            fs.mkdirSync(loghiPath, {recursive: true})
        }

        //creo nome del file unico
        const estensione = logo.name.split('.').pop()
        const nomeFile = `${Date.now()}-${formData.get('nome')?.toString().toLowerCase().replace(/\s+/g, '-')}.${estensione}`

        //salvo il file
        const bytes = await logo.arrayBuffer()
        const buffer = Buffer.from(bytes)       //converte i bytes in un formato che Node.js può scrivere su disco
        fs.writeFileSync(path.join(loghiPath, nomeFile), buffer)

        //l'URL pubblico adesso è /loghi/nome-file
        logo_url = `/loghi/${nomeFile}`
    }

    //prendo la password inserita dall'azienda
    const password = formData.get('password')?.toString() || ""

    //crypto la password
    const password_hash = await bcrypt.hash(password, 10)

    const nuovaAzienda = {
        nome: formData.get('nome') as string,
        descrizione: formData.get('descrizione') as string,
        email_contatto: formData.get('email') as string,
        password_hash,
        telefono: formData.get('telefono') as string || '',
        sito_web: formData.get('sito') as string || '',
        dimensione: formData.get('dimensione') as string,
        lavoro_da_remoto: formData.get('remoto') as string,
        logo_url,
        anno_fondazione: new Date().getFullYear(),
        latitudine: 0,
        longitudine: 0,
        id_citta: formData.get('citta') as string,
        ambiti: formData.getAll('ambiti') as string[],
        da_verificare: true,
        visite: 0
    }

    try {
        const azienda = aggiungiAzienda(nuovaAzienda)
        return new Response(JSON.stringify({success: true, azienda}), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        })
    } catch (error) {
        return new Response(JSON.stringify({success: false, error: 'Errore durante la registrazione'}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        })
    }
}
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Legge il corpo dell'issue dalla variabile d'ambiente
const body = process.env.ISSUE_BODY || "";

// Funzione per estrarre il valore di un campo dal corpo dell'issue
function estrai(campo) {
    const campoEscaped = campo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`### ${campoEscaped}\\s*\\n([\\s\\S]*?)(?=\\n###|$)`);
    const match = body.match(regex);
    const valore = match ? match[1].trim() : "";
    return valore === "_No response_" ? "" : valore;
}

function pulisciNomeFile(stringa) {
    return stringa
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function isValidImage(url) {
    return /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(url);
}

const mappaAmbiti = {
    "Software Development" : "1",
    "Artificial Intelligence & Data": "2",
    "Cybersecurity": "3",
    "Cloud Computing & DevOps": "4",
    "IT Infrastructure & Networking": "5",
    "Managed Services & IT Support": "6",
    "Digital Platforms & Web Solutions": "7",
    "AR/VR, Multimedia & Creative Tech": "8",
    "UI/UX & Digital Experience": "9",
    "IoT & Embedded Systems": "10",
    "Business Software & Enterprise Solutions": "11",
    "IT Consulting & Digital Transformation": "12"
}

const mappaCitta = {
    "Alfonsine": "1",
    "Bagnacavallo": "2",
    "Bertinoro": "3",
    "Brisighella": "4",
    "Castel Bolognese": "5",
    "Cervia": "6",
    "Cesenatico": "7",
    "Cesena": "8",
    "Coriano": "9",
    "Faenza": "10",
    "Forlì": "11",
    "Forlimpopoli": "12",
    "Fusignano": "13",
    "Gambettola": "14",
    "Imola": "15",
    "Longiano": "16",
    "Lugo": "17",
    "Meldola": "18",
    "Misano Adriatico": "19",
    "Ravenna": "20",
    "Riccione": "21",
    "Rimini": "22",
    "San Mauro Pascoli": "23",
    "Santarcangelo di Romagna": "24",
    "Savignano sul Rubicone": "25",
    "Verucchio": "26"
}

async function eseguiScript() {
    //Estraggo i campi dal corpo dell'issue
    const ambitiRaw = estrai("Ambiti di lavoro");
    const ambitiArray = Object.keys(mappaAmbiti)
        .filter(nome => ambitiRaw.includes(nome))
        .map(nome => mappaAmbiti[nome])

    const cittaRaw = estrai("Città");
    const cittaId = mappaCitta[cittaRaw] || "1";

    const nomeAzienda = estrai("Nome azienda");
    const idAzienda = String(Date.now());

    const via = estrai("Via");
    const numero_civico = estrai("Numero Civico");
    const indirizzo = `${via} ${numero_civico}, ${cittaRaw}`
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(indirizzo)}`;

    const emailSito = estrai("Email di Contatto");
    const emailAvvisi = estrai("Email Avvisi") || emailSito;

    let logoUrlFinale = "";
    let logoRaw = estrai("URL del logo (opzionale)") || "";
    let remoteUrl = "";

    if (logoRaw.includes("<img")) {
        const srcMatch = logoRaw.match(/src=["']([^"']+)["']/);
        if (srcMatch && srcMatch[1]) {
            remoteUrl = srcMatch[1].trim();
        }
    } else if (logoRaw.startsWith("https://") || logoRaw.startsWith("https://")) {
        remoteUrl = logoRaw.trim();
    }

    if (remoteUrl) {

        if (!isValidImage(remoteUrl)) {
            console.error("URL del logo no valido: deve essere un link diretto a un'immagine (.png, .jpg, .jpeg, .webp, .gif, .svg)");
            throw new Error("URL del logo non valido");
        }
        try {
            const cartellaLoghi = path.join(process.cwd(), "public/loghi");

            if (!fs.existsSync(cartellaLoghi)) {
                fs.mkdirSync(cartellaLoghi, { recursive: true });
            }

            const matchEstensione = remoteUrl.match(/\.(png|jpg|jpeg|webp|gif|svg)(\?.*)?$/i);
            const estensione = matchEstensione ? `.${matchEstensione[1].toLowerCase()}` : ".png";

            const nomeFileInLocale = `${idAzienda}-${pulisciNomeFile(nomeAzienda)}${estensione}`;
            const pathLocaleCompleto = path.join(cartellaLoghi, nomeFileInLocale);

            const response = await fetch(remoteUrl)
            if (!response.ok) throw new Error(`Errore nel download: ${response.statusText}`)

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            fs.writeFileSync(pathLocaleCompleto, buffer);

            logoUrlFinale = `loghi/${nomeFileInLocale}`;
        } catch (error) {
            console.error("Errore durante il download del logo: ", error);
            logoUrlFinale = "";
        }
    }

    const nuovaAzienda = {
        id: idAzienda,
        nome: nomeAzienda,
        descrizione: estrai("Descrizione"),
        email_contatto: emailSito,
        telefono: estrai("Telefono") || "",
        sito_web: estrai("Sito web") || "",
        dimensione: estrai("Dimensione azienda"),
        lavoro_da_remoto: estrai("Lavoro da remoto"),
        logo_url: logoUrlFinale,
        anno_fondazione: new Date().toLocaleDateString('it-IT'),
        via: via,
        numero_civico: numero_civico, 
        mapsLink: mapsLink,
        id_citta: cittaId,
        ambiti: ambitiArray,
        assume: estrai("Assume personale") === "Sì",
        tirocini: estrai("Offre tirocini") === "Sì"
    };

    const filePath = path.join(process.cwd(), "src/data/aziende.json");
    const aziende = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    aziende.push(nuovaAzienda);

    fs.writeFileSync(filePath, JSON.stringify(aziende, null, 2));
}

eseguiScript().catch(error => {
    console.error("Errore fatale nello script: ", error);
    process.exit(1);
})


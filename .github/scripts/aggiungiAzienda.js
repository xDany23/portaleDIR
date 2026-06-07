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
    "Forlì": "1",
    "Cesena": "2",
    "Ravenna": "3",
    "Rimini": "4",
    "Faenza": "5",
    "Lugo": "6",
    "Imola": "7"
}

//Estraggo i campi dal corpo dell'issue
const ambitiRaw = estrai("Ambiti di lavoro");
const ambitiArray = Object.keys(mappaAmbiti)
    .filter(nome => ambitiRaw.includes(nome))
    .map(nome => mappaAmbiti[nome])

const cittaRaw = estrai("Città");
const cittaId = mappaCitta[cittaRaw] || "1";

const nuovaAzienda = {
    id: String(Date.now()),
    nome: estrai("Nome azienda"),
    descrizione: estrai("Descrizione"),
    email_contatto: estrai("Email di contatto"),
    telefono: estrai("Telefono") || "",
    sito_web: estrai("Sito web") || "",
    dimensione: estrai("Dimensione azienda").toLowerCase(),
    lavoro_da_remoto: estrai("Lavoro da remoto").toLowerCase(),
    logo_url: estrai("URL del logo (opzionale)") || "",
    anno_fondazione: new Date().getFullYear(),
    latitudine: 0,
    longitudine: 0,
    id_citta: cittaId,
    ambiti: ambitiArray,
    assume: estrai("Assume personale") === "Sì",
    tirocini: estrai("Offre tirocini") === "Sì"
};

const filePath = path.join(process.cwd(), "src/data/aziende.json");
const aziende = JSON.parse(fs.readFileSync(filePath, "utf-8"));

aziende.push(nuovaAzienda);

fs.writeFileSync(filePath, JSON.stringify(aziende, null, 2));
const fs = require("fs");
const path = require("path");

const data = JSON.parse(process.argv[2]);

const filePath = path.join(process.cwd(), "src/data/aziende.json");
const aziende = JSON.parse(fs.readFileSync(filePath, "utf-8"));

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

const nuovaAzienda = {
    id: String(Date.now()),
    nome: data.nome,
    descrizione: data.descrizione,
    email_contatto: data.email,
    telefono: data.telefono || "",
    sito_web: data.sito || "",
    dimensione: data.dimensione,
    lavoro_da_remoto: data.remoto,
    logo_url: data.logo || "",
    anno_fondazione: "",
    latitudine: 0,
    longitudine: 0,
    id_citta: data.citta,
    ambiti: Array.isArray(data.ambiti) ? data.ambiti.map(a => mappaAmbiti[a]) : [mappaAmbiti[data.ambiti]],
    assume: data.assume === "Sì",
    tirocini: data.tirocini === "Sì"
};

aziende.push(nuovaAzienda);

fs.writeFileSync(filePath, JSON.stringify(aziende, null, 2));
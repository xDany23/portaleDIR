import type { APIContext } from "astro"
import { getAziende } from "../../lib/data"

export async function GET({request}: APIContext) {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')

    const aziende = getAziende()
    const esiste = aziende.some(a => a.email_contatto === email)

    return new Response(JSON.stringify({ exists: esiste }))
}
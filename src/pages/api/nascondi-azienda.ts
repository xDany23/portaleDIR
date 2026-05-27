import type { APIRoute } from "astro";
import { aggiornaAzienda, getAziendaBySlug} from "../../lib/data";

export const GET: APIRoute = async ({ url, redirect}) => {
    const slug = url.searchParams.get("slug");

    if (!slug) {
        return new Response("Slug mancante", { status: 400})
    }

    const azienda = getAziendaBySlug(slug);
    if (!azienda) {
        return new Response("Azienda non trovata", { status: 404})
    }

    aggiornaAzienda(azienda.id, {da_verificare: true})

    return redirect(`/aziende/${slug}`)
}
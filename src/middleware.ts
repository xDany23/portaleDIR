import type { MiddlewareHandler } from "astro";
import { getAdminById, getAziendaById, slugify } from "./lib/data";

export const onRequest: MiddlewareHandler = async({ request, cookies, locals, redirect}, next) => {
    console.log("entro nel middleware")
    const url = new URL(request.url)

    //per l'admin
    const id = cookies.get("admin_id")?.value

    if (id) {
        const admin = getAdminById(id)

        if (admin) {
            locals.admin = admin
        }
    }

    //per dashboard aziende
    const aziendaId = cookies.get("azienda_id")?.value

    if (aziendaId) {
        const azienda = getAziendaById(aziendaId)
        if (azienda) {
            locals.azienda = azienda
        }
    }

    if (url.pathname.startsWith("/dashboard")) {

        if (!locals.azienda) {
            return redirect("/login")
        }

        const fullSlug = url.pathname.split("/")[2]                 //qui ottengo "azienda-dashboard"
        const requestedSlug = fullSlug.replace("-dashboard", "")    //qui "azienda"

        if (requestedSlug !== slugify(locals.azienda.nome)) {
            return redirect(`/dashboard/${slugify(locals.azienda.nome)}-dashboard`)
        }
    }

    return next()
}
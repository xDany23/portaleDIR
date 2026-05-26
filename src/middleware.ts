import type { MiddlewareHandler } from "astro";
import { getAziendaById } from "./lib/data";

export const onRequest: MiddlewareHandler = async({ request, cookies, locals, redirect}, next) => {
    console.log("entro nel middleware")
    const url = new URL(request.url)

    const id = cookies.get("azienda_id")?.value

    if (id) {
        const azienda = await getAziendaById(id)

        if (azienda) {
            locals.azienda = azienda
        }
    }

    //proteggo con il middleware le rotte verso /aziende/[slug] per proteggere la pagina personale dell'azienda
    if (url.pathname.startsWith("/aziende/dashboard")) {
        //se il cookie è invalido si fa il logout forzato
        if (!locals.azienda) {
            return redirect("/login")
        }
    }

    return next()
}
import type { MiddlewareHandler } from "astro";
import { getAdminById, getAziendaById } from "./lib/data";

export const onRequest: MiddlewareHandler = async({ request, cookies, locals, redirect}, next) => {
    console.log("entro nel middleware")
    const url = new URL(request.url)

    const id = cookies.get("admin_id")?.value

    if (id) {
        const admin = await getAdminById(id)

        if (admin) {
            locals.admin = admin
        }
    }

    //proteggo con il middleware le rotte verso /aziende/[slug] per proteggere la pagina personale dell'azienda
    /* if (url.pathname.startsWith("/aziende/")) {
        //se il cookie è invalido si fa il logout forzato
        if (!locals.admin) {
            return redirect("/")
        }
    } */

    return next()
}
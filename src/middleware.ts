import type { MiddlewareHandler } from "astro";
import { getAziendaById } from "./lib/data";

export const onRequest: MiddlewareHandler = async({ request, cookies, locals, redirect}, next) => {
    console.log("entro nel middleware")
    const url = new URL(request.url)

    //proteggo con il middleware le rotte verso /aziende/[slug] per proteggere la pagina personale dell'azienda
    if (url.pathname.startsWith("/aziende/dashboard")) {
        const id = cookies.get("azienda_id")?.value

        //se non c'è il cookie si ritorna al login
        if (!id) {
            return redirect("/login")
        }

        //prende l'azienda dal JSON così è piu facile usarla nella pagina della dashboard
        const azienda = await getAziendaById(id)

        //se il cookie è invalido si fa il logout forzato
        if (!azienda) {
            cookies.delete("azienda_id", { path: "/"})
            return redirect("/login")
        }

        locals.azienda = azienda
    }
    
    return next()
}
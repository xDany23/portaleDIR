import type { APIRoute } from "astro";
import { aggiungiAdmin, aggiungiAzienda, getAmbiti } from "../../lib/data";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({request}) => {

    const formData = await request.formData()

    //prendo la password inserita dall'azienda
    const password = formData.get('password')?.toString() || ""

    //crypto la password
    const password_hash = await bcrypt.hash(password, 10)

    const nuovoAdmin = {
        nome: formData.get('nome') as string,
        password: password_hash,
        email: formData.get('email') as string
    }

    try {
        const admin = aggiungiAdmin(nuovoAdmin)
        return new Response(JSON.stringify({success: true, admin}), {
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
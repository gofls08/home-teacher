import type { RequestHandler } from "./$types";
import fs from 'fs/promises'

export const POST:RequestHandler = async ({request, url}) => {
    const arrayBuffer = await request.arrayBuffer();
    await fs.writeFile(url.searchParams.get('name') ?? `${Date.now()}`, Buffer.from( new Uint8Array(arrayBuffer) ));
    return new Response('good');
}
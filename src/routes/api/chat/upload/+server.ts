import db from "$lib/db"
import type { RequestHandler } from "./$types"
import { json } from '@sveltejs/kit';

export async function POST({request}){
    const { description } = await request.json();
          const collection = db.collection("Chat");
          await collection.insertMany([
            description
          ]);
     console.log(description);
          return json(request);
}




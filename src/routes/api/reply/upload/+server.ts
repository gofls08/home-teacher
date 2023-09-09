import db from "$lib/db"
import { json } from '@sveltejs/kit';

export async function POST({request}){
    const { description } = await request.json();
          const collection = db.collection("Reply");
          await collection.insertMany([
            description
          ]);
     console.log(description);
          return json(request);
}
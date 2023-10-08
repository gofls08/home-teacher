import db from "$lib/db"
import { json } from '@sveltejs/kit';

export async function POST({request}){
    const { description } = await request.json();
    const { body } = await request.json();
    console.log(body);
    const collection = db.collection("Post");
  const result = await collection.find( { 'body': { $eq: body } } )
  if(result){
    collection.deleteOne({body: body});
  }
  
    
    await collection.insertMany([
      description
    ]);
     console.log(description);
    return json(request);
}

import db from "$lib/db"
import type { RequestHandler } from "./$types"

export const GET:RequestHandler = async ({url}) => {
    const User = db.collection('Post');
    const body = url.searchParams.get('body');
    const filter:{[key:string]:object} = {}
    if(body){
        filter.body = {$eq:body};
    }
    const result = await User.find(filter).toArray();
    return new Response(JSON.stringify(result.map(v => ({...v, _id:v._id.toString()})))); 
   
} 

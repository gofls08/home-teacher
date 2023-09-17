import db from "$lib/db"
import type { RequestHandler } from "./$types"

export const GET:RequestHandler = async ({url}) => {
    const User = db.collection('User');
    const uid = url.searchParams.get('uid');
    const filter:{[key:string]:object} = {}
    if(uid){
        filter.uid = {$eq:uid};
    }
    const result = await User.find(filter).toArray();
    return new Response(JSON.stringify(result.map(v => ({...v, _id:v._id.toString()})))); 
   
} 

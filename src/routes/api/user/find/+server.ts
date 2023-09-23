import db from "$lib/db"
import type { RequestHandler } from "./$types"

export const GET:RequestHandler = async ({url}) => {
    const User = db.collection('User');
    const group = url.searchParams.get('group');
    const filter:{[key:string]:object} = {}
    if(group){
        filter.group = {$eq:group};
    }
    const result = await User.find(filter).toArray();
    return new Response(JSON.stringify(result.map(v => ({...v, _id:v._id.toString()})))); 
   
} 

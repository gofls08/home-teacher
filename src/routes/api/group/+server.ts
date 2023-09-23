import db from "$lib/db"
import type { RequestHandler } from "./$types"

export const GET:RequestHandler = async () => {
    const User = db.collection('Group');
    const result = await User.find().toArray();

    return new Response(JSON.stringify(result.map(v => ({...v, _id:v._id.toString()})))); 

} 

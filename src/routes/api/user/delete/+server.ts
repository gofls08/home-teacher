import db from "$lib/db"
import { json } from '@sveltejs/kit';

export async function POST({request}){
    const {uid} = await request.json();
    const User = db.collection('User');
    console.log(uid);
    User.deleteOne({uid: uid});

    return json(request); 
}


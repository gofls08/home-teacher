import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
export const load:PageServerLoad = async () => {
    const {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
    } = env;
    return {
        firebaseConfig:{
            apiKey,
            authDomain,
            projectId,
            storageBucket,
            messagingSenderId,
            appId,
        }
    };
}
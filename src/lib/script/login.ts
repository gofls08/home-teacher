import {
    GoogleAuthProvider, //구글 로그인 모든 기능
    browserSessionPersistence, // 로그인 확인 토큰 저장
    getAuth,
    setPersistence, //persistence 방법 결정
    signInWithPopup, //signin 방법
} from "firebase/auth"; // auth = 인증 정보 가져옴(인증 정보 상태)
import type { User } from "firebase/auth";
import type { iUser } from "$lib/type";
import {
    getApps,
    initializeApp,
    FirebaseError, // signin error type
} from "firebase/app";
import type { FirebaseOptions } from "firebase/app";
export const login = async (firebaseConfig: FirebaseOptions) => {
    if (getApps().length === 0) {
        //앱 존재 확인
        initializeApp(firebaseConfig);
    }
    let displayName ="";
    const provider = new GoogleAuthProvider();
    const auth = getAuth(); //auth 정보 받아옴
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    try {
        //try에서 오류=> catch로 error 보냄
        await setPersistence(auth, browserSessionPersistence); //로그인 정보 저장 위치(session)
        const result = await signInWithPopup(auth, provider); //provider에 따라 로그인 창 바뀜
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken; //토큰 id, 서버 저장
        const user = result.user;
        let users:iUser[]=[];
		const User = await fetch(`/api/user?uid=${user.uid}`);
		users = await User.json();
         if (user !== null) {
            user.providerData.forEach((profile) => {
                if (profile.displayName !== null) {
                    displayName = profile.displayName;
                }
            });
        }
        //console.log(users);
        if(users.length===0){
            const description = {
            name: displayName,
            uid:user.uid,
            group:[]
        };

        const response = await fetch(
            "/api/user/upload",
            {
                method: "POST",
                body: JSON.stringify({
                    description,
                }),
                headers: {
                    "Content-Type":
                        "application/json",
                },
            }
        );
        await response.json();
        }else{
            //console.log("이미 있는 유저");
        }
        

        // Array(displayName, chat, new Date());

        
        return { token, user };
       
    } catch (error) {
        if (error instanceof FirebaseError) {
            //firebase 내 error
            const code = error.code;
            const message = error.message;
            // The email of the user's account used.
            const email = error.customData?.email;
            // The AuthCredential type that was used.
            const credential =
                GoogleAuthProvider.credentialFromError(error);
            console.log({
                code,
                message,
                email,
                credential,
            });
        } else {
            //코드 error
            console.log(error);
        }
    }
};

export const logout = async (firebaseConfig: FirebaseOptions) => {
    if (getApps().length === 0) {
        initializeApp(firebaseConfig);
    }
    const auth = getAuth();
    await auth.signOut();
};
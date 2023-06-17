<script lang="ts">
	import { onMount } from 'svelte';
    import { 
        GoogleAuthProvider, //구글 로그인 모든 기능 
        browserSessionPersistence, // 로그인 확인 토큰 저장
        getAuth,
        onAuthStateChanged,
        setPersistence, //persistence 방법 결정
        signInWithPopup //signin 방법
    } from 'firebase/auth'; // auth = 인증 정보 가져옴(인증 정보 상태) 
    import type { User } from 'firebase/auth';
    import { 
        getApps,    
        initializeApp,  
        FirebaseError // signin error type 
    } from 'firebase/app';
    import type { FirebaseOptions } from 'firebase/app';
    import type { PageData } from './$types';
    export let data:PageData;
    const firebaseConfig = data.firebaseConfig;
    let curUser:User|null = null; //null = 로그인 x
    onMount(() => { //페이지 로딩 후 onMount 코드 실행 
        if(getApps().length === 0){ 
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        const un = onAuthStateChanged(auth, user => {
            curUser = user;
        });
        return() => {
            un;
        } //이벤트 해지
    })
    const login = async (firebaseConfig:FirebaseOptions) => {
    if(getApps().length === 0){ //앱 존재 확인
        initializeApp(firebaseConfig);
    }
    const provider = new GoogleAuthProvider();
    const auth = getAuth(); //auth 정보 받아옴
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); 
    try{ //try에서 오류=> catch로 error 보냄
        await setPersistence(auth, browserSessionPersistence); //로그인 정보 저장 위치(session)
        const result = await signInWithPopup(auth, provider); //provider에 따라 로그인 창 바뀜
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken; //토큰 id, 서버 저장
        const user = result.user;
		main();
        return { token , user};
		
    } catch(error){
        if(error instanceof FirebaseError){ //firebase 내 error
            const code = error.code;
            const message = error.message;
            // The email of the user's account used.
            const email = error.customData?.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log({
                code, message, email, credential
            });
        } else { //코드 error
            console.log(error);
        }
    }
}

	 function main(){
		location.href = "/community";
	 }
	
</script>
<div id="container">
	<div class="log-in">
		<div class="name">Home Teacher</div>
		<button on:click={async() => {
			await login(firebaseConfig);
		}}> Sign in with Google </button>

	</div>

</div>

<style>
	#container{
		display: flex;
		justify-content: center;
		align-items: center;
		width:100%;
		height:100vh;
		overflow: hidden;
	}
	.log-in{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.name {
		font-size: 50px;
		font-weight: bold;
		margin-bottom: 50px;
		text-align: center;
	}
	button {
		display: block;
		border: 1px solid rgb(132, 132, 216);
		background-color: rgb(132, 132, 216);
		border-radius: 30px;
		height: 56px;
		width: 300px;
		padding: 0 20px;
		text-align: center;
		color: white;
		font-size: 15px;
	}
	
</style>

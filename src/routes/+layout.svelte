<script lang="ts">
    import "../app.postcss";
    import { onMount } from "svelte";
    import { login, logout } from "$lib/script/login";
    import {
        getAuth,
        onAuthStateChanged,
    } from "firebase/auth"; // auth = 인증 정보 가져옴(인증 정보 상태)
    import type { User } from "firebase/auth";
    import {
        getApps,
        initializeApp,
    } from "firebase/app";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    export let data: PageData;
    // import { createEventDispatcher } from "svelte";
 
    // const dispatch = createEventDispatcher();

    let isSide = true;
     const is = () => {
         if(isSide){
            isSide=false;
         }else{
            isSide=true;
         }
     };

    function Community() {
        goto("/community");
    }
    function Group() {
        goto("/group");
    }
    function Message() {
        goto("/message");
    }

    const firebaseConfig = data.firebaseConfig;
    let curUser: User | null = null; //null = 로그인 x
    let loading = true;
    onMount(() => {
        //페이지 로딩 후 onMount 코드 실행
        loading = true;
        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        const un = onAuthStateChanged(auth, (user) => {
            loading = false;
            curUser = user;
        });
        return () => {
            un;
        }; //이벤트 해지
    });

    function community() {
        goto("/community");
    }

    //  $: i = curUser;
</script>

{#if loading}
    <div>LOADING...</div>
{:else if curUser}
 
    <span style="margin-left:97%; font-size: 40px;" on:click={is}
        >≡</span>
        {#if isSide}
        <div class="cont">
        <span style="margin-left:85%; font-size: 40px;" on:click={is}
        >≡</span>
        <div id="name">Home-Teacher</div>
        <ul>
            <li on:click={Community}>Community</li>
            <li on:click={Group}>Group</li>
            <li on:click={Message}>Message</li>
        </ul>
        <div id="logout" on:click={async ()=> {
            await logout(firebaseConfig);
        }}>log-out</div>
    </div>
        {/if}
 
 
    <slot></slot>
{:else}
    <div id="container">
        <div class="log-in">
            <div class="name">Home Teacher</div>

            <button on:click={async ()=> {
                    await login(firebaseConfig);
                    community();
                }}>
                Sign in with Googles
            </button>
        </div>
    </div>
{/if}
    


<style>
    #container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
    .log-in {
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

   
    #name {
          font-size: 25px;
          font-weight: bold;
          margin-bottom: 50px;
          text-align: center;
          margin-top: 0;
          margin-bottom: 40px;
     }
     li {
          margin: 20px;
     }
     #logout {
          text-align: center;
          margin-top: 450px;
          /* margin-right: 5px; */
     }
	.cont {
		position: fixed;
		right: 0;
		top: 0;
		height: 100vh;
		width: 20%;
		background-color: white;
	}
</style>

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
    import { 
      Spinner,
      Search,
      Button,
      Navbar,
      NavBrand,
      NavLi,
      NavUl,
      NavHamburger,
      Input
     } from 'flowbite-svelte'
    import { sineIn } from 'svelte/easing';
  let hidden2 = true;
  let spanClass = 'flex-1 ml-3 whitespace-nowrap';
  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn
  };

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
<div style="display: flex;
flex-direction: column;
align-items: center; margin-top:23%;">
  <Spinner color="purple" />
</div>


{:else if curUser}
<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img
      src="/images/flowbite-svelte-icon-logo.svg"
      class="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Flowbite
    </span>
  </NavBrand>
  <div class="flex md:order-2">
    <Button color="none" data-collapse-toggle="mobile-menu-3" aria-controls="mobile-menu-3" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
    </Button>
    <div class="hidden relative md:block">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
      </div>
      <Input id="search-navbar" class="pl-10" placeholder="Search..." />
    </div>
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden}>
    <NavLi style="font-weight:bold" href="/" active={true}>Home</NavLi>
    <NavLi style="font-weight:bold" href="/1">Group1</NavLi>
    <NavLi style="font-weight:bold" href="/2">Group2</NavLi>
    <NavLi style="font-weight:bold" href="/3">Group3</NavLi>
  </NavUl>
</Navbar>
 
    <slot></slot>
{:else}
    <div id="container">
        <div class="log-in">
            <div class="name">Home Teacher</div>

            <button on:click={async ()=> {
                    await login(firebaseConfig);
                    community();
                }}>
                Sign in with Google
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

</style>

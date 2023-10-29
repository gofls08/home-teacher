<script lang="ts">
    import "../app.postcss";
    import { onMount } from "svelte";
    import { login, logout, } from "$lib/script/login";
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
      Input,
      Dropdown, DropdownItem, Chevron, DropdownDivider
     } from 'flowbite-svelte'
    import { sineIn } from 'svelte/easing';
  let hidden2 = true;
  let spanClass = 'flex-1 ml-3 whitespace-nowrap';
  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn
  };


    const firebaseConfig = {
      apiKey : "AIzaSyCFc2TiCdeg4I3VnFg8Yb5qTji8DsK0ckM",
      authDomain : "home-teacher-c7079.firebaseapp.com",
      projectId : "home-teacher-c7079",
      storageBucket : "home-teacher-c7079.appspot.com",
      messagingSenderId : "460762550443",
      appId : "1:460762550443:web:5158c47be6ae1852d827ee"};
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

    
    
    //  $: i = curUser;
</script>

{#if loading}
<div style="display: flex;
flex-direction: column;
align-items: center; margin-top:23%;">
  <Spinner color="purple" />
</div>
{:else}
<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Home-Teacher
    </span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Group</Chevron></NavLi>
    <NavLi on:click={async ()=> {
      await logout(firebaseConfig);
  }}>Log-out</NavLi>
    <Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
      <DropdownItem href="/group/1">Group-1</DropdownItem>
      <DropdownItem href="/group/2">Group-2</DropdownItem>
      <DropdownItem href="/group/3">Group-3</DropdownItem>
    </Dropdown>
  </NavUl>
</Navbar>
  {#if curUser}
  <slot></slot>
  {:else}
    <div id="container">
      <div style="font-weight:lighter; font-size:20px;">Please sign up</div>
      <button on:click={async ()=> {
        await login(firebaseConfig);
    }}>sign up</button>
    </div>
    <slot></slot>
  {/if}
    
{/if}


<style>
    #container {
      padding-top: 2%;
      padding-left: 45%;
      width: 100vw;
      height:20vh;
      background-color:black; 
      color:white; 
      overflow: hidden;
    }
    button {
        display: block;
        border: 1px solid white;
        border-radius: 30px;
        height: 40px;
        width: 100px;
        padding: 0 20px;
        text-align: center;
        color: white;
        font-size: 15px;
        margin-top: 20px;
        margin-left: 10px;
    }

</style>

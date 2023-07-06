<script lang="ts">
    import { login } from "$lib/script/login";
    import Sidebar from "$lib/component/sidebar.svelte";
    import type { PageServerData } from "./$types"
    export let data:PageServerData;
    let isSide = true;
    
    function is() {
        isSide = true;
    }
</script>

<body>
    <div
        style="text-align:right; font-size: 20px; margin-right: 5px;"
        on:click={is}
    >
        O
    </div>
    <div id="name">Message</div>
    <div class="searchBox">
        <span>
            <input type="text" placeholder="Type to Search 🔍" />
        </span>
    </div>
    <div id="container">
        <button> +message </button>
    </div>
    {#if isSide}
        <main>
            <div id="side">
                <Sidebar on:exit={() => (isSide = false)} />
            </div>
        </main>
    {/if}
</body>

<style>
    #name {
        margin: 0;
        font-size: 40px;
        text-align: center;
        font-weight: bold;
    }
    body {
        background-color: rgb(237, 237, 250);
        height: 100vh;
    }
    input {
        display: block;
        border: 1px none rgb(132, 132, 216);
        border-radius: 30px;
        height: 20px;
        width: 800px;
        text-align: center;
    }
    .searchBox {
        margin: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* width:100%; */
        /* height:100vh; */
        overflow: hidden;
    }
    main {
        display: flex;
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        box-sizing: border-box;
    }
    #side {
        position: fixed;
        right: 0;
        top: 0;
        height: 100vh;
        width: 320px;
        background-color: white;
    }
    button {
        display: block;
        border: 1px solid rgb(132, 132, 216);
        background-color: rgb(132, 132, 216);
        border-radius: 30px;
        height: 30px;
        padding: 0 20px;
        text-align: center;
        color: white;
        font-size: 15px;
        margin-left: 69%;
        margin-top: 20px;
    }
</style>

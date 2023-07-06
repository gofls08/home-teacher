<script lang="ts">
	  import { login, logout } from "$lib/script/login";
    import Sidebar from "$lib/component/sidebar.svelte";
	import { goto } from "$app/navigation";
    import type { PageServerData } from "./$types"
    export let data:PageServerData;
	
	
    function community(){
        goto("/community");
    }
</script>
    <div id="container">
        <div class="log-in">
            <div class="name">Home Teacher</div>
            
            <button on:click={community}> Start </button>

            <div id="logout" on:click={async() => {
                await logout(data.firebaseConfig);
            }}>log-out</div>
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

	 #logout{
        margin-top: 10px;
        text-decoration: underline;
    } 
</style>
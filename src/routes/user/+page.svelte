<script lang="ts">
     import type { User } from "firebase/auth";
     import { login, logout } from "$lib/script/login";
    import { Avatar } from "flowbite-svelte"
    import type { PageServerData } from "./$types"
    import { updateCurrentUser } from "firebase/auth";
    export let data:PageServerData;

    let curUser: User | null = null; //null = 로그인 x
    let user = data.firebaseConfig;
</script>
<body>
    <div class="container">
        <div>
           <Avatar /> 
           
        </div>
    </div>
</body>
<style>
    body{
		width: 100%;
        height: 100vh;
		padding: 20px;
        background-color: rgb(237, 237, 250);
        justify-content: center;
        display: flex;
	}
    .container{
	width: 60%;
	background-color: white;
    }
</style>
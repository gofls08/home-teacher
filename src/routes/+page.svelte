<script lang="ts">
    import { login, logout } from "$lib/script/login";
    import { getAuth } from "firebase/auth";
    import type { iGroup, iUser } from "$lib/type";
    import {
        MenuButton,
        Button,
        Modal,
		Textarea,
		Toolbar,
		Avatar,
		Card,
		Search
    } from "flowbite-svelte";
    import { onMount } from "svelte";

     interface myGroup {
         name: string;
         join: boolean;
     }
     let groups: myGroup[] = [
         { name: "group-1", join: true },
         { name: "group-2", join: false },
         { name: "group-3", join: false },
     ];
import db from "$lib/db"
    const auth = getAuth();
    const curUser = auth.currentUser;
    
    let group:iGroup[]=[];
    let users:iUser[]=[];
    onMount(async () => {
        const User = await fetch(`/api/user?uid=${curUser?.uid}`);
	    users = await User.json();
        console.log(users);
        const Group = await fetch(`/api/group`);
	    group = await Group.json();
    })
	

    let con = false;

	function content() {
		con = true;
	}

    let groupName ="";

	let displayName = " ";

    let search = "";
    let s ="";

    function find(){
        search=s;
    }
</script>

<body>
    <form class="flex gap-2">
        <Search size="md" bind:value={s}/>
        <Button class="!p-2.5" on:click={find}>
            <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                /></svg
            >
        </Button>
    </form>

    <div class="container" style="display: flex;">
        {#each group  as group}
        <!-- {#each users as user} -->
            {#if group.name.includes(search)}
            <!-- {#if user.group.contain( group.name)} -->
                <Card href="./group/{group.num}" style="height:40%; margin:20px;">
                    <div class="flex justify-end">
                        <MenuButton />
                    </div>
                    <div class=" flex flex-col items-center pb-4">
                        <Avatar
                            size="lg"
                            src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?cs=srgb&dl=pexels-fauxels-3184398.jpg&fm=jpg"
                        />
                        <h5
                            class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
                        >
                            {group.name}
                        </h5>
                        <div class="flex mt-4 space-x-3 lg:mt-6">
                            <Button on:click={()=>{
                                
                            }} href="./">Left this Group</Button>
                        </div>
                    </div>
                </Card>
            {:else}
                <Card  style="height:40%; margin:20px;">
                    <div class="flex justify-end">
                        <MenuButton />
                    </div>
                    <div class=" flex flex-col items-center pb-4">
                        <Avatar
                            size="lg"
                            src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?cs=srgb&dl=pexels-fauxels-3184398.jpg&fm=jpg"
                        />
                        <h5
                            class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
                        >
                            {group.name}
                        </h5>
                        <div class="flex mt-4 space-x-3 lg:mt-6">
                            <Button>Join this Group</Button>
                        </div>
                    </div>
                </Card>
            {/if}
        <!-- {/if} -->
        {/each}
        
            

        <!-- {/each} -->
        <Modal title="Add to Content" bind:open={con} autoclose>
            <label for="editor" class="sr-only">Publish post</label>
            <input type="text" bind:value={groupName} placeholder="title" />
            <svelte:fragment slot="footer">
                <Button
                    color="purple"
                    on:click={async (e) => {
                        

                        const collection = db.collection("Group");
                        const num = collection.count
                        const description = {
                           name:groupName,
                           num,
                        };
    
                        const response = await fetch("/api/group/upload", {
                            method: "POST",
                            body: JSON.stringify({ description }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
    
                        await response.json();
                        // postting = [
                        //     ...postting,
                        //     {	
                        //         user: displayName,
                        //         group: "group1",
                        //         date: new Date(),
                        //         title,
                        //         body,
                        //         img:file.name
                        //     },
                        // ];
                        
                        e.preventDefault();
                    }}>Publish</Button
                >
                <Button color="alternative">Decline</Button>
            </svelte:fragment>
        </Modal>
    </div>
</body>

<style>
    body {
        width: 100%;
        height: 745px;
        padding: 20px;
        overflow: scroll;
        border: 1px none #000;
        background-color: rgb(237, 237, 250);
    }
</style>

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
    Search,
    SpeedDial,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { split } from "postcss/lib/list";
  import { goto } from "$app/navigation";

  interface myGroup {
    name: string;
    join: boolean;
  }

  const auth = getAuth();

	const curUser = auth.currentUser;
	let displayName = " ";
	if (curUser !== null) {
		curUser.providerData.forEach((profile) => {
			if (profile.displayName !== null) {
				displayName = profile.displayName;
			}
		});
	}

  let groups: iGroup[] = [];
  let users: iUser[] = [];
  onMount(async () => {
    const User = await fetch(`/api/user?uid=${curUser?.uid}`);
    users = await User.json();
    console.log(users);
    const Group = await fetch(`/api/group`);
    groups = await Group.json();
    console.log(groups);
  });

  let con = false;

  function content() {
    con = true;
  }

  let groupName = "";

 let name ="";

  let search = "";
  let s = "";

  function find() {
    search = s;
  }
  let files: FileList;

  function reload() {
		window.location.reload();
	}
</script>

<body>
  <form class="flex gap-2">
    <Search size="md" bind:value={s} />
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
    {#each groups as group}
      {#each users as user}
       {#if group.name.includes(search)}
           {#if user.group.includes(group.name)}
       <Card href="./group/{group.name}" style="height:40%; margin:20px;">
          <div class="flex justify-end">
            <MenuButton />
          </div>
          <div class=" flex flex-col items-center pb-4">
            <Avatar
              size="lg"
              src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?cs=srgb&dl=pexels-fauxels-3184398.jpg&fm=jpg"
            />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {group.name}
            </h5>
            <div class="flex mt-4 space-x-3 lg:mt-6">
              <Button href="/" on:click={async (e) => {
                
                const res = await fetch("/api/user/delete", {
                  method: "POST",
                  body: JSON.stringify({
                    uid: user.uid,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                
               
                await res.json();
                user.group = user.group.replace(group.name + ',', '');
                const description = {
                  name: user.name,
                  uid: user.uid,
                  group: user.group
                };
                
                const response = await fetch("/api/user/upload", {
                  method: "POST",
                  body: JSON.stringify({
                    description,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                // e.stopPropagation();
                await response.json();
                // e.preventDefault();
                
                
              }}>Left this Group</Button>
            </div>
          </div>
        </Card>
      {:else}
      
        <Card style="height:40%; margin:20px;">
          <div class="flex justify-end">
            <MenuButton />
          </div>
          <div class=" flex flex-col items-center pb-4">
            <Avatar
              size="lg"
              src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?cs=srgb&dl=pexels-fauxels-3184398.jpg&fm=jpg"
            />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {group.name}
            </h5>
            <div class="flex mt-4 space-x-3 lg:mt-6">
              <Button href="./group/{group.name}"
                on:click={async (e) => {
                  const res = await fetch("/api/user/delete", {
                    method: "POST",
                    body: JSON.stringify({
                      uid: user.uid,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  
                 
                  await res.json();
                  name = name + ', '+group.name;

                  const description = {
                    name: user.name,
                    uid: user.uid,
                    group: user.group +',' + name,
                  };
                  
                  const response = await fetch("/api/user/upload", {
                    method: "POST",
                    body: JSON.stringify({
                      description,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  await response.json();
                  
                  e.preventDefault();
                 
                }}>Join this Group</Button
              >
            </div>
          </div>
        </Card>
        
        {/if}
        {/if}
      {/each}
    {/each}
  </div>
  <div on:click={content}>
    <SpeedDial
      defaultClass="absolute left-18 bottom-6"
      color="purple"
      tooltip="none"
      style="background-color:rgb(132, 132, 216);"
    >
      <svg
        slot="icon"
        aria-hidden="true"
        class="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
        /></svg
      >
    </SpeedDial>
  </div>

  <Modal title="Add to Content" bind:open={con} autoclose>
    <label for="editor" class="sr-only">Publish post</label>
    <input
      type="text"
      bind:value={groupName}
      placeholder="Write a group name"
    />

    <Toolbar color="dark" slot="header" embedded>
      <input type="file" accept="image/*" bind:files />
    </Toolbar>
    <hr />

    <!-- <img { src } alt="" style="height: 30%; width:30%"> -->
    <svelte:fragment slot="footer">
      <Button
        color="purple"
        on:click={async (e) => {
          const description = {
            name: groupName,
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

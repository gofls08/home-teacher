<script lang="ts">
    import { login, logout } from "$lib/script/login";
    import {
        Card,
        MenuButton,
        Dropdown,
        DropdownItem,
        Avatar,
        Button,
        Search,
    } from "flowbite-svelte";

    interface myGroup {
        GroupName: string;
        join: boolean;
    }
    let groups: myGroup[] = [
        { GroupName: "group-1", join: true },
        { GroupName: "group-2", join: false },
        { GroupName: "group-3", join: false },
    ];

</script>

<body>
    <form class="flex gap-2">
        <Search size="md" />
        <Button class="!p-2.5">
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
        {#each groups as { GroupName, join }, i}
            {#if join}
                <Card href="./group/{i + 1}" style="height:40%; margin:20px;">
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
                            {GroupName}
                        </h5>
                        <div class="flex mt-4 space-x-3 lg:mt-6">
                            <Button>Left this Group</Button>
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
                            {GroupName}
                        </h5>
                        <div class="flex mt-4 space-x-3 lg:mt-6">
                            <Button>Join this Group</Button>
                        </div>
                    </div>
                </Card>
            {/if}

        {/each}
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

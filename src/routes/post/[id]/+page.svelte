<script lang="ts">
    import { ImagePlaceholder } from "flowbite-svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import { Img, Avatar } from "flowbite-svelte";
    import type { iPost,iUser } from "$lib/type";
    import type {Reply} from "$lib/type";
    let replies: Reply[] = [];
    export let data:PageServerData;
    let content = "";
    const posts = data.result;
    import { getAuth } from "firebase/auth";
    import type { PageServerData } from "./$types";

    const auth = getAuth();

    onMount(async () => {
		
		const group = "group1";
		const reply = await fetch(`/api/reply?group=${group}`);
		replies = await reply.json();
		console.log(replies);
        console.log(`https://project0884.s3.ap-northeast-2.amazonaws.com/${posts.img}`)
	})

    const curUser = auth.currentUser;
    let displayName = " ";
    if (curUser !== null) {
        curUser.providerData.forEach((profile) => {
            if (profile.displayName !== null) {
                displayName = profile.displayName;
            }
        });
    }
</script>

<body>
    <div class="container">
        <div class="post">
            <div style="font-size: 30px; font-weight:bold;">
                {posts.title}
            </div>
            <div class="right">
                <div style="color: gray; font-size:15px;">{posts.user}</div>
                <div style="color: gray; font-size:15px;">{posts.date}</div>
            </div>
            <hr />
            <div style="margin: 20px;">{posts.body}</div>
            {#if posts.img}
               <Img
                src="https://project0884.s3.ap-northeast-2.amazonaws.com/{posts.img}"
                alt="sample 1"
                size="max-w-lg"
                class="rounded-lg"
                style="text-align:center;  margin-bottom: 20px;"
            /> 
            {/if}
            
            <hr />
            <div>
                {#if curUser}
                    {#each replies as reply, i}
                        {#if posts._id === reply.postId}
                            {#if i >= replies.length - 3}
                            <div
                                style="margin-top: 30px; margin-left:10px;"
                            >
                                <span class="profile"
                                    >{reply.user.charAt(0)}</span
                                >
                                <div class="reply">{reply.content}</div>
                                <div class="date">{reply.date}</div>
                            </div>
                            {/if}
                        {/if}
                    {/each}

                    <!-- <textarea
                        bind:value={content}
                        on:keypress={async (e) => {
                            if (e.code === "Enter" && !e.shiftKey) {
                                const description = {
                                    postId: posts._id,
                                    user: displayName,
                                    date: new Date(),
                                    content,
                                    group:'group1'
                                };

                                const response = await fetch(
                                    "/api/reply/upload",
                                    {
                                        method: "POST",
                                        body: JSON.stringify({
                                            description,
                                        }),
                                        headers: {
                                            "Content-Type":
                                                "application/json",
                                        },
                                    }
                                );

                                await response.json();
                                 replies = [
                                     ...replies,
                                     {
                                         postId: posts._id,
                                         user: displayName,
                                         date: new Date(),
                                         content,
                                         group:'group1'
                                     },
                                 ];
                                content = "";
                                e.preventDefault();
                                console.log(replies);
                            }
                        }}
                        placeholder="Press Enter for send message."
                    /> -->
                {/if}
            </div>
        </div>
    </div>
</body>

<style>
    .container {
        width: 60%;
        height: 100vh;
		padding-bottom: 20px;
        background-color: white;
    }
    /* .group{
		margin-top: 30px;
		width: 100%;
		height:300px;
		padding-bottom: 20px;
		overflow: scroll;
		border: 1px none #000;
		overflow: auto;
		white-space: nowrap;
	} */
    body {
        width: 100%;
        height: 690px;
        padding: 20px;
        border: 1px none #000;
        background-color: rgb(237, 237, 250);
        justify-content: center;
        display: flex;
        padding: 20px;
		overflow: scroll;
		border: 1px none #000;
    }
    .right {
        text-align: right;
        margin: 20px;
    }
    .post {
        margin: 20px;
    }
    .reply {
        display: inline-block;
        word-break: break-all;
        margin: 5px 20px;
        max-width: 75%;
        border: 1px solid #888;
        padding: 10px;
        border-radius: 5px;
        background-color: #fcfcfc;
        color: #555;
        text-align: left;
    }
    .profile {
        border: 1px solid black;
        border-radius: 100%;
        padding: 10px;
        margin: 10px;
    }
    textarea {
        width: 55%;
        height: 80px;
        position: fixed;
        bottom: 15px;
        border: 1px solid white;
        border-top: 1px solid rgb(132, 132, 216);
        padding: 10px;
    }
    .date {
        color: gray;
        font-size: 12px;
        text-align: right;
    }
    /* .input{
       
		bottom: 0;
		width: 52%;
		background-color: #fff;
		border-top: 1px solid rgb(132, 132, 216);
    } */
</style>

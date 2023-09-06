<script lang="ts">
    import { ImagePlaceholder } from "flowbite-svelte";
    import { Img, Avatar } from "flowbite-svelte";
    interface iPost {
        post: string;
        user: any | null;
        group: string;
        date: Date;
        title: string;
        body: string;
        img: string;
    }
    interface Reply {
        post: string;
        user: any | null;
        date: Date;
        content: string;
    }
    let replies: Reply[] = [
        {
            post: "djfjlskfldjfksj",
            user: "황해린",
            date: new Date(),
            content: "집에 가고 싶다.",
        },
    ];
    let posts: iPost[] = [
        {
            post: "djfjlskfldjfksj",
            user: "황해린",
            group: "group1",
            date: new Date(),
            title: "오늘 수학 숙제",
            body: "오늘 수학 숙제 교과서 50p~55p임 내일까지 수학부장에게 제출",
            img: "https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg",
        },
    ];
    let content = "";

    import { getAuth } from "firebase/auth";

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
	
</script>

<body>
    <div class="container">
        {#each posts as posts}
            <div class="post">
                <div style="font-size: 30px; font-weight:bold;">{ posts.title}</div>
                <div class="right">
                    <div style="color: gray; font-size:15px;">{ posts.user}</div>
                    <div style="color: gray; font-size:15px;">{ posts.date}</div>
                </div>
                <hr />
                <div style="margin: 20px;">{ posts.body}</div>
                <Img
                    src={ posts.img}
                    alt="sample 1"
                    size="max-w-lg"
                    class="rounded-lg"
                    style="text-align:center; margin-left:20%; margin-bottom: 20px;"
                />
                <hr />
                <div>
                    
                {#if curUser}
                    {#each replies as replies}
                        {#if posts.post === replies.post}
                            <div style="margin-top: 30px; margin-left:10px;">
                                <span class="profile">{replies.user.charAt(0)}</span>
                                <div class="reply">{replies.content}</div>
                                <div class="date">{replies.date}</div>
                            </div>
                        {/if}
                    {/each}
                    
                    <textarea
                        bind:value={content}
                        on:keypress={async(e) => {
                            if (e.code === "Enter" && !e.shiftKey) {
                                const description={
                                    post:posts.post,
                                        user: displayName,
                                        date: new Date(),
                                        content,
									 	}
										
									const response = await fetch("/api/post/upload", {
										method: "POST",
										body: JSON.stringify({ description }),
										headers: {
											"Content-Type": "application/json",
										},
									});
									
									

									await response.json();
                                replies = [
                                    ...replies,
                                    {
                                        post:posts.post,
                                        user: displayName,
                                        date: new Date(),
                                        content,
                                    },
                                ];
                                content="";
                                e.preventDefault();
                                console.log(replies);
                            }
                        }}
                        placeholder="Press Enter for send message."
                    ></textarea>
                
                {/if}
                
                </div>
                
            </div>
        {/each}
    </div>
</body>

<style>
    .container {
        width: 60%;
        height: 150%;
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
        height: 745px;
        padding: 20px;
        overflow: scroll;
        border: 1px none #000;
        background-color: rgb(237, 237, 250);
        justify-content: center;
        display: flex;
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
    textarea{
		width: 100%;
		height: 80px;
        
        border: 1px solid white;
        border-top: 1px solid rgb(132, 132, 216);
		padding: 10px;
    }
    .date{
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

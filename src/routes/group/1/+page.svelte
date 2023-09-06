<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import {
		S3Client,
		AbortMultipartUploadCommand,
		GetObjectCommand,
	} from "@aws-sdk/client-s3";
	const dispatch = createEventDispatcher();
	const albumBucketName = "project0884";
	const bucketRegion = "ap-northeast-2";
	import {
		Modal,
		Button,
		Textarea,
		Toolbar,
		ToolbarGroup,
		ToolbarButton,
		SpeedDial,
		Avatar,
		Card,
	} from "flowbite-svelte";

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
	interface iPost {
        post: string;
        user: any | null;
        group: string;
        date: Date;
        title: string;
        body: string;
        img: string;
    }

	let chat = "";
	interface iChat {
		// _id: string;
		user: any | null;
		chat: string;
		date: Date;
		group: string;
	}
	// let files: FileList;
	// let src = "";
	// $: {
	// 	if (files?.[0]) {
	// 		let t = files[0];
	// 		fetch(`/community/img?name=${t.name}`, {
	// 			method: "POST",
	// 			body: t,
	// 		}).then((v) => v.text());
	// 		URL.revokeObjectURL(src);
	// 		src = URL.createObjectURL(t);
	// 	}
	// }

	let con = false;

	function content() {
		con = true;
	}
	function x() {
		con = false;
	}

	let chatting:iChat[] =[];
	let posts:iPost[]=[
		{
            post: "djfjlskfldjfksj",
            user: "황해린",
            group: "group1",
            date: new Date(),
            title: "오늘 수학 숙제",
            body: "오늘 수학 숙제 교과서 50p~55p임 내일까지 수학부장에게 제출",
            img: "https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg",
        }
	];

	onMount(async () => {
		const s3 = new S3Client({
			apiVersion: "2006-03-01",
			region: bucketRegion,
			credentials: {
				accessKeyId: "AKIASQRGQ2EAQF2ICHV4",
				secretAccessKey: "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",
			},
		});
		const pro = await s3.send(
			new GetObjectCommand({
				Bucket: albumBucketName,
				Key: "포켓몬스터 시리즈/index.html",
			})
		);
		const group = 'group1'
        const chat = await fetch(`/api/chat?group=${group}`);
        chatting = await chat.json();
		const post = await fetch(`/api/post?group=${group}`);
        // posts = await post.json();
		// console.log(await pro.Body.)
	});
	
	function reload(){
		window.location.reload();
	}

	
</script>

<body>
	<div style="display:flex; margin:20px;">
		<div class="group">
			{#each posts as post}
				<div style="width: 300px; height:200px;display:inline-block;margin-left:30px;">
				<Card
					href="/post"
					img="https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg"
				>
					<h5
						class=" text-xl font-bold tracking-tight text-gray-900 dark:text-white"
					>
						{post.title.slice(0,15)}...
					</h5>
					<p
						class=" font-normal text-gray-700 dark:text-gray-400 leading-tight"
					>
						{post.body.slice(0,20)}...
					</p>
				</Card>
			</div>
			{/each}
		</div>
		{#if curUser}
			<div
				class="message"
				style="width:30%;mergin-left:20px; background-color:white;"
			>
				<div class="chat_wrap">
					<div class="header">CHAT</div>
					<div class="chat">
						<ul>
							{#each chatting as json, i}
								{#if i>=chatting.length-10}
										<li
									class={displayName === json.user
										? "right"
										: "left"}
								>
									{#if displayName === json.user}
										<div class="message">{json.chat}</div>
										<span class="profile"
											>{json.user.charAt(0)}</span
										>
									{:else}
										<span class="profile"
											>{json.user.charAt(0)}</span
										>
										<div class="message">{json.chat}</div>
									{/if}
								</li>								
								{/if}
								
							{/each}
						</ul>
					</div>
					<div class="input-div">
						<textarea
							bind:value={chat}
							on:keypress={async (e) => {
								if (e.code === "Enter" && !e.shiftKey) {
									// chats = [
									// 	...chats,
									// 	,
									// ];
									const description={
									 		user: displayName,
									 		chat,
									 		date: new Date(),
									 		group: "group1",
									 	}
										
									const response = await fetch("/api/chat/upload", {
										method: "POST",
										body: JSON.stringify({ description }),
										headers: {
											"Content-Type": "application/json",
										},
									});
									
									// Array(displayName, chat, new Date());

									await response.json();
									chatting = [
										...chatting,
										{
											user: displayName,
									 		chat,
									 		date: new Date(),
									 		group: "group1",
										},
									];
									chat = "";
									reload();
									e.preventDefault();
								}
							}}
							placeholder="Press Enter for send message."
						/>
					</div>
				</div>
			</div>
		{/if}
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
		<Textarea
			id="editor"
			rows="8"
			class="mb-4"
			placeholder="Write a comment"
		>
			<Toolbar color="dark" slot="header" embedded>
				<ToolbarGroup>
					<ToolbarButton name="Attach file"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
							/></svg
						></ToolbarButton
					>
					<ToolbarButton name="Embed map"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
							/><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
							/></svg
						></ToolbarButton
					>

					<ToolbarButton name="Upload image"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
							/></svg
						></ToolbarButton
					>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton name="Format code"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
							/></svg
						></ToolbarButton
					>
					<ToolbarButton name="Add emoji"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
							/></svg
						></ToolbarButton
					>
				</ToolbarGroup>
				<ToolbarButton name="send" slot="end"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
						/></svg
					></ToolbarButton
				>
			</Toolbar>
			<!-- <img { src } alt="" style="height: 30%; width:30%"> -->
		</Textarea>
		<svelte:fragment slot="footer">
			<Button color="purple" on:click={() => alert('Handle "success"')}
				>Publish</Button
			>
			<Button color="alternative">Decline</Button>
		</svelte:fragment>
	</Modal>
</body>

<style>
	body {
		background-color: rgb(237, 237, 250);
		height: 100vh;
		width: 100vw;
	}
	.group {
		margin-top: 30px;
		width: 70%;
		height: 100vh;
		padding-bottom: 20px;
		overflow: scroll;
		border: 1px none #000;
		overflow: auto;
		white-space: nowrap;
		border-right: 1px solid white;
	}
	body {
		width: 100%;
		height: 745px;
		padding: 20px;
		overflow: scroll;
		border: 1px none #000;
	}

	* {
		margin: 0;
		padding: 0;
	}

	.chat_wrap .header {
		font-size: 14px;
		padding: 15px 0;
		background: rgb(132, 132, 216);
		color: white;
		text-align: center;
		font-weight: bold;
	}

	.chat_wrap .chat {
		padding-bottom: 80px;
		margin-top: 1;
	}
	.chat_wrap .chat ul {
		width: 100%;
		list-style: none;
	}
	.chat_wrap .chat ul li {
		width: 100%;
	}
	.chat_wrap .chat ul li.left {
		text-align: left;
	}
	.chat_wrap .chat ul li.right {
		text-align: right;
	}
	.chat_wrap .chat ul li > span.profile {
		border: 1px solid black;
		border-radius: 100%;
		padding: 10px;
		margin: 10px;
	}

	.chat_wrap .chat ul li > div {
		font-size: 13px;
	}
	
	.chat_wrap .chat ul li > div.message {
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

	.chat_wrap .input-div {
		position: fixed;
		bottom: 0;
		width: 432px;
		background-color: #fff;
		text-align: center;
		border-top: 1px solid rgb(132, 132, 216);
	}
	.chat_wrap .input-div > textarea {
		width: 100%;
		height: 80px;
		border: none;
		padding: 10px;
	}

	
</style>

<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import {
		S3Client,
		AbortMultipartUploadCommand,
		GetObjectCommand,
		PutObjectCommand,
		ListObjectsV2Command
	} from "@aws-sdk/client-s3";
	import type { iPost, iChat } from "$lib/type";
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
		Search
	} from "flowbite-svelte";
	export let data:PageServerData;
	import type { PageServerData } from "./$types";
	const s3 = new S3Client({
			apiVersion: "2006-03-01",
			region: bucketRegion,
			credentials: {
				accessKeyId: data.result.aws.AWS_ACCESS,
				secretAccessKey: data.result.aws.AWS_SECRET_ACCESS
			},
		});

	import { getAuth } from "firebase/auth";
    import type { ImgType } from "flowbite-svelte/dist/types";

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

	let chat = "";
	const group = data.result.params.name;
	let con = false;

	function content() {
		con = true;
	}
	function x() {
		con = false;
	}

	let title = "";
	let body = "";

	let chatting: iChat[] = [];
	let postting: iPost[] = [];
	let ws:WebSocket;
	onMount(async () => {
		
		ws = new WebSocket('ws://localhost:3500');
		const openFunc = () => {
			console.log('연결 완료')
			// ws.send(JSON.stringify({type:'init', id:displayName}))
		}
		const closeFunc = (ev:CloseEvent) => {
			console.log('연결 끊김')
		}
		const errorFunc = (ev:Event) => {
			console.log('연결 오류')
		}
		const messageFunc = (ev:MessageEvent<any>) => {
			const json = JSON.parse(ev.data)
			
			if(json.type === 'common'){
				 if(String(json.group) === group){
					chatting = [
					...chatting,
					{
						user: json.id,
						chat: json.mes,
						date: new Date(),
						group: json.group
					},
				];
				}
				
				
			 }
		}
		ws.addEventListener('open', openFunc)
		ws.addEventListener('close', closeFunc)
		ws.addEventListener('error', errorFunc)

		ws.addEventListener('message', messageFunc)
		const chat = await fetch(`/api/chat?group=${group}`);
		chatting = await chat.json();
		const post = await fetch(`/api/post?group=${group}`);
		postting = await post.json();
		return () => {
			ws.removeEventListener('open', openFunc)
			ws.removeEventListener('close', closeFunc)
			ws.removeEventListener('error', errorFunc)
			ws.removeEventListener('message', messageFunc)
		}
	})
	
	// async function img(){
	// 	const get = await s3.send(
	// 		new GetObjectCommand({
	// 			Bucket: albumBucketName,
	// 			Key: 
	// 		})
	// 	);
	// }
	
	

	let search="";
	
	let files: FileList;
	 
	let src = "";
	// $: {
	// 	if (files?.[0]) {
	// 		let t = files[0];
	// 		URL.revokeObjectURL(src);
	// 		src = URL.createObjectURL(t);
	// 	}
	// }
	let webId;
	let webMes;
	let a="";
	function find(){
		search=a;
	}
	let num=0;
</script>

<body>
	<form class="flex gap-2">
			<Search size="md"  bind:value={a}/>
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
	<div style="display:flex; margin:20px;">
		
		<div class="group">
			{#each postting as post}
			{#if post.body.includes(search)  || post.title.includes(search)}
				<!-- <div
					style="width: 300px; height:200px; display:inline-block; margin-left:30px;"
				> -->
				<span>
					<Card
						href="/post/{post._id}"
						img="https://project0884.s3.ap-northeast-2.amazonaws.com/{post.img}"
					>
						<h5
							class=" text-xl font-bold tracking-tight text-gray-900 dark:text-white"
						>
							{post.title.slice(0, 15)}...
						</h5>
						<p
							class=" font-normal text-gray-700 dark:text-gray-400 leading-tight"
						>
							{post.body.slice(0, 20)}...
						</p>
						
					</Card> 
				</span>
					
				<!-- </div> -->
			{/if}
				
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
								{#if i >= chatting.length - 10}
									<li
										class={displayName === json.user
											? "right"
											: "left"}
									>
										{#if displayName === json.user}
											<div class="message">
												{json.chat}
											</div>
											<span class="profile"
												>{json.user.charAt(0)}</span
											>
										{:else}
											<span class="profile"
												>{json.user.charAt(0)}</span
											>
											<div class="message">
												{json.chat}
											</div>
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
									ws.send(JSON.stringify({type:'common', id:displayName, mes:chat, group:group}));
									const description = {
										user: displayName,
										chat,
										date: new Date(),
										group: group,
									};

									const response = await fetch(
										"/api/chat/upload",
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

									// Array(displayName, chat, new Date());

									await response.json();
									
									chat = "";
									
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
		<input type="text" bind:value={title} placeholder="title" />
		<Textarea
			id="editor"
			rows="8"
			class="mb-4"
			placeholder="Write a comment"
			bind:value={body}
		>
			<Toolbar color="dark" slot="header" embedded>
				<input type="file" accept="image/*" bind:files />
			</Toolbar>
			<hr />

			<!-- <img { src } alt="" style="height: 30%; width:30%"> -->
		</Textarea>
		<svelte:fragment slot="footer">
			<Button
				color="purple"
				on:click={async (e) => {
					let file = files[0]
					const description = {
						user: displayName,
						group: group,
						date: new Date(),
						title,
						body,
						img:file.name
					};
					const response = await fetch("/api/post/upload", {
						method: "POST",
						body: JSON.stringify({ description }),
						headers: {
							"Content-Type": "application/json",
						},
					});
					
					const blob = new Blob([file], { type: file.type });		
					const pro = await s3.send(new PutObjectCommand({
								Bucket:"project0884",
								Key:file.name,
					 			Body:blob,
							}))
							
					
					await response.json();
					postting = [
						...postting,
						{	
							user: displayName,
							group: group,
							date: new Date(),
							title,
							body,
							img:file.name
						},
					];
					src="";
					console.log(files);
					title = "";
					body = "";
					e.preventDefault();
				}}>Publish</Button
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

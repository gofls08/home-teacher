<script lang="ts">
	
	import {
		Modal,
		Button,
		Textarea,
		Toolbar,
		ToolbarGroup,
		ToolbarButton,
		SpeedDial,
		SpeedDialButton,
		Banner,
		Skeleton,
		ImagePlaceholder,
		CardPlaceholder,
		Card
	} from 'flowbite-svelte'

	let files:FileList;
    let src = '';
    $:{
        if(files?.[0]){
            let t = files[0];
            fetch(`/community/img?name=${t.name}`, {
                method:'POST',
                body:t
            })
                .then(v => v.text());
            URL.revokeObjectURL(src);
            src = URL.createObjectURL(t);
        }
    }

	let con=false;

	function content(){
		con=true;
	}
	function x(){
		con=false;
	}
	
	const groupList = [];

 	
</script>

<body>
	<div style="font-size: 40px; font-weight:bold;">
		Community
	</div>

	<br>
	<!-- {#each groupList as name }
		
	{/each} -->
	<div class="group" >
		<div style="margin: 10px; font-size:25px; font-weight:bold;">group-1</div>
		<Card href="./group/1" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">집 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/1" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">가 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/1" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">고 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/1" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">싶 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/1" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">다 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
	</div>
	<div class="group">
		<div style="margin: 10px; font-size:25px; font-weight:bold;">group-2</div>
		<Card href="./group/2" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">집 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/2" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">보 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/2" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">내 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/2" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">줘 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/2" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">요 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
	</div>
	<div class="group">
		<div style="margin: 10px; font-size:25px; font-weight:bold;">group-3</div>
		<Card href="./group/3" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">나 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/3" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">머 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/3" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">지 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/3" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">싫 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/3" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">어 Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
	</div>
	<div class="group">
		<div style="margin: 10px; font-size:25px; font-weight:bold;">group-4</div>
		<Card href="./group/4" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/4" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/4" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/4" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
			<Card href="./group/4" style="display:inline-block; height:200px; white-space:normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
				</p>
			</Card>
	</div>

<div on:click={content} >
	<SpeedDial defaultClass="absolute right-24 bottom-6" color="purple"  tooltip="none" style="background-color:rgb(132, 132, 216);">
    <svg slot="icon" aria-hidden="true" class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
</SpeedDial>
</div>	


	
	<Modal title="Add to Content" bind:open={con} autoclose>
		<label for="editor" class="sr-only">Publish post</label>
		<Textarea id="editor" rows="8" class="mb-4" placeholder="Write a comment">
			<Toolbar color="dark" slot="header" embedded>
			<ToolbarGroup>
				<ToolbarButton name="Attach file"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg></ToolbarButton>
				<ToolbarButton name="Embed map"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg></ToolbarButton>
				<ToolbarButton name="Upload image" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg></ToolbarButton>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton name="Format code"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg></ToolbarButton>
				<ToolbarButton name="Add emoji"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg></ToolbarButton>
			</ToolbarGroup>
			<ToolbarButton name="send" slot="end"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg></ToolbarButton>
			</Toolbar>
			<!-- <img { src } alt="" style="height: 30%; width:30%"> -->
		</Textarea>
		<svelte:fragment slot='footer'>
			<Button color="purple" on:click={() => alert('Handle "success"')}>Publish</Button>
			<Button color="alternative">Decline</Button>
		</svelte:fragment>
	</Modal>
	
	
</body>

<style>
	body{
		background-color: rgb(237, 237, 250);
		height: 100vh;
	}
	span{
		border: 1px solid black;
		background-color: black;
		width: 100px;
		height: 100px;
	}
	.group{
		margin-top: 30px;
		width: 100%;
		height:300px;
		padding-bottom: 20px;
		overflow: scroll;
		border: 1px none #000;
		overflow: auto;
		white-space: nowrap;
	}
	body{
		width: 100%;
		height: 745px;
		padding: 20px;
		overflow: scroll;
		border: 1px none #000;
	}
</style>

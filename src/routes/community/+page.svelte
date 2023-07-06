<script lang="ts">
	import Sidebar from "../../lib/component/sidebar.svelte";

	let isSide = true;

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
                // .then(v => console.log(v));
            URL.revokeObjectURL(src);
            src = URL.createObjectURL(t);
        }
    }

	function is() {
		isSide = true;
	}

	function content(){

	}
</script>

<body>
	<div style="text-align:right; font-size: 20px; margin-right: 5px;" on:click={is}>O</div>
	<div id="name">Community</div>
	<div class="searchBox">
		<span>
			<input id="search" type="text" placeholder="Type to Search 🔍" />
		</span>
	</div>
	<div>
		<button on:click={content}>+content</button>
	</div>
	<div class="content">
		<input class="title" type="text" placeholder="title">
		<hr>
		<input type="file" accept="image/*" bind:files={files}>
		<img { src } alt="" style="height: 30%; width:30%">
		<input class="text" type="text" placeholder="content">
	</div>
	{#if isSide}
		<main>
			<div id="side">
				<Sidebar on:exit={() => (isSide = false)}
				/>
			</div>
		</main>
	{/if}
</body>

<style>
	#name{
		margin: 0;
		font-size: 40px;
		text-align: center;
		font-weight: bold;
	}
	body {
		background-color: rgb(237, 237, 250);
		height: 100vh;
	}
	#search {
		display: block;
		border: 1px none rgb(132, 132, 216);
		border-radius: 30px;
		height: 20px;
		width: 800px;
		text-align: center;
	}
	.searchBox {
		margin: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		/* width:100%; */
		/* height:100vh; */
		overflow: hidden;
	}
	main {
		display: flex;
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
		box-sizing: border-box;
	}
	#side {
		position: fixed;
		right: 0;
		top: 0;
		height: 100vh;
		width: 320px;
		background-color: white;
	}
	button {
        display: block;
        border: 1px solid rgb(132, 132, 216);
        background-color: rgb(132, 132, 216);
        border-radius: 30px;
        height: 30px;
        padding: 0 20px;
        text-align: center;
        color: white;
        font-size: 15px;
        margin-left: 69%;
        margin-top: 20px;
    }
	.content>input{
		display: block;
		background-color: black;
		color: white;
		display: block;
		border: 1px solid black;
		width: 90%;
	}
	.content{
		
		background-color: black;
		width: 700px;
		height: 500px;
	}
	.title{
		font-size: 20px;
	}
	
</style>

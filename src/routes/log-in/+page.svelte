<script lang="ts">
	 import { onMount } from "svelte";

	 function main(){
		location.href = "/main";
	 }
	
</script>
<div id="container">
	<div class="log-in">
		<div class="name">Home Teacher</div>
		<button on:click={main}> Sign in with Google </button>
	</div>
</div>

<style>
	#container{
		display: flex;
		justify-content: center;
		align-items: center;
		width:100%;
		height:100vh;
		overflow: hidden;
	}
	.log-in{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.name {
		font-size: 50px;
		font-weight: bold;
		margin-bottom: 50px;
		text-align: center;
	}
	button {
		display: block;
		border: 1px solid rgb(132, 132, 216);
		background-color: rgb(132, 132, 216);
		border-radius: 30px;
		height: 56px;
		width: 300px;
		padding: 0 20px;
		text-align: center;
		color: white;
		font-size: 15px;
	}
	
</style>

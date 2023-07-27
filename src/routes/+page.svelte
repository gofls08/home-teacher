<script lang="ts">
	  import { logout } from "$lib/script/login";
	import { goto } from "$app/navigation";
    import { Card,  Button } from 'flowbite-svelte'
    import type { PageServerData } from "./$types"
    export let data:PageServerData;
	
    function one(){
        goto('/1');
    }
	
</script>
<body>
	<div class="container">
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
    
        <!-- <div class="group 1" style="margin: 30px;" on:click={one}>
            <div style="font-size: 20px; margin-bottom:10px">Group1</div>
            <div style="width: 250px; height:200px;display:inline-block;">
                <Card img="https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg">
                    <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology</h5>
                    <p class=" font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        Here are the biggest enterprise technology... 
                    </p>
                </Card>
            </div>
            <div style="width: 250px; height:200px;display:inline-block; margin-left:30px;">
                <Card img="https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg">
                    <h5   class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology</h5>
                    <p class=" font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        Here are the biggest enterprise technology... 
                    </p>
                </Card>
            </div>
            <div style="width: 250px; height:200px;display:inline-block; margin-left:30px;">
                <Card img="https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg">
                    <h5   class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology</h5>
                    <p class=" font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        Here are the biggest enterprise technology... 
                    </p>
                </Card>
            </div>
        </div>
        <div class="group 2" style="margin:30px;" on:click={one}>
            <div style="font-size: 20px; margin-bottom:10px">Group2</div>
            <div style="width: 250px; height:200px;display:inline-block;">
                <Card img="https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg">
                    <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology</h5>
                    <p class=" font-normal text-gray-700 dark:text-gray-400 leading-tight">
                        Here are the biggest enterprise technology... 
                    </p>
                </Card>
            </div>
        </div> -->
    </div>
</body>
	
    <!-- <div id="container">
        <div class="log-in">
            <div class="name">Home Teacher</div>
            
            <button on:click={community}> Start </button>

            <div id="logout" on:click={async() => {
                await logout(data.firebaseConfig);
            }}>log-out</div>
        </div>
    </div> -->

<style>
 .container{
    margin-top: 5%;
	width: 60%;
	height: 200%;
	background-color: white;

    
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
        background-color: rgb(237, 237, 250);
        justify-content: center;
        display: flex;
	}
</style>

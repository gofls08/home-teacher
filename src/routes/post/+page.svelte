<script lang="ts">
    import { ImagePlaceholder } from 'flowbite-svelte';
    import { Img } from 'flowbite-svelte';
    interface iPost {
        post: string;
		user: any | null;
        group: string;
        date: Date;
        title: string;
		body: string;
        img:string;
	}
    let post: iPost[] = [
		{
        post: 'djfjlskfldjfksj',
		user: '황해린',
        group: 'group1',
        date: new Date(),
        title: '오늘 수학 숙제',
		body: '오늘 수학 숙제 교과서 50p~55p임 내일까지 수학부장에게 제출',
        img: 'https://img.sbs.co.kr/newimg/news/20181126/201253735_1280.jpg',
        }
	];
</script>
<body>
    <div class="container">
        {#each post as {user, img, date, title, body}}
        <div class="post">
            <div style="font-size: 30px; font-weight:bold;"> {title} </div>
            <div class="right">
                <div style="color: gray; font-size:15px;"> {user} </div>  
                <div style="color: gray; font-size:15px;"> {date} </div>
            </div>
            <hr>
            <div style="margin: 20px;">{body}</div>
            <Img src={img} alt="sample 1" size="max-w-lg" class="rounded-lg" style="text-align:center; margin-left:20%; margin-bottom: 20px;" />
            <hr>
        </div>
        {/each}

    </div>
</body>
<style>
    .container{
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
    .right{
        text-align: right;
        margin: 20px;
    }
    .post{
        margin: 20px;
    }
</style>
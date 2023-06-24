<script>
     import { createEventDispatcher } from "svelte";
     import { onMount } from "svelte";
   
     
      const dispatch = createEventDispatcher();

    const is = () => {
        dispatch("exit");
    };

     function Community(){
          location.href = '/community';
     }
     function Group(){
          location.href = '/group';
     }
     function Message(){
          location.href = '/message';
     }

     function main(){
          location .href= '/';
     }
</script>

<body>
     <main>
          <span style="margin-left:300px; font-size: 20px;" on:click={is}>X</span>
          <div class="container">
          <div id="name">Home-Teacher</div>
          <ul>
               <li on:click={Community}>
                    Community
               </li>
               <li on:click={Group}>
                    Group
               </li>
               <li on:click={Message}>
                    Message
               </li>
          </ul>
          <div id="logout" on:click={main}>log-out</div>
     </div>
     </main>
     
</body>

<style>
     #name {
          font-size: 25px;
          font-weight: bold;
          margin-bottom: 50px;
          text-align: center;
          margin-top: 20px;
          margin-bottom: 40px;
     }
    li{
     margin: 10px;
    }
    #logout{
     text-align: center;
     margin-top: 500px;
     /* margin-right: 5px; */
    }
</style>

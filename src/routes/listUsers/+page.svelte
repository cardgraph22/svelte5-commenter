<!-- listUsers-->
<script>
  let { data } = $props();
  let users = $state([]);
  if(data){
    let obj = JSON.stringify(data.users)
    users = JSON.parse(obj)
  }
</script>

{#if users}
  {#each users as user, idx}
    <div class="row">
      <!--<div class="item">{user._id}</div>-->
      <div class="item">{user.username}</div>
      <!--<div class="item">{user._id}</div>-->
      <!--<div class="item">{user.password}</div>-->
      <div class="item">{user.imagename}</div>

      <form method="POST">
        <button>Delete</button>
        <input type="hidden" name="userid" value={user._id}>
      </form>
    </div>
  {/each}
{/if}

<style>
  .row {
    display: flex;
  }
  .item {
    flex: 1 1 0;
  }
</style>
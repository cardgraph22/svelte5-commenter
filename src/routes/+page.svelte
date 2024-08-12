<!--  main (home, landing) page  -->
<script>
  let { data, form } = $props();
  import { enhance } from '$app/forms';
  import BlogItem    from "$lib/Components/BlogItem.svelte";
  import Dialog      from '$lib/Components/Dialog.svelte'
  import userStore   from "$stores/UserStore";   //  the user logged in (if any)
  import blogsStore  from "$stores/BlogsStore";  //  all blogs

  let blogs  = $state([]);
  let dialog = $state();

  if(data){
    blogs = JSON.parse(JSON.stringify(data.blogs))
    $blogsStore = blogs;
  }

  //  disable Add button if no user logged in
  //let disableBtn = $derived($userStore.username ? false : true)
  //  "If you want something to update in reaction to something else, use $derived"
  
  //  for the demo project, let the user add an item without logging in
  let disableBtn = $state(false);

</script>

<div class="addItem">
  <button disabled={disableBtn} id='btnAdd' onclick={()=>dialog.showModal()}>Add Item</button>

  <!--  remove these comments for a live site
  {#if !$userStore.username}
    <span class="addNote">Login to Add new blog (or to Comment)</span>
  {/if}
  -->
</div>

{#if blogs}
  {#each blogs as blog, idx}
    <BlogItem {idx} {blog}/>
  {/each}
{/if}

<Dialog bind:dialog on:close={() => console.log('closed')}>
  <form method="POST" action="?/addblog" use:enhance={() => {
		return async ({ result, update }) => {
      console.log('homepage, add blog result', result)
      if(result.data.success === true) {
        blogs.push(JSON.parse(result.data.blog))
      }
      await update()
		};
	}}>

    <input type="hidden" name="username" value={$userStore.username}>
    <input type="hidden" name="userid"   value={$userStore.userid}>

    <input name="title" id="title" type="text" placeholder="Add your Title" value={form?.title ?? ''}>
    {#if form?.errors?.title}
      <label for="title" class="txtError">{form?.errors?.title[0]}</label>
    {/if}
    <textarea name="entry" placeholder="add your Content" value={form?.entry ?? ''}></textarea>
    {#if form?.errors?.entry}
      <label for="entry" class="txtError">{form?.errors?.entry[0]}</label>
    {/if}
    <button>Post</button>
  </form>
  <button onclick={()=>dialog.close()}>Close</button>
</Dialog>

<style>
  /*  Add Item button and 'Login to add new blog' */
  .addItem {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: .5rem;
  }
  #btnAdd {
    margin: 0;
    color: green;
    border: 1px solid green;
  }
  .addNote {
    font-size: smaller;
    font-style: italic;
    color: grey;
  }
</style>
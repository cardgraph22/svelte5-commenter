<script>
  import BlogItem from "$lib/Components/BlogItem.svelte";
  import Dialog from '$lib/Components/Dialog.svelte'
  import { testBlogs } from '$lib/index.js'
  let blogs  = $state(testBlogs);
  let dialog = $state();
  let title  = $state();
  let entry  = $state();
  function addItem(){
    blogs.push(
      {
        "username": "adam",
        "title": title,
        "entry": entry,
        "likes": 0,
        "replies": [],
      }
    )
  }
</script>

<button onclick={()=>dialog.showModal()}>Add Item</button>
{#if blogs}
  {#each blogs as blog}
    <BlogItem {blog}/>
  {/each}
{/if}

<Dialog bind:dialog on:close={() => console.log('closed')}>
  <article>
    <input name="title" id="title" type="text"
      placeholder="Add your Title"
      bind:value={title}
    >
    <textarea name="entry" placeholder="add your Content" bind:value={entry}></textarea>
    <button onclick={addItem}>Add</button>
  </article>
  <button onclick={()=>dialog.close()}>Close</button>
</Dialog>

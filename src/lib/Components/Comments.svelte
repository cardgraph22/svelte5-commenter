<script>
  //import { enhance, applyAction } from '$app/forms';
  let { blog, blogItemTop, depth } = $props();
  import userStore   from "$stores/UserStore";   //  the user logged in (if any)
  
  //let indent = "30px";
  //  reduce indent for successive nested replies
  let indent = 30/depth + "px"
  //console.log('Comments, depth', depth)
  //console.log('Comments, indent', indent)
  depth++;
  let likes  = $state(0);
  let entry  = $state();

  //  The following just controls the text in the Show/Hide buttons
  //  ie, Comment(s) vs Reply(s) (only a comment has a title)
  //                                  truthy       falsy
  let msg  = $derived((blog.title) ? 'Comment' : 'Comments');
  let msgs = $derived((blog.title) ? 'Reply'   : 'Replies');

  let showReply   = $state(true);
  let showReplies = $state(false);

  //  disable comment button if no user logged in
  //let disableBtn = $derived($userStore.username ? false : true)
  let disableBtn = $state(false)

  function addReply(){
    let reply = {
      //"replyid": crypto.randomUUID(),
      "userid": $userStore.userid,
      "username": $userStore.username,
      "title": 'phony title',
      "entry": entry,
      "likes": 0,
      "dislikes": 0,
      "replies": []
    }

      blog.replies.push(reply)
      fetch('/replies?/addReply',
        { method: 'POST',
          body: JSON.stringify({
            entry,
            blogItemTop: JSON.stringify(blogItemTop)
          })
        })
        //.then(response => console.log(response.message))
        .then(response => {
          //console.log('client, addReply response', response)
          })
        showReply = true;
    }

  function delReply(idx){
    blog.replies[idx].length = 0;
    blog.replies.splice(idx, 1)
    //  nukes entry at idx - no user needed - user reply already deleted
    fetch('/replies?/delReply',
      { method: 'POST',
        body: JSON.stringify(blogItemTop)
      } )
      showReply = true;
  }

</script>

<div class="container">
  <button id="thumbsUpButton"
    onclick={()=>{likes++}}>
    <img src="/thumbs-up.png" id="thumbsUpImg"  alt="thumbs">
  </button>
  <span id="likes">{likes}</span>
  <!-- Hide/Show Comment(s) -->
  <button disabled={disableBtn} class="btn" onclick={()=> showReply =  !showReply}>{msg}</button>

  <div class:reply={showReply} class="replyBox">
    <!--  Add a Comment (first level) or reply (subsequent levels) -->
    <form method="POST" action="replies?/addReply">
      <input type="hidden" name="username" value={$userStore.username}>
      <input type="hidden" name="userid"   value={$userStore.userid}>
      <input type="hidden" name="title"    value='phony title'>
      <textarea rows="6" name="entry" placeholder={msg} bind:value={entry}></textarea>
      <!--<button class="btn btnAdd">Add</button>-->
      <button class="btn btnAdd"    type="button" onclick="{addReply}">Add</button>
      <button class="btn btnCancel" type="button" onclick={()=> showReply =  !showReply}>Cancel</button>
    </form>
  </div>

  {#if blog.replies.length > 0}
  <!-- Hide/Show Reply(s) -->
    <button class="btn"
      onclick={()=> showReplies = !showReplies}>
      {showReplies ? 'Hide' : 'Show'} {msgs} {blog.replies.length}
    </button>
  {:else}
    <button disabled>Show {msgs} {blog.replies.length}</button>
  {/if}
</div>

{#if blog.replies && showReplies}
  {#each blog.replies as blog, idx}
    <div class="replyBox" style="margin-left: {indent};">
      <p class="userName">{blog.username}</p>
      <div class="entry">
        <p id="replyEntry">{blog.entry}</p>
        {#if $userStore.userid === blog.userid}
          <button id="btnDel" type="button" onclick={()=>{delReply(idx)}}>Delete</button>
        {:else}
          <button disabled id="btnDel" type="button" onclick={()=>{delReply(idx)}}>Delete</button>
        {/if}
      </div>
      <svelte:self {blog} {blogItemTop} {depth}/>
    </div>
  {/each}
{/if}

<style>
  .container {
    margin-left: 30px;
  }
  .userName {
    margin-left: .5rem;
  }
  .entry {
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2;
    /* border: 1px solid #aaa; */
  }
  .reply {
    display: none;
  }
  #replyEntry {
    margin: 0;
  }
  .replyBox {
    position: relative;
    margin-bottom: 10px;
    border-left: 1px solid #aaa;
  }
  #thumbsUpButton {
    padding: 0;
    background: transparent;
    border: none;
  }
  #thumbsUpImg {
    position: relative;
    top: 2px;
  }
  #likes {
    color: green;
    margin-right: .5rem;
  }
  .btnAdd, .btnCancel {
    position: absolute;
    right: 100px;
    bottom: 10px;
  }
  .btnCancel {
    right: 20px;
  }
</style>
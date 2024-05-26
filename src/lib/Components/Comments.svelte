<script>
  let { blog } = $props();
  let indent = "30px";
  let likes = $state(0);
  let entry = $state();
  let msg   = $state('')
  let msgs  = $state('')

  let showComment   = $state(true);
  let showReplies = $state(false);

  function addComment(){
    blog.replies.push(
      {
        "username": "",
        "entry": entry,
        "replies": [],
      })
      showComment = true;
    }

    //  The following just controls the text in the Show/Hide buttons
    //  ie, Comment(s) vs Reply(s) (only a comment has a title)
    $effect(() => {
      if(blog.title){
        msg  = "Comment"
        msgs = "Comments"
      } else {
        msg  = "Reply"
        msgs = "Replies"
      }
	  });


</script>

<div class="container">
  <button id="thumbsUpButton"
    onclick={()=>{likes++}}>
    <img src="/thumbs-up.png" id="thumbsUpImg"  alt="thumbs">
  </button>
  <span id="likes">{likes}</span>

  <button class="btn" onclick={()=> showComment =  !showComment}>{msg}</button>
  <!--  Add a Comment (first level) or reply (subsequent levels) -->
  <div class:reply={showComment} class="commentbox">
    <textarea rows="6" name="entry" placeholder={msg} bind:value={entry}></textarea>
    <button class="btn btnAdd" onclick="{addComment}">Add</button>
    <button class="btn btnCancel" onclick={()=> showComment =  !showComment}>Cancel</button>
  </div>

  {#if blog.replies.length > 0}
    <button class="btn"
      onclick={()=> showReplies = !showReplies}>
      {showReplies ? 'Hide' : 'Show'} {msgs} {blog.replies.length}
    </button>
  {:else}
    <button disabled>Show {msgs} {blog.replies.length}</button>
  {/if}
</div>

{#if blog.replies && showReplies}
  {#each blog.replies as blog}
    <div class="replyBox" style="margin-left: {indent};">
      <!-- the following line is the interesting part:                 -->
      <!--  ie, if this comment/reply has more replies 'under it'      -->
      <!--  this component invokes itself to display the child reply   -->
      <!-- note the 'indent' in the enclosing div (above)              -->
      <!--   the current reply is indented 30px (or whatever you want) -->
      <!--   from the parent, which is the previous reply              -->
      <p class="entry">{blog.entry}</p>
      <svelte:self {blog}/>
    </div>
  {/each}
{/if}

<style>
  .container {
    margin-left: 30px;
  }
  .commentbox {
    position: relative;
  }
  .btnAdd, .btnCancel {
    position: absolute;
    right: 100px;
    bottom: 10px;
  }
  .btnCancel {
    right: 20px;
  }
  .reply {
    display: none;
  }
  .replyBox {
    border-left: 1px solid #aaa;
    margin-bottom: 10px;
    /* border-bottom: 2px solid red; */
  }
  .btn {
    font-size: .75em;
    margin: .5em;
    color: blue;
    background-color: white;
    border: 1px solid blue;
  }
  .btn:hover {
    color: maroon;
    background-color: white;
    border: 1px solid maroon;
  }
  button:disabled {
    font-size: .75em;
    color: gray;
    background-color: white;
    border: 1px solid gray;
  }
  #thumbsUpButton {
    margin: 0;
    padding: 0;
    background: transparent;
  }
  #thumbsUpImg {
    position: relative;
    top: 2px;
  }
  #likes {
    color: green;
  }
  .entry {
    margin-left: 10px;
  }
</style>
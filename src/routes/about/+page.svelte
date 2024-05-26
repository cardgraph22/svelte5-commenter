<script>
  let comments = `
  Comment 1
    Reply 1
      Sub Reply 1    
      Sub Reply 2
    Reply 2
  Comment 2
  `
  let code = `
  {#if blog.replies && showReplies}
    {#each blog.replies as blog}
      <div style="margin-left: {indent};">   
        <svelte:self {blog}/>
      </div>
    {/each}
  {/if}
  `
  let dbschema = `
  testBlogs = [{
    "_id": 1,
    "username": "Wilma",
    "title": "'Blog' from Wilma",  
    "entry": "Blog entry...",
    "replies": [
      {
        "username": "",
        "entry": "comment 1",
        "replies": [],
      }
    ],
    "likes": 0
  }]`
</script>

<p>Blog posts, forum posts and news articles usually have a comments section.</p>
<p>This project was created using Svelte 5, and demonstrates a 'comment section'; a series of recursive, nested comments, and their replies, and <i>their</i> replies (and so forth) by using the element:</p>

<p class="component">&lt;svelte:self&gt;</p>

<p>which is invoked in the Comments.svelte component (which is in $lib/Components)</p>

<p>This:</p>
<p class="comments">{comments}</p>
<p>is generated with this:</p>
<p class="code">{code}</p>

<p>The key concept here is that the 'replies' blog property (an array) has its own 'replies' property (again, an array) as a member.</p>
<p>So, if a reply has more replies under it (ie, a non-empty replies array), the component</p>
<p class="component">&lt;svelte:self &lbrace;blog&rbrace;&nbsp;&nbsp;&#47;&gt;</p>
<p>IE:</p>
<p class="component">&ltComments &lbrace;blog&rbrace;&nbsp;&nbsp;&#47;&gt;</p>
<p>is invoked until there are no more nested replies.</p>
<p>Take careful note of the 'blog.replies' array in the preceeding code and 'replies' array in the following schema.  If non-empty, recursion occurs.</p>

<p class="dbschema">{dbschema}</p>

<p>The 'Add Item' button just adds another item (phoney blog, in this case) to the list of 'commentable items'.</p>

<p>This version of the project does not have a backend, as the initial intent is to show the client side mechanics of a comment/reply component.</p>
<p>The 'blog' data comes from the 'testBlogs' array in $lib/index.js</p>

<p>However, a version with a backend is in progress, which will add login, users and their avatars, and will save everything in a MongoDB database.</p>





<h4>Acknowledgements</h4>
<p>The project uses picnic.css for styling and ICONPACKS (www.iconpacks.net) for icons.</p>
<p><i>Thanks to Steve C., a true friend.</i></p>

<style>
  p {
    color: #4d4d4d;
  }
  .component {
    color: purple;
    background-color: #f2f2f2;
    margin-left: 30px;
    font-size: larger;
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
  }
  .comments, .code, .dbschema {
    margin-left: 30px;
    white-space: pre-wrap;
    font-family: 'Lucida Console';
    display: inline-block;
  }
  .comments {
    background-color: aliceblue;
    color: blue;
  }
  .code {
    background-color: black;
    color: #ffa500;
  }
  .dbschema {
    background-color: aliceblue;
    color: magenta;
  }

</style>
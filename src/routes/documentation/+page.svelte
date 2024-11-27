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
        <Comments {blog}/>
      </div>
    {/each}
  {/if}
  `
  let dbschema = `
  export const blogSchema = new Schema({
    userid: String,   // user id of author
    username: String, // user name of author
    title: String,
    entry: String,
    likes: Number,
    dislikes: Number,
    replies: []
  });`

  let useComments = `
    <Comments {blog}>
  `

</script>

<p>Blog posts, forum posts and news articles usually have a comments section.</p>
<p>This project was created using Svelte 5, and demonstrates a 'comment section'; a series of recursive, nested comments, and their replies, and <i>their</i> replies (and so forth).</p>

<p>To accomplish this, import the code in itself, ie, in the code Comments.svelte, add:</p>

<span class="component">import Comments from '$lib/Components/Comments.svelte'</span>

<p>Then invoke it later in the code as appropriate:</p>
<span class="component">{useComments}</span>

<p>This replaces the pre version 5 (deprecated) <span class="component">&lt;svelte:self&gt;</span></p>

<p>This purpose of this site is to examine the mechanics of a blog/comment/replies functionality, and UI synergy between login state and blog actions (such as Add and Delete)</p>

<h3>The Front End</h3>

<p>This:</p>
<p class="comments">{comments}</p>
<p>is generated with this:</p>
<p class="code">{code}</p>

<p>The key concept here is that the 'replies' blog property (an array) has its own 'replies' property (again, an array) as a member.</p>
<p>So, if a reply has more replies under it (ie, a non-empty replies array), the component</p>
<p class="component">&ltComments &lbrace;blog&rbrace;&nbsp;&nbsp;&#47;&gt;</p>
<p>is invoked until there are no more nested replies.</p>
<p>Take careful note of the 'blog.replies' array in the preceeding code and 'replies' array in the following schema.  If non-empty, recursion occurs.</p>

<p class="dbschema">{dbschema}</p>

<p>The 'Add Item' button just adds another item (blog, in this case) to the list of 'commentable items'.  The 'List Users' in the navbar is an admin thing, and is disabled for this demo site.  But if you clone the site and want to use it, just remove the class 'noOp' for its anchor in +layout.svelte</p>

<p class="demo">For this, the demo site only (the live site you see with the accompanying link), the 'Add Item' and 'Add Comment' buttons are always enabled so the user can try them out.  On a real site, enable the $derived disableBtn logic in /+page.svelte and $lib/Components/Comments.svelte.  'Delete' (a blog, comment or reply) is also far more lenient than a real site would be, but deleting other people's texts is not allowed.</p>

<h3>The Backend</h3>

<p>The database is MongoDB and Mongoose.</p>
<p>Under src/api you will find mongo.js, which connects to a MongoDB Atlas database which uses a .env variable, and schema.js, which contains database schemas for the users and the blogs.</p>

<p>The 'Login' (the /login route) is rudimentary; just a username and password.  It does, however, use some simple zod validation, and provides an example of some newer Svelte v5 logic for forms.</p>

<h3>Acknowledgements</h3>
<p>The project uses picnic.css for styling and ICONPACKS (www.iconpacks.net) for icons.</p>

<style>
  p {
    color: #4d4d4d;
    margin: 10px;
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
    margin-top: 20px;
    margin-bottom: 20px;
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
  .demo {
    font-style: italic;
    background-color: #f2f2f2;
    padding: 5px;
  }

</style>
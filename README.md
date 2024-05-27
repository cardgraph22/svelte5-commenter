
Blog posts, forum posts and news articles usually have a comments section.

This project was created using Svelte 5, and demonstrates a 'comment section'; a series of recursive, nested comments, and their replies, and _their_ replies (and so forth) by using the element:

<svelte:self>

which is invoked in the Comments.svelte component (which is in $lib/Components)

This:
```

Comment 1
    Reply 1
      Sub Reply 1    
      Sub Reply 2
    Reply 2
  Comment 2

```
is generated with this:

```

{#if blog.replies && showReplies}
  {#each blog.replies as blog}
    <div style="margin-left: {indent};">   
      <svelte:self {blog}/>
    </div>
  {/each}
{/if}

```

The key concept here is that the 'replies' blog property (an array) has its own 'replies' property (again, an array) as a member.

So, if a reply has more replies under it (ie, a non-empty replies array), the component

<svelte:self {blog}  />

IE:

<Comments {blog}  />

is invoked until there are no more nested replies.

Take careful note of the 'blog.replies' array in the preceeding code and 'replies' array in the following schema. If non-empty, recursion occurs.
```

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
}]

```

The 'Add Item' button just adds another item (phoney blog, in this case) to the list of 'commentable items'.

This version of the project does not have a backend, as the initial intent is to show the client side mechanics of a comment/reply component.

The 'blog' data comes from the 'testBlogs' array in $lib/index.js

However, a version with a backend is in progress, which will add login, users and their avatars, and will save everything in a MongoDB database.

#### Acknowledgements

The project uses picnic.css for styling and ICONPACKS (www.iconpacks.net) for icons.


To try this out, download the zip, extract it, go into that folder, type 'npm install'\
Then, go into Visual Code, open a terminal, and type 'npm run dev'

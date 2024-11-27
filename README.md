
Blog posts, forum posts and news articles usually have a comments section.

This project was created using Svelte 5, and demonstrates a 'comment section'; a series of recursive, nested comments, and their replies, and _their_ replies (and so forth).

To accomplish this, import the code in itself, ie, in the code Comments.svelte, add:

import Comments from '$lib/Components/Comments.svelte'

Then invoke it later in the code as appropriate:

<Comments {blog}>

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
      <Comments {blog}>
    </div>
  {/each}
{/if}

```

The key concept here is that the 'replies' blog property (an array) has its own 'replies' property (again, an array) as a member.

So, if a reply has more replies under it (ie, a non-empty replies array), the component

<Comments {blog} />

is invoked until there are no more nested replies.

Take careful note of the 'blog.replies' array in the preceeding code and 'replies' array in the following schema. If non-empty, recursion occurs.
```

testBlogs = [{
  "userid": 1,
  "username": "Wilma",
  "title": "'Blog' from Wilma",  
  "entry": "Blog entry...",
  "likes":0,
  "dislikes":0,
  "replies": [
    {
      "userid": 2
      "username": "Gordo",
      "entry": "comment 1",
      "likes": 0,
      "dislikes": 0,
      "replies": [],
    }
  ],
}]

```

The 'Add Item' button just adds another item (blog, in this case) to the list of 'commentable items'.


---

The backend uses zod validation and MongoDB (Mongoose) for the database.  The Documentation on the website (see the nav bar) gives further details.


To try this out, download/clone the project, go into that folder, type 'npm install'\
Then, go into Visual Code, open a terminal, and type 'npm run dev'

#### Acknowledgements

The project uses picnic.css for styling and ICONPACKS (www.iconpacks.net) for icons.




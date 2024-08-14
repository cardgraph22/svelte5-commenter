<script>
  import Comments   from "./Comments.svelte";
  import blogsStore from "$stores/BlogsStore";  //  all blogs
  import userStore  from "$stores/UserStore";  //  the user logged in (if any)
  
  let { idx, blog } = $props();
  let blogItemTop = blog;
  let blogs = $blogsStore;
  let depth = $state(1);

  //  disable Delete button if user not author
  let disableBtn = $derived(($userStore.userid === blog.userid) ? false : true)
  
  function delBlog (idx, blog) {
    if($userStore.userid != blog.userid){
      alert('must be author to delete')
      return;
    }
    fetch('?/delblog',
      { method: 'POST',
        body: JSON.stringify(blog)
      }
    )
    blogs.splice(idx, 1);
    $blogsStore = blogs;
  }
</script>

<!-- This is the blog, forum entry, news article, whatever;  -->
<!-- ie, a 'commentable' item -->
<article class="card blueBlogItem">    <!--  card class from picnic.css  -->
  <header id="hdr">
    <h4>{blog.username}</h4>
    <h3>{blog.title}</h3>
    <button disabled={disableBtn} id="btnDel" onclick={()=>delBlog(idx, blog)}>Delete</button>
  </header>
  <p>{blog.entry}</p>

  <!-- and this is the comments section -->
  <Comments {blog} {blogItemTop} {depth}/>
</article>

<style>
  #hdr {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .blueBlogItem {
    border: 1px solid #aaa;
  }
</style>
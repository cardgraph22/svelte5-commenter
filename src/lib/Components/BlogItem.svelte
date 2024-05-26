<script>
  import Comments from "./Comments.svelte";
  let { blog } = $props();
</script>

<!-- This is the blog, forum entry, news article, whatever;  -->
<!-- ie, a 'commentable' item -->
<article class="card">    <!--  card class from picnic.css  -->
  <header><h3>{blog.title}</h3></header>
  <p>{blog.entry}</p>
  <!-- and this is the comments section -->
  <Comments {blog} />
</article>



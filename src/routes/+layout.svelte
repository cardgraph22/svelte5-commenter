<script>
  import '$lib/css/picnic.css'
  import '$lib/css/style.css'
  let { children } = $props();
</script>

<!-- Navbar -->
<div class="navbar">
  <div>
    <a href="/" >
      <img class="logo" width="48px" height="48px" src="/cg22Logo.png" alt="Home" />
    </a>
  </div>
    <a href="/about" class="pseudo button">Documentaion</a>
</div>

<h2 class="hdr maroon">Svelte 5 Commenter</h2>

<style>
  .navbar {
    margin-top: .5em;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #aaa;
    /* border-radius: .2em; */
    /* box-shadow: 2px 2px 2px #aaa; */
  }

  .logo {
    margin-top: .5rem;
  }
  @media (max-width: 650px) {
    .hdr {
      font-size: large;
    }
  }

</style>

{@render children()}
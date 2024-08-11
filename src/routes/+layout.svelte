<script>
  import '$lib/css/picnic.css'
  import '$lib/css/style.css'
  import '$lib/css/styleButtons.css'
  import userStore  from "$stores/UserStore";  //  the user logged in (if any)

  let { children } = $props();
  
  function hideMenu() {
    document.getElementById('bmenub').classList.remove('show')
  }

</script>

<!-- Navbar -->
<div style="overflow: hidden;height: 50px;"> <!-- For Demo, Represents the body -->
  <nav>
    <a href="/" >
      <img class="logo" width="48px" height="48px" src="/cg22Logo.png" alt="Home" />
    </a>

    <!-- responsive (picnic.css) -->
    <input id="bmenub" type="checkbox" class="show">
    <label for="bmenub" class="burger pseudo button">☰</label>
    <div class="menu">
      <a href="/documentation" class="pseudo button">Documentaion</a>
      {#if !$userStore.username }
        <!-- no user logged in -->
        <a href="/login" class="pseudo button">Login</a>
      {:else}
        <!-- user logged in -->
        <!-- if they click this anchor, log them out -->
        <a href="/" class="pseudo button"
           onclick={()=>{$userStore.username=null
                         $userStore.userid=null
           }}
        >Logout</a>
      {/if}
      <!--<a href="/listUsers" class="pseudo button noOp">List Users</a>-->
      <a href="/listUsers" class="pseudo button">List Users</a>
    </div>
  </nav>
</div>

<div id="userLoggedIn">
  <span>User: </span>
  {#if !$userStore.username}
    <span>'No one logged in'</span>
  {:else}
    <span>{$userStore.username}</span>
  {/if}
</div>

<h2 class="hdr maroon">Svelte 5 Commenter</h2>

<style>
  nav .logo {
    height: 2.75rem;
    margin-top: .5rem;
  }
  #userLoggedIn {
    color: #aaa;
    font-style: italic;
    padding-top: 10px;
  }
  .noOp {
    pointer-events: none;
    cursor: default;
    background-color: lightgray;
  }
  @media (max-width: 650px) {
    .hdr {
      font-size: large;
    }
  }
</style>

{@render children()}
<!-- login -->
<script>
  let { form }  = $props();

  import userStore  from "$stores/UserStore";  //  user logged in
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';

  let newuser = $state('');

  const submitAdd = () => {
  return async ({ result, update }) => {
      switch (result.type) {
        case 'success':
          $userStore.username = result.data.username;
          $userStore.userid   = result.data._id;
          break;
        case 'failure':
        default:
          break;
      }
      await update()
      //await update({ reset: false }) // use this if i ever want edit field
      if(result.type === 'success'){
        goto('/');
      }
    }
  };
  function addUser(){
    if(newuser==='')newuser='newuser'
    else newuser='newuser'
    console.log('login page, newuser', newuser, 'typeof newuser', typeof newuser)
  }
</script>

<form method="POST" action="?/login" use:enhance={submitAdd}>
  <input type="text" name="username" id="username" value={form?.username ?? ''}/>
  {#if form?.errors?.username}
    <label for="username" class="txtError">{form?.errors?.username[0]}</label>
  {/if}
  <input type="password" name="password" id="password" />
  {#if form?.errors?.password}
    <label for="password" class="txtError">{form?.errors?.password[0]}</label>
    <br/>
  {/if}
  <input type="hidden" name="newuser" value={newuser}>

  <!-- if user not found and 'new user' not checked -->
  {#if form?.error}
    <p>{form?.message}</p>
    <p>Check the 'New User box to add a new user'</p>
  {/if}
  
  <button>Login</button>
  <label>
    <input type="checkbox" onchange={addUser}>
    <span class="checkable">New User</span>
  </label>
  
</form>

<style>
  form {
    max-width: 400px;
    margin: 0 auto;
  }
  label {
    color: maroon;
  }
</style>
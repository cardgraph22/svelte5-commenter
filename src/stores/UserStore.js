import { writable } from "svelte/store";

//  This is the currently logged in user
const userStore = writable(
  {
    userid: '',
    username: '',
    password: '',
    image:  ''
  });

  export default userStore;
import { writable } from "svelte/store";
//const blogsStore = writable();
const blogsStore = writable(
  {
    userid    : '',
    username  : '',
    entry     : '',
    likes     :  0,
    dislikes  :  0,
    replies   : [],
  });
export default blogsStore;

// all blogs
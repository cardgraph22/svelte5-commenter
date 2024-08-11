import { writable } from "svelte/store";
const responsiveStore = writable(
  {
    type: 'mobile',
    burgerOn: true,
    menuFlexDirection: 'column'
  });
export default responsiveStore;
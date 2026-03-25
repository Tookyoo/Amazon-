export let cart = JSON.parse(localStorage.getItem("mainCart")) || [];

export const appState = {
  hasIds: [],
  isAdded: false,
};

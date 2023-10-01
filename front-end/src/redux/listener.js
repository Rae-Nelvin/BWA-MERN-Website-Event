import store from "./store";

let currentAuth;

function listener() {
  let previousAuth = currentAuth;
  currentAuth = store.getState().auth;
  if (previousAuth !== currentAuth) {
    localStorage.setItem("auth", JSON.stringify(currentAuth));
  }
}

function listen() {
  store.subscribe(listener);
}

export { listen };

// Functions to retrieve and manipulate data in local storage

export const getUser: () => { hash?: string; username?: string } = () =>
  JSON.parse(localStorage.getItem("user") || "{}");

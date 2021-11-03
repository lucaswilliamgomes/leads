function verifyLocalStorage() {
  if (localStorage.getItem("user")) {
    window.location.assign("/leads");
  } else {
    if (localStorage.getItem("leads")) {
      localStorage.removeItem("leads");
    }
  }
}

export default verifyLocalStorage;

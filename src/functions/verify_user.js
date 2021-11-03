function verifyUser() {
  if (!localStorage.getItem("user")) {
    window.location.assign("/");
    if (localStorage.getItem("leads")) {
      localStorage.removeItem("leads");
    }
  }
}

export default verifyUser;

let date = document.getElementById("todaysDate");
window.addEventListener("load", myFunction);
  function myFunction() {
    let d = new Date();
    let month = d.getMonth();
    let correctMonth = month + 1;
    date.innerHTML= d.getDate() + "/" + correctMonth + "/" + d.getFullYear();
    document.getElementById("todaysDate").style.color = "white";
  };
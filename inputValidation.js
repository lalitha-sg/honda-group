function validateTaskForm() {
    let tName = document.forms["taskForm"]["taskName"].value;
    if (tName == "" || tName.length < 8) { console.log(tName.length)
      alert("Task name must be filled out and longer than 8 characters!");
      return false;
    }
    let tDes = document.forms["taskForm"]["taskDes"].value;
    if (tDes == "" || tDes.length < 15) {
      alert("Description must be filled out and longer than 15 characters!");
      return false;
    }
    let assign = document.forms["taskForm"]["assignTo"].value;
    if (assign == "") {
      alert("Task must be assigned to someone");
      return false;
    }
    let dueDate = document.forms["taskForm"]["dueDate"].value;
    if (assign == "") {
        alert("Date must be in the future!");
        return false;
      }
      let date = document.getElementById("dueDate").value;
      let varDate = new Date(date); //dd-mm-YYYY
      let today = new Date();

    if(varDate >= today) {
        alert("Please set a future date!");
        return false;
    }
}
/*if (date == "" || ) {
      alert("Please set a future date!");
      return false;
    } */

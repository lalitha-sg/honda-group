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
    let today = new Date();
    let dateToday = String(today.getDate()).padStart(2, "0");
    let monthToday = String(today.getMonth() + 1).padStart(2, "0");
    let yearToday = today.getFullYear();
  let minDate = `${yearToday}-${monthToday}-${dateToday}`;
 //dueDate.min = minDate;
 if(minDate > dueDate) {
    alert("Date must be in the future!")
    return false;
 }
  else return true;
}
export default validateTaskForm

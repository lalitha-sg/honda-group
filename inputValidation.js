window.addEventListener('load', () => {
  ///function to clear span on focus event
  function clearError(spanId) {
    document.getElementById(spanId).innerHTML = ''
  }
  const inputElements = ['taskName', 'taskDes', 'assignTo', 'dueDate'];
  console.log('in load')
  inputElements.forEach(element => {
    document.getElementById(element).onfocus = () => clearError(`${element}Span`)
  })
});

function validateTaskForm() {
  let validation = true;

  let tName = document.forms["taskForm"]["taskName"].value;
  if (tName == "" || tName.length < 8) {
    console.log(tName.length)
    // alert("Task name must be filled out and longer than 8 characters!");
    document.getElementById('taskNameSpan').innerHTML = 'Task name must be filled out and longer than 8 characters!';
    validation = false
    // return false;
  }
  let tDes = document.forms["taskForm"]["taskDes"].value;
  if (tDes == "" || tDes.length < 15) {
    // alert("Description must be filled out and longer than 15 characters!");
    document.getElementById('taskDesSpan').innerHTML = 'Task Des must be filled out and longer than 15 characters!';
    validation = false
    // return false;
  }
  let assign = document.forms["taskForm"]["assignTo"].value;
  if (assign == "") {
    // alert("Task must be assigned to someone");
    document.getElementById('assignToSpan').innerHTML = 'Task  must be assigned!';
    validation = false
    // return false;
  }
  let dueDate = document.forms["taskForm"]["dueDate"].value;
  let today = new Date();
  let dateToday = String(today.getDate()).padStart(2, "0");
  let monthToday = String(today.getMonth() + 1).padStart(2, "0");
  let yearToday = today.getFullYear();
  let minDate = `${yearToday}-${monthToday}-${dateToday}`;
  //dueDate.min = minDate;
  if (minDate > dueDate) {
    // alert("Date must be in the future!")
    document.getElementById('dueDateSpan').innerHTML = 'Due Date must be filled out in future !';
    // return false;
    validation = false
  }
  return validation;
}
export default validateTaskForm
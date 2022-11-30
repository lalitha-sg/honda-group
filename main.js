import TaskManager from './TaskManager.js'

import validateTaskForm from "./inputValidation.js"

let taskForm = document.getElementById('taskForm')
let tasksList = []
window.addEventListener('load', () => {
  displayTasks()
  addButtonEventListener('.taskId');
  addButtonEventListener('.taskId1');

 

})

function addButtonEventListener(buttonClass) {
  let tasks = document.querySelectorAll(buttonClass);

  console.log("Tasks: " + JSON.stringify(tasks));

  tasks.forEach(task => {
    let id = task.getAttribute('id');

    task.addEventListener('click', (event) => {
      console.log('click: ' + JSON.stringify(event));
      console.log("Id: " + id);
      if (buttonClass == '.taskId')
        TaskManager.updateStatus(id);
      else if (buttonClass == '.taskId1')
        TaskManager.deleteTask(id);
    });
  });

  console.log(tasks);
}

const openForm = document.getElementById("addTask");
openForm.addEventListener('click', addTaskForm)


const closeForm = document.getElementById("closeForm");
closeForm.addEventListener('click', closeTaskForm)


function addTaskForm() {
  document.getElementById('taskFormData').style.display = "block";
}

function closeTaskForm() {
  document.getElementById('taskFormData').style.display = "none";
}

const btnSubmit = document.getElementById('btnSubmit')
btnSubmit.addEventListener('click', (event) => {

  event.preventDefault();
  console.log("When Submit button ")
  if (!validateTaskForm()) {
    console.log('validate fails');
    return
  }

  const task = new TaskManager()
  task._taskName = taskForm['taskName'].value
  task._desc = taskForm['taskDes'].value
  task._status = taskForm['taskStatus'].value
  task._assignTo = taskForm['assignTo'].value
  task._dueDate = taskForm['dueDate'].value


  console.log(task)
  TaskManager.addTask(task)
  window.location.href = '/index.html'

})



let date = document.getElementById("todaysDate");
window.addEventListener("load", myFunction);



function myFunction() {
  let d = new Date();
  let month = d.getMonth();
  let correctMonth = month + 1;
  date.innerHTML = d.getDate() + "/" + correctMonth + "/" + d.getFullYear();
  document.getElementById("todaysDate").style.color = "white";
}

const taskManager = new TaskManager();
let allTasks = TaskManager.getTaskList();
// console.log("TASKS LISTS:::" + taskManager.getTaskList());
let taskFilter = document.getElementById('taskFilter')
console.log(`task filter ${taskFilter.value}`)
taskFilter.addEventListener('change', () => {
  console.log('in select')
  console.log(taskFilter.value)
  allTasks = TaskManager.taskListByStatus(taskFilter.value);
  console.log(allTasks)
  document.getElementById("list-items").innerHTML = ''
  displayTasks()
})

function addItem(item) {
  let status = (item._status == 'done') ? true : false;

  console.log("Status: " + status + " ," + item._status);
  let itemHTML = '<div class="card" style="width: 100%;">\n' +
    '        <div class="card-body">\n' +
    '        <h5 class="card-title taskNameJs text-primary" >' + item._taskName + '</h5>\n' +
    '        <p class="card-text font-weight-bold assigned-to">' + 'Assigned to: ' + item._assignTo + '</p>\n' +
    '        <p class="card-text font-weight-bold status">' + 'Status: ' + item._status + '</p>\n' +
    '        <p class="card-text des">' + 'Description: ' + item._desc + '</p>\n' +
    '        <p class="card-text des">' + 'id: ' + item._id + '</p>\n' +
    '        <p class="card-text font-weight-bold dueDate">' + 'Due Date: ' + new Date(item._dueDate).toLocaleDateString("en-Uk") + '</p>\n' +
    '        <a href="#" class="taskId1 btn btn-primary" id=' + item._id + '>Delete</a>\n' +
    ((!status) ?
      '        <a href="#" class="taskId btn btn-primary  " id=' + item._id + '>' + "Mark Done" + '</a>\n' :
      '');

  +
  '    </div>\n' +
  '</div>\n' +
  '<br/>';
  const itemsContainer = document.getElementById("list-items");
  itemsContainer.innerHTML += itemHTML;

}

function displayTasks() {

  allTasks.map(task => {
    console.log("Display Tasks: " + JSON.stringify(task));
    addItem(task);
  })
}
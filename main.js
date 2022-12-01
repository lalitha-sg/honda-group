import TaskManager from './TaskManager.js'

import validateTaskForm from "./inputValidation.js"

let taskForm = document.getElementById('taskForm')
// let tasksList = []
const taskManager = new TaskManager();
let allTasks = TaskManager.getTaskList();
window.addEventListener('load', () => {
  displayTasks()   //load tasks in DOM
  addTask()    //add task 
  filterTasks()    //filter tasks
  addButtonEventListener('.taskId');  //mark done and delete tasks
  addButtonEventListener('.taskId1');  //mark done and delete tasks
  displayDate() //display date in header

 

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


function addTask(){
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
    // console.log(task)
    TaskManager.addTask(task)
    // window.location.href = '/index.html'
    window.location.reload()

  })
  }


function displayDate() {
  let date = document.getElementById("todaysDate");
  let d = new Date();
  let month = d.getMonth();
  let correctMonth = month + 1;
  date.innerHTML = d.getDate() + "/" + correctMonth + "/" + d.getFullYear();
  document.getElementById("todaysDate").style.color = "white";
}

function filterTasks(){

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
}

function displayTasks() {
  const itemsContainer = document.getElementById("list-items");
  if(!allTasks.length) itemsContainer.innerHTML='<h2 class="text-center">No Tasks To Show</h2>'
  allTasks.map(task => {
    console.log("Display Tasks: " + JSON.stringify(task));
    let itemHTML= TaskManager.addTaskHtml(task);
    itemsContainer.innerHTML += itemHTML;

  })
}
import TaskManager from './TaskManager.js'

import validateTaskForm from "./inputValidation.js"

let taskForm = document.getElementById('taskForm')
let tasksList = []
window.addEventListener('load',()=>{
  displayTasks()
//  let TaskItems= document.getElementById("list-items")
  
  let tasks=document.querySelectorAll('.taskId')
  tasks.forEach(task=>{
    let id =task.getAttribute('id')
   
    task.addEventListener('click',()=>{
    console.log('click')
    console.log(id)
    TaskManager.updateStatus(id)
    task.style.backgroundColor='green'
    task.innerHTML='Done'

    })
  })
  console.log(tasks)
  function statusDone(){
   console.log('status done')
   console.log('click')

 }
})


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

  const btnSubmit=document.getElementById('btnSubmit')
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
 
   // closeForm();
  window.location.href = '/second-page.html'

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
   let taskFilter=document.getElementById('taskFilter')
   console.log(`task filter ${taskFilter.value}`)
   taskFilter.addEventListener('change',()=>{
       console.log('in select')
       console.log(taskFilter.value)
       allTasks =TaskManager.taskListByStatus(taskFilter.value);
       console.log(allTasks)
       document.getElementById("list-items").innerHTML=''
        displayTasks()
   })
  function addItem(item) {
    const itemHTML = '<div class="card" style="width: 100%;">\n' +
      '        <div class="card-body">\n' +
      '        <h5 class="card-title taskNameJs text-primary" >' + item._taskName + '</h5>\n' +
      '        <p class="card-text font-weight-bold assigned-to">' + 'Assigned to: ' + item._assignTo + '</p>\n' +
      '        <p class="card-text font-weight-bold status">' + 'Status: ' + item._status + '</p>\n' +
      '        <p class="card-text des">' + 'Description: ' + item._desc + '</p>\n' +
      '        <p class="card-text des">' + 'id: ' + item._id + '</p>\n' +
      '        <p class="card-text font-weight-bold dueDate">' + 'Due Date: ' + new Date(item._dueDate).toLocaleDateString("en-Uk") + '</p>\n' +
      '        <a href="#" class="btn btn-primary" id="deleteTaskInfo">Delete</a>\n' +
      '        <a href="#" class=" taskId btn btn-primary" id='+item._id+' >Mark Done</a>\n' +
      '    </div>\n' +
      '</div>\n' +
      '<br/>';
    const itemsContainer = document.getElementById("list-items");
    itemsContainer.innerHTML += itemHTML;
    // const deleteId = document.getElementById("deleteTaskInfo");
    // deleteId.addEventListener('click',deleteTask(item._id));
  }
  function displayTasks(){

    allTasks.map(task => {
      addItem(task);
    })
  }


// function deleteTask(id) {

//   console.log("Delete Task");
//   const taskManager = new TaskManager();
//   let allTasks = taskManager.getTaskList();



//   const index = allTasks.findIndex(task => {
//     task._id === id
//   });

//   console.log("Index::::" + index)
//   allTasks = allTasks.splice(index, 1);
//   console.log(allTasks);

  //window.localStorage.setItem('Tasks',JSON.stringify(allTasks));
//}

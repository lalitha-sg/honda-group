//import validateTaskForm from "./inputValidation.js"

let taskForm = document.getElementById('taskForm')
let tasksList = []
window.addEventListener('load', () => {
  // tasksList = JSON.parse(localStorage.getItem('Tasks')) || [];
  console.log(`tasklist :${tasksList}`)
})

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateTaskForm()) {
    console.log('validate fails');
    return
  }

  console.log(taskForm['taskName'].value)
  const formData = new FormData(taskForm);
  console.log(`formdata:${formData}`)
  const task = new TaskManager()


  task._taskName = taskForm['taskName'].value
  task._desc = taskForm['taskDes'].value
  task._status = taskForm['taskStatus'].value
  task._assignTo = taskForm['assignTo'].value
  task._dueDate = taskForm['dueDate'].value

  console.log(`task name :${task._taskName}`)
  // console.log(task)
  TaskManager.addTask(task)


  const allTasks = task.getTaskList();

  task.taskListByStatus("To Do");




  // const tasksDiv = task.getTasks()
  const displayNames = {
    _id: 'Id',
    _taskName: 'Task Name',
    _desc: 'Description',
    _assignTo: 'Assign To',
    _dueDate: 'Due Date'
  }

  for (let task of allTasks) {
    for (let key in task) {
      console.log(`key is ${key}`)
      const markup = `<span>${displayNames[key]}:${task[key]}<br></span>`
      document.getElementById('taskList').innerHTML += markup

    }

  }

  // closeForm();
  // window.location.href = '/second-page.html'

})

const openForm = document.getElementById("addTask");
openForm.addEventListener('click', addTaskForm)


const closeForm = document.getElementById("closeForm");
closeForm.addEventListener('click', closeTaskForm)


function addTaskForm() {
  document.getElementById('taskForm').style.display = "block";
}

function closeTaskForm() {
  document.getElementById('taskForm').style.display = "none";
}


class TaskManager {
  static id = 0;
  constructor(taskName, desc, assignTo, dueDate, status) {

    this._taskName = taskName;
    this._desc = desc;
    this._assignTo = assignTo;
    this._dueDate = dueDate;
    this._status = status;
  }
  get taskName() {
    return this._taskName;
  }
  get desc() {
    return this._desc;
  }
  get assignTo() {
    return this._assignTo;
  }
  get dueDate() {
    return this._dueDate;
  }
  get status() {
    return this._status;
  }

  static addTask(task) {

    task._id = TaskManager.getId()
    const allTasks = JSON.parse(window.localStorage.getItem('Tasks')) || [];
    allTasks.push(task)
    window.localStorage.setItem('Tasks', JSON.stringify(allTasks))


  }

  static getId() {
    let allTasks = JSON.parse(localStorage.getItem('Tasks')) || []
    let lastTask = allTasks ? allTasks.pop() : null
    let lastId = lastTask ? lastTask._id : 0;
    console.log(`id is ${lastId}`)
    return ++lastId;
  }


  getTaskList(status) {
    return JSON.parse(window.localStorage.getItem('Tasks'));
  }

  taskListByStatus(status) {
    console.log("status:" + status);
    // console.log("Task"+task);
    const taskListByStatus = this.getTaskList().filter(task => task._status === status);
    for (let i of taskListByStatus) {
      console.log(i);
    }
    console.log("Task List by" + taskListByStatus);

  }


  // getTaskByStatus(status){

  // }
}
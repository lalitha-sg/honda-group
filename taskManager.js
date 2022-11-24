let taskForm = document.getElementById('taskForm')
let tasksList = []
window.addEventListener('load', () => {
  tasksList = JSON.parse(localStorage.getItem('Tasks')) || [];
  console.log(`tasklist :${tasksList}`)
})
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(taskForm['taskName'].value)
  const formData = new FormData(taskForm);
  console.log(`formdata:${formData}`)
  const task = new TaskManager()

  task._id = tasksList.length + 1;
  task._taskName = taskForm['taskName'].value
  task._desc = taskForm['taskDes'].value
  task._status = taskForm['taskStatus'].value
  task._assignTo = taskForm['assignTo'].value
  task._dueDate = taskForm['dueDate'].value

  console.log(`task name :${task._taskName}`)
  // console.log(task)
  tasksList.push(task)

  window.localStorage.setItem('Tasks', JSON.stringify(tasksList))
  const allTasks = task.getTaskList();

  task.taskListByStatus("To Do");




  // const tasksDiv = task.getTasks()
  const displayNames = {
    _taskName: 'Task Name',
    _desc: 'Description',
    _assignTo: 'Assign To',
    _dueDate: 'Due Date'
  }

  for (let task of allTasks) {
    for (key in task) {
      const markup = `<span>${displayNames[key]}:${task[key]}<br></span>`
      document.getElementById('taskList').innerHTML += markup

    }

  }







  //  addTask(task){

  //   const task = [{
  //     "taskName" : "llllllllllllllll",
  //     "assignTo" : "xxxxxxxxxx",

  //   }]

  //  }





  // for(let task of allTasks){
  //   console.log(task[0]);
  //   for(key in task){
  //     const markup = `<div>
  //     <span>${key}:${task[key]}</span>
  //     <div>`;
  //     document.getElementById('taskList').innerHTML += markup;
  //   }

  console.log(task);
  //}












})


class TaskManager {
  constructor(id, taskName, desc, assignTo, dueDate, status) {
    this._id = id;
    this._taskName = taskName;
    this._desc = desc;
    this._assignTo = assignTo;
    this._dueDate = dueDate;
    this._status = status;
    //    this._tasks=[{id:1,
    //   taskName:test1,
    // desc:'test'}]


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

  saveTask() {
    //    let task ={id:this._id,
    //     taskName:this._taskName,
    //   }
    // window.localStorage.setItem('tasks',JSON.stringify(task))
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
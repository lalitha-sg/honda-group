// import validateTaskForm from "./inputValidation.js"

// let taskForm = document.getElementById('taskForm')
// let tasksList = []
// window.addEventListener('load', () => {
  
//   console.log(`tasklist :${tasksList}`)
// })

// const openForm = document.getElementById("addTask");
// openForm.addEventListener('click', addTaskForm)


// const closeForm = document.getElementById("closeForm");
// closeForm.addEventListener('click', closeTaskForm)


// function addTaskForm() {
//   document.getElementById('taskFormData').style.display = "block";
// }

// function closeTaskForm() {
//   document.getElementById('taskFormData').style.display = "none";
// }

//   const btnSubmit=document.getElementById('btnSubmit')
// btnSubmit.addEventListener('click', (event) => {

//   event.preventDefault();
//   console.log("When Submit button ")
//   if (!validateTaskForm()) {
//     console.log('validate fails');
//     return
//   }
 
//   const task = new TaskManager()
//   task._taskName = taskForm['taskName'].value
//   task._desc = taskForm['taskDes'].value
//   task._status = taskForm['taskStatus'].value
//   task._assignTo = taskForm['assignTo'].value
//   task._dueDate = taskForm['dueDate'].value

  
//    console.log(task)
//    TaskManager.addTask(task)
 
//    // closeForm();
//   window.location.href = '/second-page.html'

// })



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
    console.log('in add task')
    task._id = TaskManager.getId()
    // const allTasks = JSON.parse(window.localStorage.getItem('Tasks')) || [];
      const allTasks=TaskManager.getTaskList()
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


  static getTaskList() {

    return JSON.parse(window.localStorage.getItem('Tasks')) || [];
  }

  static taskListByStatus(status) {
    console.log("status:" + status);
    // console.log("Task"+task);
    const taskListByStatus = this.getTaskList().filter(task => task._status === status);
    for (let i of taskListByStatus) {
      console.log(i);
    }
    console.log("Task List by" + taskListByStatus);

    return taskListByStatus
  }
   static updateStatus(id){
    console.log(`status update of ${id}`)
    let updatedTasks= this.getTaskList().map(task=>{
         if(task._id==id){
          task._status='done'
         }
         return task
    })
    console.log(updatedTasks)
    localStorage.setItem('Tasks',JSON.stringify(updatedTasks))
   }
  static deleteTask(id){
    console.log(`delete id is ${id}`)

  }
  
}

export default TaskManager;
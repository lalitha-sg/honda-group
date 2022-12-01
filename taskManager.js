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

  //Add task deatils to local starage
  static addTask(task) {
    console.log('in add task')
    task._id = TaskManager.getId()
    // const allTasks = JSON.parse(window.localStorage.getItem('Tasks')) || [];
    const allTasks = TaskManager.getTaskList()
    allTasks.push(task)
    window.localStorage.setItem('Tasks', JSON.stringify(allTasks))


  }


  // Getting last index id from the localstorage
  static getId() {
    let allTasks = JSON.parse(localStorage.getItem('Tasks')) || []
    let lastTask = allTasks ? allTasks.pop() : null
    let lastId = lastTask ? lastTask._id : 0;
    console.log(`id is ${lastId}`)
    return ++lastId;
  }


  //Getting Task list from Localstorage
  static getTaskList() {

    return JSON.parse(window.localStorage.getItem('Tasks')) || [];
  }

  //Getting tasklist by status
  static taskListByStatus(status) {
    console.log("status:" + status);
    // console.log("Task"+task);
    const taskListByStatus = this.getTaskList().filter(task => task._status === status);
    for (let i of taskListByStatus) {
      console.log(i);
    }
    return taskListByStatus
  }

  //Update status - Mark as done to done - setting status to localstorage 
  static updateStatus(id) {
    console.log(`status update of ${id}`);

    let updatedTasks = this.getTaskList().map(task => {
      if (task._id == id) {
        task._status = 'done'
      }
      return task;
    })
    localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
    window.location.reload(true);
  }

  // Delete task from local storage
  static deleteTask(id) {

    let allTasks = JSON.parse(localStorage.getItem('Tasks'))

    let index = allTasks.findIndex(task => {
      return task._id == id;
    });

    allTasks.splice(index, 1);

    window.localStorage.setItem('Tasks', JSON.stringify(allTasks));
    window.location.reload(true);
  }


  // Add task cards to main page
  static addTaskHtml(item) {
    let status = (item._status == 'done') ? true : false;

    console.log("Status: " + status + " ," + item._status);
    let itemHTML = '<div class="card" style="width: 100%;">\n' +
      '        <div class="card-body">\n' +
      '        <h5 class="card-title taskNameJs text-primary" >' + item._taskName + '</h5>\n' +
      '        <p class="card-text font-weight-bold assigned-to">' + 'Assigned to: ' + item._assignTo + '</p>\n' +
      '        <p class="card-text font-weight-bold status">' + 'Status: ' + item._status + '</p>\n' +
      '        <p class="card-text des">' + 'Description: ' + item._desc + '</p>\n' +
      '        <p class="card-text font-weight-bold dueDate">' + 'Due Date: ' + new Date(item._dueDate).toLocaleDateString("en-Uk") + '</p>\n' +
      '        <a href="#" class="taskId1 btn btn-primary" id=' + item._id + '>Delete</a>\n' +
      ((!status) ?
        '        <a href="#" class="taskId btn btn-primary  " id=' + item._id + '>' + "Mark Done" + '</a>\n' :
        '');

    +
    '    </div>\n' +
    '</div>\n' +
    '<br/>';
    return itemHTML;
  }
}

export default TaskManager;

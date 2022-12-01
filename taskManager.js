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
    const allTasks = TaskManager.getTaskList()
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
  static updateStatus(id) {
    console.log(`status update of ${id}`);

    if (id.startsWith("delete-")) {
      TaskManager.deleteTask(id);
      return;
    }

    let updatedTasks = this.getTaskList().map(task => {
      if (task._id == id) {
        task._status = 'done'
      }
      return task;
    })
    console.log(updatedTasks)
    localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
    window.location.reload(true);
  }

  static deleteTask(id) {

    let allTasks = JSON.parse(localStorage.getItem('Tasks'))

    let index = allTasks.findIndex(task => {
      return task._id == id;
    });

    allTasks.splice(index, 1);

    window.localStorage.setItem('Tasks', JSON.stringify(allTasks));
    window.location.reload(true);
  }

  static  addTaskHtml(item) {
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
    return itemHTML;
  }
}

export default TaskManager;
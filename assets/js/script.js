// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let tasks = [];

const currentDate = new Date();
function init() {
  // function to be called when document is loaded
  if (taskList !== null)
    // checks if taskList from localStorage is empty; if not, copies its contents into local array
    tasks = taskList;
}
// Function to save tasks and nextId to localStorage
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", nextId);
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const id = nextId;
  nextId += 1;
  saveToLocalStorage();
  return id;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // Create card container
  const card = $("<div>").addClass("card mb-2").attr("data-id", task.id);

  // Create card body
  const cardBody = $("<div>").addClass("card-body");

  // Create task title
  const title = $("<h5>").addClass("card-title").text(task.title);

  // Create task description
  const description = $("<p>").addClass("card-text").text(task.description);

  // Create task deadline
  const deadline = $("<p>")
    .addClass("card-text text-muted")
    .text(`Deadline: ${task.deadline}`);

  // Create a checkbox for task completion
  const checkbox = $("<input>")
    .attr({ type: "checkbox", checked: task.completed })
    .addClass("form-check-input me-2");
  checkbox.on("change", function () {
    task.completed = checkbox.prop("checked");
    saveToLocalStorage();
    moveTaskCard(task, card);
  });

  // Create delete button
  const deleteButton = $("<button>")
    .addClass("btn btn-danger btn-sm")
    .text("Delete");
  deleteButton.on("click", function () {
    // Remove task from taskList
    taskList = taskList.filter((t) => t.id !== task.id);
    saveToLocalStorage();
    // Remove card from DOM
    card.remove();
  });

  // Append elements to card body
  cardBody.append(checkbox, title, description, deadline, deleteButton);

  // Append card body to card
  card.append(cardBody);

  // Append card to the appropriate container in DOM
  moveTaskCard(task, card);
}

// Function to move the task card to the appropriate lane
function moveTaskCard(task, card) {
  let container;
  if (task.completed) {
    container = $("#done-cards");
  } else if (task.inProgress) {
    container = $("#in-progress-cards");
  } else {
    container = $("#todo-cards");
  }
  container.append(card);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {});

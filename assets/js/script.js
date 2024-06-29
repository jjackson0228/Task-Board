// Retrieve tasks and nextId from localStorage
// added default values to tasks and nextId
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const taskId = nextId;
  nextId++;
  saveTasks(); // Update nextId in localStorage
  return taskId;
}

// Todo: create a function to create a task card
// made code to create card with header body text and deadline
function createTaskCard(task) {
  const taskElement = $(`
    <div class="task card mb-3" id="task-${task.id}" draggable="true">
      <div class="card-body">
        <h1 class="card-text">${task.title}</h1>
        <p class="card-text">${task.description}</p>
        <p class="card"><small class="text-muted">Deadline: ${task.deadline}</small></p>
        <button class="btn btn-danger btn-sm delete-task">Delete</button>
      </div>
    </div>
  `);

  // Append the created task card to the "To Do" column
  $("#todo-cards").append(taskElement);
  // Add event listener to the delete button
  taskElement.find(".delete-task").on("click", function () {
    $(this).closest(".task").remove(); // Remove the task card when delete button is clicked
  });
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $(".task-list").empty();

  taskList.forEach((task) => {
    const taskCard = createTaskCard(task);
    $(`#${task.state}-cards`).append(taskCard);
  });

  // Make tasks draggable
  $(".task").draggable({
    revert: "invalid",
    start: function (event, ui) {
      $(this).css("opacity", "0.5");
    },
    stop: function (event, ui) {
      $(this).css("opacity", "1");
    },
  });
  // Add delete button event listeners
  $(".delete-task").click(handleDeleteTask);
}
// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const newTask = {
    id: generateTaskId(),
    title: $("#taskTitle").val(),
    description: $("#taskDescription").val(),
    deadline: $("#taskDeadline").val(),
    state: "todo",
  };

  taskList.push(newTask);
  saveTasks();
  renderTaskList();
  $("#taskForm")[0].reset();
  $("#formModal").modal("hide");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $("#taskForm").submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Capture form data
    const taskTitle = $("#taskTitle").val();
    const taskDescription = $("#taskDescription").val();
    const taskDeadline = $("#taskDeadline").val();

    // Create a task object (using a simple ID generator for this example)
    const taskId = Date.now(); // Using current timestamp as a unique ID
    const task = {
      id: taskId,
      title: taskTitle,
      description: taskDescription,
      deadline: taskDeadline,
    };

    // Create and append the task card
    createTaskCard(task);

    // Clear the form
    $("#taskForm")[0].reset();

    // Close the modal
    $("#formModal").modal("hide");
  });
});

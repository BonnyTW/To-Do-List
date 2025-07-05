// Task storage
const tasks = [];

// DOM references
const taskListDiv = document.getElementById("Task");
const taskDetailDiv = document.getElementById("taskDetail");

// Add new task with subtasks
function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const subtasksInput = document.getElementById("taskSubtasks").value.trim();

  if (!title) {
    alert("Please enter a task title.");
    return;
  }

  const subtasks = subtasksInput
    .split(",")
    .map(s => s.trim())
    .filter(s => s !== "")
    .map(title => ({ title, done: false }));

  const task = { title, subtasks };
  tasks.unshift(task);

  renderAllTasks();

  // Clear inputs
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskSubtasks").value = "";
}

// Render all tasks
function renderAllTasks() {
  taskListDiv.innerHTML = "";
  tasks.forEach((task, index) => renderTaskCard(task, index));
}

// Render individual task card
function renderTaskCard(task, index) {
  const wrapper = document.createElement("div");
  wrapper.className = "task-wrapper";

  const card = document.createElement("div");
  card.className = "task-card";

  const shortTitle = task.title.length > 10
    ? task.title.slice(0, 10) + "..."
    : task.title;

  card.textContent = shortTitle;
  if (task.title.length > 10) card.title = task.title;

  // Hover effect based on completion
card.addEventListener("mouseenter", () => {
  const total = task.subtasks.length;
  const done = task.subtasks.filter(sub => sub.done).length;

  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const alpha = 0.2 + 0.6 * (percent / 100);

  // Subtle green background based on progress
  card.style.backgroundColor = `rgba(0, 128, 0, ${alpha})`;

  // Add or update percent inside the card
  let percentText = card.querySelector(".percent-text");
  if (!percentText) {
    percentText = document.createElement("div");
    percentText.className = "percent-text";
    percentText.style.fontSize = "14px";
    percentText.style.color = "#fff";
    percentText.style.marginTop = "10px";
    percentText.style.fontWeight = "bold";
    percentText.style.textAlign = "right";
    card.appendChild(percentText);
  }

  percentText.textContent = `${percent}% done`;
});

card.addEventListener("mouseleave", () => {
  card.style.backgroundColor = "";

  const percentText = card.querySelector(".percent-text");
  if (percentText) percentText.remove();
});



  card.addEventListener("click", () => showTaskDetail(index));

  // Delete button
  const deleteX = document.createElement("span");
  deleteX.textContent = "X";
  deleteX.className = "delete-x";
  deleteX.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTask(index);
  });

  wrapper.appendChild(card);
  wrapper.appendChild(deleteX);
  taskListDiv.prepend(wrapper);
}

// Show task + subtasks in detail view
function showTaskDetail(index) {
  const task = tasks[index];
  const subtaskList = task.subtasks.map((sub, i) => `
    <li onclick="toggleSubtask(${index}, ${i})" style="cursor:pointer;">
     ${sub.title} ${sub.done ? "✅" : "❌"} 
    </li>
  `).join("");

  taskDetailDiv.innerHTML = `
    <h3>${task.title}</h3>
    ${task.subtasks.length ? `<ul>${subtaskList}</ul>` : "<p>No subtasks</p>"}
  `;
  taskDetailDiv.style.display = "block";
}

// Toggle completion of a subtask
function toggleSubtask(taskIndex, subIndex) {
  const sub = tasks[taskIndex].subtasks[subIndex];
  sub.done = !sub.done;
  renderAllTasks();
  showTaskDetail(taskIndex);
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderAllTasks();
  taskDetailDiv.style.display = "none";
}

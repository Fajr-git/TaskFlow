const taskList = document.getElementById("taskList");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function addTask() {

    const input =
    document.getElementById("taskInput");

    const priority =
    document.getElementById("priority");

    if (!input || input.value.trim() === "")
        return;

    tasks.push({
        name: input.value,
        priority: priority.value,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
}

function completeTask(index) {

    tasks[index].completed = true;
    saveTasks();
    renderTasks();
    updateDashboard();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
    updateDashboard();
}

function renderTasks() {

    if (!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li =
        document.createElement("li");

        li.innerHTML = `
        <div class="task-row">

            <div>
                <strong>${task.name}</strong><br>
                <small>${task.priority}</small>
            </div>

            <div>

                ${
                    task.completed
                    ? '<span class="done">Completed ✓</span>'
                    : `<button class="complete-btn"
                    onclick="completeTask(${index})">
                    Complete
                    </button>`
                }

                <button
                class="delete-btn"
                onclick="deleteTask(${index})">
                Delete
                </button>

            </div>

        </div>
        `;

        taskList.appendChild(li);
    });
}

function updateDashboard() {

    const total =
    document.getElementById("totalTasks");

    const completed =
    document.getElementById("completedTasks");

    const pending =
    document.getElementById("pendingTasks");

    if (!total) return;

    total.textContent =
    tasks.length;

    completed.textContent =
    tasks.filter(t => t.completed).length;

    pending.textContent =
    tasks.filter(t => !t.completed).length;
}

renderTasks();
updateDashboard();
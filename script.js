document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", function() {
        li.classList.toggle("completed");
        saveTasks();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
        li.remove();
        saveTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({ text: li.textContent.replace("X", "").trim(), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        tasks.forEach((task) => {
            let li = document.createElement("li");
            li.textContent = task.text;
            if (task.completed) li.classList.add("completed");

            li.addEventListener("click", function() {
                li.classList.toggle("completed");
                saveTasks();
            });

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = function() {
                li.remove();
                saveTasks();
            };

            li.appendChild(deleteBtn);
            document.getElementById("taskList").appendChild(li);
        });
    }
}

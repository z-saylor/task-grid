import "./styles.css";
import {GridModule} from "./grid-module/grid-module.js";
import {Task, TaskList} from "./task-module/task-module.js";

const taskGrid = new GridModule();
taskGrid.buildMiniGrid();

let currentContent = "tasks";

const contentDiv = document.querySelector(".content");
const miniGridDiv = document.querySelector(".mini-grid");

miniGridDiv.addEventListener("click", (e) => {
    contentDiv.innerHTML = "";
    if (currentContent == "grid") {
        allTasks.displayTasks();
        currentContent = "tasks";
    } else {
        taskGrid.buildGrid();
        currentContent = "grid";
    }
});

const testTask = new Task("Zach's first task", "low", "med");

const allTasks = new TaskList();
allTasks.addTask(testTask);
allTasks.addTask(new Task("Another Task", "high", "low"));
allTasks.addTask(new Task("A third Task", "med", "high"));

allTasks.displayTasks();
import "./styles.css";
import {GridModule} from "./grid-module/grid-module.js";
import {Task, TaskList} from "./task-module/task-module.js";

const taskGrid = new GridModule();
taskGrid.buildMiniGrid();

const testTask = new Task("Zach's first task", "low", "med");
const allTasks = new TaskList();

let currentContent = "tasks";

const contentDiv = document.querySelector(".content");
const miniGridDiv = document.querySelector(".mini-grid");
const addTaskDiv = document.querySelector(".add-task");

miniGridDiv.addEventListener("click", (e) => {
    contentDiv.innerHTML = "";
    if (currentContent == "grid") {
        allTasks.filterToTaskGrid(taskGrid.getGrid());
        allTasks.displayTasks();
        currentContent = "tasks";
    } else {
        taskGrid.buildGrid();
        currentContent = "grid";
    }
});

addTaskDiv.addEventListener("click", (e) => {
    contentDiv.innerHTML = "";
    allTasks.displayAddEditTask();
});



//testing startup
allTasks.addTask(testTask);
allTasks.addTask(new Task("Another Task", "high", "low"));
allTasks.addTask(new Task("A third Task", "med", "high"));

//actual startup
allTasks.filterToTaskGrid(taskGrid.getGrid());
allTasks.displayTasks();
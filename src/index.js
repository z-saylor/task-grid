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
const logoDiv = document.querySelector(".logo > h1");

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

    const cancelButtonDiv = document.querySelector(".cancel-button");
    cancelButtonDiv.addEventListener("click", (e) => {
        allTasks.filterToTaskGrid(taskGrid.getGrid());
        allTasks.displayTasks();
        currentContent = "tasks";
    });

    const saveButtonDiv = document.querySelector(".save-button");
    const nameEntryDiv = document.querySelector(".name-entry-field");
    const timeSelectDiv = document.querySelector(".time-select");
    const impactSelectDiv = document.querySelector(".impact-select");
    const detailsEntryDiv = document.querySelector(".details-entry-field");

    saveButtonDiv.addEventListener("click", (e) => {
        console.log(nameEntryDiv.value);
        allTasks.addTask(new Task(
            nameEntryDiv.value,
            timeSelectDiv.dataset.selection,
            impactSelectDiv.dataset.selection),
            detailsEntryDiv.value);
        allTasks.filterToTaskGrid(taskGrid.getGrid());
        allTasks.displayTasks();
        currentContent = "tasks";
        alert(detailsEntryDiv.value);
    });
});

logoDiv.addEventListener("click", (e) => {
    allTasks.filterToTaskGrid(taskGrid.getGrid());
    allTasks.displayTasks();
    currentContent = "tasks";
});

//testing startup
allTasks.addTask(testTask);
allTasks.addTask(new Task("Another Task", "high", "low"));
allTasks.addTask(new Task("A third Task", "med", "high"));

//actual startup
allTasks.filterToTaskGrid(taskGrid.getGrid());
allTasks.displayTasks();
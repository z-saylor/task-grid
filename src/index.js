import "./styles.css";
import {GridModule} from "./grid-module/grid-module.js";
import {Task, TaskList} from "./task-module/task-module.js";

const taskGrid = new GridModule();
taskGrid.buildMiniGrid();

const allTasks = new TaskList();

let currentContent = "tasks";

//startup
allTasks.filterToTaskGrid(taskGrid.getGrid());
allTasks.displayTasks();

const contentDiv = document.querySelector(".content");
const miniGridDiv = document.querySelector(".mini-grid");
const addTaskDiv = document.querySelector(".add-task");
const logoDiv = document.querySelector(".logo > h1");
const taskDiv = document.querySelector(".task");

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
    cancelButtonDiv.addEventListener("click", (event) => {
        allTasks.filterToTaskGrid(taskGrid.getGrid());
        allTasks.displayTasks();
        currentContent = "tasks";
    });

    const saveButtonDiv = document.querySelector(".save-button");
    const nameEntryDiv = document.querySelector(".name-entry-field");
    const timeSelectDiv = document.querySelector(".time-select");
    const impactSelectDiv = document.querySelector(".impact-select");
    const detailsEntryDiv = document.querySelector(".details-entry-field");

    saveButtonDiv.addEventListener("click", (event) => {
        if (timeSelectDiv.dataset.selection 
            && impactSelectDiv.dataset.selection
        ) {
            allTasks.addTask(new Task(
                nameEntryDiv.value,
                timeSelectDiv.dataset.selection,
                impactSelectDiv.dataset.selection,
                detailsEntryDiv.value));
            allTasks.filterToTaskGrid(taskGrid.getGrid());
            allTasks.displayTasks();
            currentContent = "tasks";
            allTasks.save();
        } else {
            alert("impact and time are REQUIRED");
        }
        
    });
});

logoDiv.addEventListener("click", (e) => {
    allTasks.filterToTaskGrid(taskGrid.getGrid());
    allTasks.displayTasks();
    currentContent = "tasks";
});

document.addEventListener("task-completed", (e) => {
    allTasks.filterToTaskGrid(taskGrid.getGrid());
    allTasks.displayTasks();
    currentContent = "tasks";
    allTasks.save();
});

document.addEventListener("task-clicked", (event) => {
    const editingTask = event.task.task;
    
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
    const currentTimeDiv = document.querySelector(".time-select > ." + editingTask.time);
    const impactSelectDiv = document.querySelector(".impact-select");
    const currentImpactDiv = document.querySelector(".impact-select > ." + editingTask.impact);
    const detailsEntryDiv = document.querySelector(".details-entry-field");

    nameEntryDiv.value = editingTask.name;
    detailsEntryDiv.value = editingTask.details;
    timeSelectDiv.dataset.selection = editingTask.time;
    currentTimeDiv.classList.add("selected");
    impactSelectDiv.dataset.selection = editingTask.impact;
    currentImpactDiv.classList.add("selected");

    saveButtonDiv.addEventListener("click", (e) => {
        if (timeSelectDiv.dataset.selection 
            && impactSelectDiv.dataset.selection
        ) {
            editingTask.update(
                nameEntryDiv.value,
                timeSelectDiv.dataset.selection,
                impactSelectDiv.dataset.selection,
                detailsEntryDiv.value);
            allTasks.filterToTaskGrid(taskGrid.getGrid());
            allTasks.displayTasks();
            currentContent = "tasks";
            allTasks.save();
        } else {
            alert("impact and time are REQUIRED");
        }
        
    });
});
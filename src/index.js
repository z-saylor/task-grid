import "./styles.css";
import {GridModule} from "./grid-module/grid-module.js";
import {Task, TaskList} from "./task-module/task-module.js";

GridModule.buildMiniGrid();

let gridActive = false;
let currentContent = "tasks";

const contentDiv = document.querySelector(".content");
const miniGridDiv = document.querySelector(".mini-grid");

miniGridDiv.addEventListener("click", (e) => {
    contentDiv.innerHTML = "";
    if (currentContent == "grid") {
        allTasks.displayTasks();
        currentContent = "tasks";
    } else {
        GridModule.buildGrid();
        currentContent = "grid";
    }
});

const testTask = new Task("Zach's first task", "low", "med");
console.log(testTask);
console.log(testTask.created);

const allTasks = new TaskList();
allTasks.addTask(testTask);
allTasks.addTask(new Task("Another Task", "high", "low"));
allTasks.addTask(new Task("A third Task", "med", "high"));
console.log(allTasks.getTasks());

allTasks.displayTasks();
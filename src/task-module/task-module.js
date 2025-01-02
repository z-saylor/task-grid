import "./task-module.css";
import {format} from "date-fns";

class Task {
    constructor(name, time, impact, dueDate = null) {
        this.name = name;
        this.time = time;
        this.impact = impact;
        this.due = dueDate;
        this.tID = Date.now();
        this.createdDate = new Date();
        this.active = true;
        this.complete = false;
    }

    get due() {
        if (this.dueDate) {
            return format(this.dueDate, "MM/dd/yyyy");
        } else {
            return "N/A";
        }        
    }
    set due(dueDate) {
        if (dueDate) {
            this.dueDate = new Date(dueDate);
        } else {
            this.dueDate = null;
        }
    }
    get created() {
        return format(this.createdDate, "MM/dd/yyyy");
    }

}

class TaskList {
    constructor(existingList) {
        this.list = existingList ? existingList : [];

        //set all tasks as active?
    }

    addTask(task) {
        this.list.push(task);
    }
    getTasks() {
        return this.list;
    }

    displayTasks() {
        const contentDiv = document.querySelector(".content");
        const taskContentDiv = document.createElement("div");
        taskContentDiv.classList.add("task-content");

        const taskHeaderDiv = document.createElement("div");
        taskHeaderDiv.classList.add("task-header");

        taskHeaderDiv.appendChild(document.createElement("div"));
        const nameHeaderDiv = document.createElement("div");
        nameHeaderDiv.textContent = "Name";
        taskHeaderDiv.appendChild(nameHeaderDiv);
        const timeHeaderDiv = document.createElement("div");
        timeHeaderDiv.textContent = "Time";
        taskHeaderDiv.appendChild(timeHeaderDiv);
        const impactHeaderDiv = document.createElement("div");
        impactHeaderDiv.textContent = "Impact";
        taskHeaderDiv.appendChild(impactHeaderDiv);
        const dueHeaderDiv = document.createElement("div");
        dueHeaderDiv.textContent = "Due";
        taskHeaderDiv.appendChild(dueHeaderDiv);
        
        taskContentDiv.appendChild(taskHeaderDiv);

        //create list with all tasks flagged active

        for (let i in this.list) {
            const taskDiv = document.createElement("div");
            taskDiv.dataset.tid = this.list[i].tID;
            taskDiv.classList.add("task");

            const checkboxDiv = document.createElement("div");
            checkboxDiv.classList.add("task-checkbox");
            checkboxDiv.dataset.tid = this.list[i].tID;
            taskDiv.appendChild(checkboxDiv);

            const taskNameDiv = document.createElement("div");
            taskNameDiv.classList.add("task-name");
            taskNameDiv.textContent = this.list[i].name;
            taskDiv.appendChild(taskNameDiv);

            const taskTimeDiv = document.createElement("div");
            taskTimeDiv.classList.add("task-time");
            taskTimeDiv.classList.add(this.list[i].time);
            taskTimeDiv.textContent = this.list[i].time;
            taskDiv.appendChild(taskTimeDiv);

            const taskImpactDiv = document.createElement("div");
            taskImpactDiv.classList.add("task-impact");
            taskImpactDiv.classList.add(this.list[i].impact);
            taskImpactDiv.textContent = this.list[i].impact;
            taskDiv.appendChild(taskImpactDiv);

            const taskDueDiv = document.createElement("div");
            taskDueDiv.classList.add("task-due");
            taskDueDiv.textContent = this.list[i].created;
            taskDiv.appendChild(taskDueDiv);

            taskContentDiv.appendChild(taskDiv);
        }
        contentDiv.appendChild(taskContentDiv);
    }
}

export {Task, TaskList}
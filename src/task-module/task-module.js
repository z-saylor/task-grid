import "./task-module.css";
import {format} from "date-fns";

class Task {
    constructor(name, time, impact, details, dueDate = null) {
        this.name = name;
        this.time = time;
        this.impact = impact;
        this.details = details;
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
            if (this.list[i].active) {
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
            
        }
        contentDiv.appendChild(taskContentDiv);
    }

    displayAddEditTask(mode = "add", id = null) {
        //define variables
        let timeSelection = null;
        let impactSelection = null;
        
        const contentDiv = document.querySelector(".content");
        contentDiv.innerHTML = '';
        const formContainerDiv = document.createElement("div");
        formContainerDiv.classList.add("form-container");

        let formfields = [];
        //create all the entries
        const nameLabelDiv = document.createElement("label");
        nameLabelDiv.classList.add("task-form-label");
        nameLabelDiv.textContent = "name";
        formfields.push(nameLabelDiv);
        const nameEntryDiv = document.createElement("input");
        nameEntryDiv.classList.add("task-entry-field");
        nameEntryDiv.classList.add("name-entry-field");
        formfields.push(nameEntryDiv);

        const timeLabelDiv = document.createElement("label");
        timeLabelDiv.classList.add("task-form-label");
        timeLabelDiv.textContent = "time to complete";
        formfields.push(timeLabelDiv);

        const timeSelectDiv = document.createElement("div");
        timeSelectDiv.classList.add("time-select");
        const lowTimeDiv = document.createElement("div");
        const medTimeDiv = document.createElement("div");
        const highTimeDiv = document.createElement("div");
        lowTimeDiv.classList.add("select-option");
        lowTimeDiv.classList.add("low");
        lowTimeDiv.dataset.level = "low";
        medTimeDiv.classList.add("select-option");
        medTimeDiv.classList.add("med");
        medTimeDiv.dataset.level = "med";
        highTimeDiv.classList.add("select-option");
        highTimeDiv.classList.add("high");
        highTimeDiv.dataset.level = "high";
        lowTimeDiv.textContent = "low";
        medTimeDiv.textContent = "med";
        highTimeDiv.textContent = "high";
        timeSelectDiv.appendChild(lowTimeDiv);
        timeSelectDiv.appendChild(medTimeDiv);
        timeSelectDiv.appendChild(highTimeDiv);
        formfields.push(timeSelectDiv);

        timeSelectDiv.addEventListener("click", (e) => {
            let timeSelectionUnchecked = e.target.dataset.level;
            if (timeSelectionUnchecked) {
                timeSelection = timeSelectionUnchecked;
                lowTimeDiv.classList.remove("selected");
                medTimeDiv.classList.remove("selected");
                highTimeDiv.classList.remove("selected");
                e.target.classList.add("selected");
            }
        });

        const impactLabelDiv = document.createElement("label");
        impactLabelDiv.classList.add("task-form-label");
        impactLabelDiv.textContent = "impact";
        formfields.push(impactLabelDiv);

        const impactSelectDiv = document.createElement("div");
        impactSelectDiv.classList.add("impact-select");
        const lowImpactDiv = document.createElement("div");
        const medImpactDiv = document.createElement("div");
        const highImpactDiv = document.createElement("div");
        lowImpactDiv.classList.add("select-option");
        lowImpactDiv.classList.add("low");
        lowImpactDiv.dataset.level = "low";
        medImpactDiv.classList.add("select-option");
        medImpactDiv.classList.add("med");
        medImpactDiv.dataset.level = "med";
        highImpactDiv.classList.add("select-option");
        highImpactDiv.classList.add("high");
        highImpactDiv.dataset.level = "high";
        lowImpactDiv.textContent = "low";
        medImpactDiv.textContent = "med";
        highImpactDiv.textContent = "high";
        impactSelectDiv.appendChild(lowImpactDiv);
        impactSelectDiv.appendChild(medImpactDiv);
        impactSelectDiv.appendChild(highImpactDiv);
        formfields.push(impactSelectDiv);

        impactSelectDiv.addEventListener("click", (e) => {
            let impactSelectionUnchecked = e.target.dataset.level;
            if (impactSelectionUnchecked) {
                impactSelection = impactSelectionUnchecked;
                lowImpactDiv.classList.remove("selected");
                medImpactDiv.classList.remove("selected");
                highImpactDiv.classList.remove("selected");
                e.target.classList.add("selected");
            }
        });

        const detailsLabelDiv = document.createElement("label");
        detailsLabelDiv.classList.add("task-form-label");
        detailsLabelDiv.textContent = "details";
        formfields.push(detailsLabelDiv);
        const detailsEntryDiv = document.createElement("textarea");
        detailsEntryDiv.classList.add("task-entry-field");
        detailsEntryDiv.classList.add("details-entry-field");
        detailsEntryDiv.setAttribute("rows", "10");
        formfields.push(detailsEntryDiv);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("task-buttons");
        const cancelButtonDiv = document.createElement("div");
        cancelButtonDiv.classList.add("task-module-button");
        cancelButtonDiv.textContent = "cancel";
        const saveButtonDiv = document.createElement("div");
        saveButtonDiv.classList.add("task-module-button");
        saveButtonDiv.classList.add("save-button");
        saveButtonDiv.textContent = "save";
        buttonsDiv.appendChild(cancelButtonDiv);
        buttonsDiv.appendChild(saveButtonDiv);
        formfields.push(buttonsDiv);
        
        for (let i in formfields) {
            formContainerDiv.appendChild(formfields[i]);
        }
        contentDiv.appendChild(formContainerDiv);
        //if edit mode, fill in current
        

        //save and cancel buttons with logic


    }

    filterToTaskGrid(grid) {
        const timeMap = {"low":0, "med": 1, "high": 2};
        const impactMap = {"low": 2, "med": 1, "high": 0};

        for (let i in this.list) {
            if (grid[impactMap[this.list[i].impact]][timeMap[this.list[i].time]]) {
                this.list[i].active = true;
            } else {
                this.list[i].active = false;
            }
        }
    }

    filterCompleted(option) {
        //filter to completed if true, filter to uncompleted if false
    }
}

export {Task, TaskList}
//import {GridModule} from "./grid-module/grid-module.js" in main js file
//create new GridModule instance in main js file
//insert <div class="grid-module"></div> into html where grid module should display
//add event listeners for cell div in main code to get row/column of click via data attributes

import "./grid-module.css";

class GridModule {
    constructor() {
        const gridDiv = document.querySelector(".grid-module");

        //add grid elements with initial blank values
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const gridCellDiv = document.createElement("div");
                const gridNumberDiv = document.createElement("div");
                gridCellDiv.classList.add("grid-cell");
                gridNumberDiv.classList.add("grid-number");
                gridCellDiv.dataset.row = i;
                gridCellDiv.dataset.column = j;
                gridNumberDiv.dataset.row = i;
                gridNumberDiv.dataset.column = j;
                gridNumberDiv.textContent = ((i+4)*j).toString();
                gridCellDiv.appendChild(gridNumberDiv);
                gridDiv.appendChild(gridCellDiv);
            }
        }

        const miniGridDiv = document.querySelector(".mini-grid");

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const miniGridCellDiv = document.createElement("div");
                miniGridCellDiv.classList.add("mini-grid-cell");
                miniGridCellDiv.dataset.row = i;
                miniGridCellDiv.dataset.column = j;;
                miniGridDiv.appendChild(miniGridCellDiv);
            }
        }
    }
}

export { GridModule }
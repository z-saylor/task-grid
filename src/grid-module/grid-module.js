import "./grid-module.css";

export class GridModule {
    constructor() {
        this.grid = [];
        for (let i = 0; i < 3; i++) {
            this.grid[i] = [true, true, true];
        }

        console.log(this.grid);
    }

    buildGrid() {
        const contentDiv = document.querySelector(".content");
        contentDiv.innerHTML = '';
        const gridModulePageDiv = document.createElement("div");
        gridModulePageDiv.classList.add("grid-module-page");
        const gridContainerDiv = document.createElement("div");
        gridContainerDiv.classList.add("grid-module-container");
        const gridDiv = document.createElement("div");
        gridDiv.classList.add("grid-module");

        const startHereDiv = document.createElement("div");
        startHereDiv.classList.add("start-here");
        const lowerTimeDiv = document.createElement("div");
        lowerTimeDiv.classList.add("lower-time");
        const higherImpactDiv = document.createElement("div");
        higherImpactDiv.classList.add("higher-impact");

        gridContainerDiv.appendChild(startHereDiv);
        gridContainerDiv.appendChild(lowerTimeDiv);
        gridContainerDiv.appendChild(higherImpactDiv);
        gridContainerDiv.appendChild(gridDiv);
        gridModulePageDiv.appendChild(gridContainerDiv);
        contentDiv.appendChild(gridModulePageDiv);

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
                if (this.grid[i][j] == true) {
                    gridCellDiv.classList.add("active");
                }
                gridNumberDiv.textContent = ((i+4)*j).toString();
                gridCellDiv.appendChild(gridNumberDiv);
                gridDiv.appendChild(gridCellDiv);

                gridCellDiv.addEventListener("click", (e) => {
                    if (this.grid[i][j]) {
                        gridCellDiv.classList.remove("active");
                        this.grid[i][j] = false;
                    } else {
                        gridCellDiv.classList.add("active");
                        this.grid[i][j] = true;
                    } 
                    this.buildMiniGrid();
                });
            }
        }

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("grid-buttons");
        const allButtonDiv = document.createElement("div");
        allButtonDiv.classList.add("grid-module-button");
        allButtonDiv.textContent = "all";
        const noneButtonDiv = document.createElement("div");
        noneButtonDiv.classList.add("grid-module-button");
        noneButtonDiv.textContent = "none";
        buttonsDiv.appendChild(allButtonDiv);
        buttonsDiv.appendChild(noneButtonDiv);
        gridModulePageDiv.appendChild(buttonsDiv);

        allButtonDiv.addEventListener("click", (e) => {
            for (let i = 0; i<3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.grid[i][j] = true;
                }
            }
            this.buildGrid();
            this.buildMiniGrid();
        });

        noneButtonDiv.addEventListener("click", (e) => {
            for (let i = 0; i<3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.grid[i][j] = false;
                }
            }
            this.buildGrid();
            this.buildMiniGrid();
        });
    }

    buildMiniGrid() {
        const miniGridDiv = document.querySelector(".mini-grid");
        miniGridDiv.innerHTML = '';

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const miniGridCellDiv = document.createElement("div");
                miniGridCellDiv.classList.add("mini-grid-cell");
                if (this.grid[i][j]) {
                    miniGridCellDiv.classList.add("active");
                }
                miniGridCellDiv.dataset.row = i;
                miniGridCellDiv.dataset.column = j;;
                miniGridDiv.appendChild(miniGridCellDiv);
            }
        }
    }

    getGrid() {
        return this.grid;
    }
}
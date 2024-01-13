let state_mouseDown = false;
document.addEventListener("mousedown", () => state_mouseDown = true);
document.addEventListener("mouseup", () => state_mouseDown = false);

let gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container");
document.body.appendChild(gridContainer);
let sketchGrid = document.createElement("div");
sketchGrid.setAttribute("class", "grid")
gridContainer.appendChild(sketchGrid);
for (let i = 0; i < 4; i++) {
    let gridColumn = document.createElement("div");
    gridColumn.setAttribute("class", "grid-column");
    sketchGrid.appendChild(gridColumn);
    for (let j = 0; j < 4; j++) {
        let gridPixel = document.createElement("div");
        gridPixel.setAttribute("class", "grid-pixel");
        gridPixel.addEventListener("mouseenter", () => {
            if (state_mouseDown) {
                gridPixel.classList.add("grid-pixel-drawn");
            }
        })
        gridColumn.appendChild(gridPixel);
    }
}

let resizeButton = document.querySelector("#resize-button");
resizeButton.addEventListener("click", () => {
    let newWidth = Number(prompt("input new width of grid between 1 and 100"));
    if (newWidth === NaN || newWidth <= 0 || newWidth > 100) {
        alert("invalid width, please try again");
        return;
    }
    resetGrid(newWidth);
});

function resetGrid(width) {
    gridContainer.removeChild(sketchGrid);
    sketchGrid = document.createElement("div");
    sketchGrid.setAttribute("class", "grid")
    gridContainer.appendChild(sketchGrid);
    for (let i = 0; i < width; i++) {
        let gridColumn = document.createElement("div");
        gridColumn.setAttribute("class", "grid-column");
        gridColumn.style.setProperty("flex-basis", `${100/width}%`);
        sketchGrid.appendChild(gridColumn);
        for (let j = 0; j < width; j++) {
            let gridPixel = document.createElement("div");
            gridPixel.setAttribute("class", "grid-pixel");
            gridPixel.addEventListener("mouseenter", () => {
                if (state_mouseDown) {
                    gridPixel.classList.add("grid-pixel-drawn");
                }
            })
            gridColumn.appendChild(gridPixel);
        }
    }
}
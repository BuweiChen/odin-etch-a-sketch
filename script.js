let state_mouseDown = false;
document.addEventListener("mousedown", () => state_mouseDown = true);
document.addEventListener("mouseup", () => state_mouseDown = false);

let sketchGrid = document.createElement("div");
sketchGrid.setAttribute("class", "grid")
document.body.appendChild(sketchGrid);
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
    let newWidth = Number(prompt("input new width of grid"));
    if (newWidth === NaN || newWidth <= 0) {
        alert("invalid width, please try again");
        return;
    }
    resetGrid(newWidth);
});

function resetGrid(width) {
    document.body.removeChild(sketchGrid);
    sketchGrid = document.createElement("div");
    sketchGrid.setAttribute("class", "grid")
    document.body.appendChild(sketchGrid);
    for (let i = 0; i < width; i++) {
        let gridColumn = document.createElement("div");
        gridColumn.setAttribute("class", "grid-column");
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
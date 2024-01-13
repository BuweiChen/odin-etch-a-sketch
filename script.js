let state_mouseDown = false;
let state_rgb = false;
let state_progressive = false;
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
                let red = 255, green = 0, blue = 0, a = 1;
                if (state_rgb) {
                    red = Math.round(Math.random() * 255);
                    green = Math.round(Math.random() * 255);
                    blue = Math.round(Math.random() * 255);
                }
                if (state_progressive) {
                    if (!gridPixel.hasAttribute("data-opacity")) {
                        gridPixel.setAttribute("data-opacity", "0.1");
                    }
                    else if (gridPixel.getAttribute("data-opacity") !== "1") {
                        gridPixel.setAttribute("data-opacity", String(Number(gridPixel.getAttribute("data-opacity")) + 0.1));
                    }
                    a = gridPixel.getAttribute("data-opacity");
                }
                else {
                    gridPixel.removeAttribute("data-opacity");
                }
                gridPixel.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${a})`;
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
                    if (state_rgb) {
                        gridPixel.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
                    }
                }
            })
            gridColumn.appendChild(gridPixel);
        }
    }
}

let rgbButton = document.querySelector("#rgb-button");
rgbButton.addEventListener("click", () => {
    if (state_rgb) {
        rgbButton.innerHTML = "rgb";
        state_rgb = false;
    } else {
        rgbButton.innerHTML = "un-rgb";
        state_rgb = true;
    }
});

let progressiveButton = document.querySelector("#progressive-button");
progressiveButton.addEventListener("click", () => {
    if (state_progressive) {
        progressiveButton.innerHTML = "progresive";
        state_progressive = false;
    } else {
        progressiveButton.innerHTML = "un-progressive";
        state_progressive = true;
    }
});
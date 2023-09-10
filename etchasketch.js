const gridContainer = document.getElementById('screen');
const gridSlider = document.getElementById('grid-slider');
let isRainbowMode = false; // Variable to track the mode

// Define grid sizes
const gridSizes = [
  { rows: 32, cols: 32 },
  { rows: 64, cols: 64 },
  { rows: 100, cols: 100 }
];

// Function to create the grid based on the selected size and mode
function createGrid(etchRows, etchCols) {
  gridContainer.innerHTML = ''; // Clear the existing grid
  gridContainer.style.gridTemplateRows = `repeat(${etchRows}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${etchCols}, 1fr)`;
  
  for (let i = 0; i < etchRows * etchCols; i++) {
    const square = document.createElement('div');
    square.classList.add('screen');

    square.addEventListener('mouseover', () => {
      // Change the background color of the hovered square based on the mode
      if (isRainbowMode) {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        square.style.backgroundColor = randomColor;
      } else {
        square.style.backgroundColor = 'gray';
      }
    });

    gridContainer.appendChild(square);
  }
}

// Event listener for the slider
gridSlider.addEventListener('input', () => {
  const selectedSize = gridSizes[gridSlider.value - 1]; // Get the selected size
  createGrid(selectedSize.rows, selectedSize.cols);
});

// Event listener for the "Gray Grid" button
document.getElementById("classic").addEventListener("click", () => {
  isRainbowMode = false;
  createGrid(gridSizes[gridSlider.value - 1].rows, gridSizes[gridSlider.value - 1].cols);
});

// Event listener for the "Rainbow Grid" button
document.getElementById("rainbow").addEventListener("click", () => {
  isRainbowMode = true;
  // No need to recreate the grid here; just update the mode
});

// Initialize the grid with the default size (32x32) and style (gray grid)
createGrid(gridSizes[0].rows, gridSizes[0].cols);


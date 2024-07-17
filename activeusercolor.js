function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
let selectedElement = null;
let userColor = localStorage.getItem("userColor");
if (!userColor) {
  userColor = getRandomColor();
}
// Function to handle element selection and add border
function handleElementSelect(event) {
  const target = event.target;
  console.log(userColor);

  // Check if the clicked element is an input, select, or textarea within the gameScores table
  if (
    target.closest(".gameScores") &&
    (target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "TEXTAREA")
  ) {
    if (selectedElement) {
      selectedElement.style.border = ""; // Remove border from previously selected element
    }
    selectedElement = target;
    selectedElement.style.border = `1px solid ${userColor}`; // Add colored border to the selected element
  }
}

// Add event listener to the tablesContainer
tablesContainer.addEventListener("click", handleElementSelect);

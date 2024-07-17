// Load dark mode preference on page load
const isDarkMode = localStorage.getItem("darkMode") === "true";
const darkModeToggle = document.getElementById("darkModeToggle");
if (isDarkMode) {
  document.body.classList.add("dark-mode");
  darkModeToggle.textContent = "Light Mode"; // Update button text
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save dark mode preference to local storage
  const newDarkModeState = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", newDarkModeState);

  // Update button text
  darkModeToggle.textContent = newDarkModeState ? "Light Mode" : "Dark Mode";
});

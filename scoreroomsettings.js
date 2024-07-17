const scoreRoomSettingsModal = document.getElementById(
  "scoreRoomSettingsModal"
);
const scoreRoomSettingsButton = document.getElementById(
  "scoreRoomSettingsButton"
);
const scoreRoomSelect = document.getElementById("scoreRoomSelect");
const scoreRoomNameInput = document.getElementById("scoreRoomNameInput");
const scoreRoomDateInput = document.getElementById("scoreRoomDateInput");
const scoreRoomLobbyInput = document.getElementById("scoreRoomLobbyInput");
const scoreRoomServerInput = document.getElementById("scoreRoomServerInput");
const scoreRoomNicknameInput = document.getElementById(
  "scoreRoomNicknameInput"
);
const createScoreRoomButton = document.getElementById("createScoreRoomButton");
const shareScoreRoomLink = document.getElementById("shareScoreRoomLink");
const deleteScoreRoomButton = document.getElementById("deleteScoreRoomButton");

// Function to close the score room settings modal
function closeScoreRoomSettingsModal() {
  currentScoreRoom = scoreRoomSelect.value;
  saveScoreRoomSettings();
  loadCurrentScoreRoom();

  scoreRoomSettingsModal.style.display = "none";
}

// Function to open the score room settings modal to edit an EXISTING score room
function openScoreRoomSettingsModal() {
  // Populate the score room selector
  populateScoreRoomSelect();

  // Load settings for the currently selected score room
  loadScoreRoomSettings(currentScoreRoom);

  scoreRoomSettingsModal.style.display = "block";
}

// Function to load settings for a specific score room
function loadScoreRoomSettings(scoreRoomName) {
  const settings = scoreRoomData.scoreRoomSettings || {};
  scoreRoomNameInput.value = scoreRoomName;
  scoreRoomDateInput.value = settings.date || "";
  scoreRoomLobbyInput.value = settings.lobby || "";
  scoreRoomServerInput.value = settings.server || "";
  scoreRoomNicknameInput.value = settings.nickname || "";
  updateShareLink();
}

// Function to save settings for a specific score room
function saveScoreRoomSettings() {
  const scoreRoomName = scoreRoomNameInput.value.trim();
  //scoreRooms[scoreRoomName] = scoreRooms[scoreRoomName] || {}; // Create if not exists
  scoreRoomData.scoreRoomSettings = {
    date: scoreRoomDateInput.value,
    lobby: scoreRoomLobbyInput.value,
    server: scoreRoomServerInput.value,
    nickname: scoreRoomNicknameInput.value,
  };
  //saveScoreRooms(); // Save all score rooms to local storage

  // Update the score room selector
  populateScoreRoomSelect();
}

// Function to populate the score room selector
function populateScoreRoomSelect() {
  scoreRoomSelect.innerHTML = ""; // Clear existing options
  console.log(scoreRoomIds);
  Object.keys(scoreRoomIds).length;
  for (id in scoreRoomIds) {
    const option = document.createElement("option");
    option.value = id;
    option.text = scoreRoomIds[id] || `Score Room ${id}`;
    scoreRoomSelect.add(option);
  }
  // Load settings for the currently selected score room after updating the dropdown
  loadScoreRoomSettings(currentScoreRoom);
}

function updateShareLink() {
  const shareLinkElement = document.getElementById("shareScoreRoomLink");
  const currentUrl = new URL(window.location.href);

  if (scoreRoomIds[currentScoreRoom]) {
    // Check if score room ID exists
    currentUrl.searchParams.set("shareId", currentScoreRoom);
    shareLinkElement.textContent = currentUrl.toString();
  } else {
    shareLinkElement.textContent = "Score Room ID not yet generated."; // Display a message if no ID
  }
}

// Event listener for the "Score Room Settings" button
scoreRoomSettingsButton.addEventListener("click", openScoreRoomSettingsModal); // Call openScoreRoomSettingsModal to open the existing modal
//
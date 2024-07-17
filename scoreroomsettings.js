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
const scorescrimNameInput = document.getElementById("scoreRoomScrimNameInput");
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
  scorescrimNameInput.value = settings.scrimName || "";
  updateShareLink(scoreRoomName);
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
    scrimName: scorescrimNameInput.value,
  };

  scoreRoomIds[currentScoreRoom] = scoreRoomNicknameInput.value || null;
  localStorage.setItem("scoreRoomIds", JSON.stringify(scoreRoomIds));
  //saveScoreRooms(); // Save all score rooms to local storage

  // Update the score room selector
  populateScoreRoomSelect();
}

// Function to populate the score room selector
function populateScoreRoomSelect(currentScoreRoom) {
  scoreRoomSelect.innerHTML = ""; // Clear existing options
  console.log(scoreRoomIds);
  const scoreRoomIdsArr = Object.keys(scoreRoomIds);
  for (let i =0;i<scoreRoomIdsArr.length;i++) {
    const id = scoreRoomIdsArr[i];
    const scoreRoomName = scoreRoomIds[id] || `Score Room ${i}`;
    const option = document.createElement("option");
    option.value = id;
    option.text = scoreRoomName;
    scoreRoomSelect.add(option);
  }
  // Load settings for the currently selected score room after updating the dropdown
  loadScoreRoomSettings(currentScoreRoom);
}

function updateShareLink(scoreRoomName) {
  const shareLinkElement = document.getElementById("shareScoreRoomLink");
  const currentUrl = new URL(window.location.href);//
  console.log(`${scoreRoomName} : ${scoreRoomIds[scoreRoomName]}`);

  if (scoreRoomIds[scoreRoomName]) {
    // Check if score room ID exists
    currentUrl.searchParams.set("shareId", scoreRoomName);
    shareLinkElement.textContent = currentUrl.toString();
  } else {
    shareLinkElement.textContent = "Score Room ID not yet generated."; // Display a message if no ID
  }
}

function createNewScoreRoom () {
  communicate2Backend("create").then((data) => {
    const roomId = data.roomId;
    if (roomId) {
      currentScoreRoom = roomId;
      addNewScoreRoom(roomId);
      loadCurrentScoreRoom();
      loadScoreRoomSettings(roomId);
    } else {
      // Handle the error if the score room wasn't found or there was another error
    }
  });
}

// Event listener for the "Score Room Settings" button
scoreRoomSettingsButton.addEventListener("click", openScoreRoomSettingsModal); // Call openScoreRoomSettingsModal to open the existing modal

createScoreRoomButton.addEventListener("click", createNewScoreRoom); 
//
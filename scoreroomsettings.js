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
  scoreRoomDateInput.value = settings.date || "";
  scoreRoomLobbyInput.value = settings.lobby || "";
  scoreRoomServerInput.value = settings.server || "";
  scoreRoomNicknameInput.value = settings.nickname || "";
  scorescrimNameInput.value = settings.scrimName || "";
  updateShareLink(scoreRoomName);
}

// Function to save settings for a specific score room
function saveScoreRoomSettings() {
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
  for (let i = 0; i < scoreRoomIdsArr.length; i++) {
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

  if (scoreRoomName) {
    let rawScoreRoomIds = localStorage.getItem("scoreRoomIds");

    if (rawScoreRoomIds) {
      scoreRoomIds = JSON.parse(rawScoreRoomIds);

      scoreRoomName = scoreRoomIds[Object.keys(scoreRoomIds)[0]];
      if (currentScoreRoom) {
        currentScoreRoom = scoreRoomIds[Object.keys(scoreRoomIds)[0]];
      } else {
        console.log(`there is no current score room`)
      }
    }
  }

  console.log(`${scoreRoomName} : ${scoreRoomIds[scoreRoomName]}`);

  if (scoreRoomIds[scoreRoomName]) {
    // Check if score room ID exists
    currentUrl.searchParams.set("shareId", scoreRoomName);
    shareLinkElement.textContent = currentUrl.toString();
  } else {
    shareLinkElement.textContent = "Score Room ID not yet generated."; // Display a message if no ID
  }
}

function createNewScoreRoom() {
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

// Event listener for the score room select dropdown
scoreRoomSelect.addEventListener('change', () => {
  const newScoreRoom = scoreRoomSelect.value;
  if (newScoreRoom !== "") { // Only change if a valid score room is selected
    currentScoreRoom = newScoreRoom;
    loadCurrentScoreRoom();
  }
});

createScoreRoomButton.addEventListener("click", createNewScoreRoom);

function deleteNewScoreRoom() {
  const confirmed = confirm(
    `Are you sure you want to delete score room "${currentScoreRoom}"? This action cannot be undone.`
  );
  if (confirmed) {
    delete scoreRoomIds[currentScoreRoom];
    localStorage.setItem("scoreRoomIds", JSON.stringify(scoreRoomIds));

    // Additional actions you need to take after deleting:

    // - Update the score room select and load the default room
    if (Object.keys(scoreRoomIds).length < 1) {
      createNewScoreRoom();
    }

    scoreRoomSelect.selectedIndex = 1; // Set the index to 1

    // You might also want to:
    // - Send a request to your backend to delete the score room from the database
  }
}

deleteScoreRoomButton.addEventListener("click", deleteNewScoreRoom);
//
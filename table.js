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


const placementPoints = {
  1: 10,
  2: 6,
  3: 5,
  4: 4,
  5: 3,
  6: 2,
  7: 1,
  8: 1,
};

let scoreRoomIds = {};

let firstTimeLoaded = true;

let changesMade = false;
const saveIndicator = document.getElementById("saveIndicator");

// Function to control the changesMade variable
function setChangesMade(hasChanges) {
  changesMade = hasChanges;
  printResultsButton.disabled = false;
  saveIndicator.style.display = changesMade ? "block" : "none";
}

function isOnline() {
  return navigator.onLine;
}

const onlineIndicator = document.getElementById("onlineIndicator");

function updateOnlineStatus() {
  const online = isOnline();
  onlineIndicator.style.display = "block"; // Show the indicator
  if (online) {
    onlineIndicator.classList.remove("offline");
    onlineIndicator.title = "Online"; // Tooltip
  } else {
    onlineIndicator.classList.add("offline");
    onlineIndicator.title = "Offline";
  }
}

// Initial check on page load
updateOnlineStatus();

let lastSaveTime = 0; // Variable to track the last save time

let currentScoreRoom = "";

async function validateAndCleanScoreRoomIds() {
  let rawScoreRoomIds = localStorage.getItem("scoreRoomIds");
  if (rawScoreRoomIds) {
    const storedScoreRoomIds = JSON.parse(rawScoreRoomIds);
    const validScoreRoomIds = {}; // Store valid IDs here

    for (const scoreRoomName in storedScoreRoomIds) {
      const roomId = storedScoreRoomIds[scoreRoomName];
      const response = await communicate2Backend("GET", scoreRoomName); // Check if exists on the backend

      if (response && response.success) {
        validScoreRoomIds[scoreRoomName] = null; // Keep if valid
      } else {
        console.warn(`Invalid score room ID removed: ${scoreRoomName} (${roomId})`);
      }
    }

    if (Object.keys(validScoreRoomIds).length === 0) {
      // If no valid rooms found, create a new default room
      createNewScoreRoom();
    } else {
      // Update scoreRoomIds in local storage
      localStorage.setItem("scoreRoomIds", JSON.stringify(validScoreRoomIds));

      scoreRoomIds = validScoreRoomIds;

      // Set currentScoreRoom to the first valid room
      currentScoreRoom = Object.keys(validScoreRoomIds)[0];
    }
  } else {
    createNewScoreRoom();
  }
}

//console.log(currentScoreRoom);

let scoreRoomData = {};

function addNewScoreRoom(shareId) {
  if (scoreRoomIds[shareId]) { return }
  communicate2Backend("get", shareId).then((data) => {
    const result = data.scoreRoomData;
    if (result) {
      scoreRoomIds[shareId] = result.scoreRoomSettings.nickname || null;
      localStorage.setItem("scoreRoomIds", JSON.stringify(scoreRoomIds));
      populateScoreRoomSelect();
    } else {
      // Handle the error if the score room wasn't found or there was another error
    }
  });
}

const loadScoreRoomButton = document.getElementById("loadScoreRoomButton");
const loadScoreRoomInput = document.getElementById("loadScoreRoomInput");

loadScoreRoomButton.addEventListener("click", async () => {
  const enteredRoomId = loadScoreRoomInput.value.trim();
  loadScoreRoomInput.classList.remove("invalid-input"); // Remove invalid class before checking
  if (enteredRoomId) {


    communicate2Backend("get", enteredRoomId).then((data) => {
      const result = data.scoreRoomData;
      if (result) {
        scoreRoomIds[enteredRoomId] =
          scoreRoomData.scoreRoomSettings.nickname || null;
        localStorage.setItem("scoreRoomIds", JSON.stringify(scoreRoomIds));
        populateScoreRoomSelect();
      } else {
        // Visual error handling: add a class to the input
        loadScoreRoomInput.classList.add("invalid-input");
        loadScoreRoomInput.value = ""; // Clear the input field
        loadScoreRoomInput.placeholder = "Not a valid room ID";
      }
    });

  }
});

async function loadCurrentScoreRoom() {
  //console.log(currentScoreRoom);
  communicate2Backend("get", currentScoreRoom).then((data) => {
    const result = data.scoreRoomData;
    //console.log(data)
    if (result) {
      scoreRoomData = data.scoreRoomData;
      if (firstTimeLoaded) {
        openScoreRoomSettingsModal();
        firstTimeLoaded = false;
      }
      populateTeamList();
      const totalSavedMatches = Object.keys(scoreRoomData.gameData).length;
      const tables = tablesContainer.querySelectorAll(".gameScores");
      const tablesNeeded = (totalSavedMatches < 1) ? 1 : totalSavedMatches;
      for (let i = tables.length; i < tablesNeeded; i++) {
        addTable();
      }
    } else {
      // Handle the error if the score room wasn't found or there was another error
    }
  });
}

// Function to get a score room
async function communicate2Backend(method = "get", roomId = "1234567890", scoreRoomData = null) {
  //console.log(roomId);
  try {
    // Google Apps Script web app URL
    const apiUrl = "https://script.google.com/macros/s/AKfycbwzKSkiCanvw_F2yOTZhumh06q4k5Y7CKoTZ_Cjg1n2pyHtyQJUldO5fFx-rHZFHIzo0w/exec";

    const requestBody = {
      method: method.toUpperCase(), // Convert method to uppercase for consistency
    };

    // Add roomId and scoreRoomData only if they're needed for the request
    if (roomId) {
      requestBody.roomId = roomId.toString();
    }
    if (scoreRoomData) {
      requestBody.scoreRoomData = scoreRoomData;
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(requestBody),
    });



    if (!response.ok) {
      const errorText = await response.text(); // Get the full response text
      throw new Error(`Failed to fetch score room: ${response.status} ${response.statusText} - ${errorText}`);
    }

    //console.log("Response:", await response.json());

    try {
      const data = await response.json();
      if (data.success) {
        return data;
      } else {
        throw new Error(`Server error: ${data.error}`);
      }
    } catch (parseError) {
      // Handle the case where the response is not JSON
      console.error("Error parsing response as JSON:", parseError);
      throw new Error(`Invalid response from server: ${await response.text()}`); // Get the raw text for debugging
    }
  } catch (error) {
    console.error("Error communicating with backend:", error);
    return null;
  }
}

function saveCurrentScoreRoomData() {
  const currentTime = Date.now();
  if (!isOnline() || !changesMade ||
    !currentScoreRoom ||
    currentScoreRoom.trim() == "" ||
    currentTime - lastSaveTime < 3000 // 15 seconds in milliseconds
  ) { return }
  getGameData();
  updateTeamDataFromTable();
  saveScoreRoomSettings();
  //console.log(currentScoreRoom);
  communicate2Backend(
    "update",
    currentScoreRoom,
    scoreRoomData
  ).then(() => setChangesMade(false));

}

function handleError(message) {
  return console.error(message);
}

const teamListModal = document.getElementById("teamListModal");
const manageTeamsButton = document.getElementById("manageTeamsButton");
const teamListTable = document.getElementById("teamListTable");

function updateTeamDataFromTable() {
  let teamData = {};
  // Iterate through rows, starting from 1 to skip the header row
  for (let i = 1; i < teamListTable.rows.length; i++) {
    const row = teamListTable.rows[i];

    // Get input values from the row
    const teamName = row.cells[1].querySelector("input").value;
    const teamTag = row.cells[2].querySelector("input").value;
    const notes = row.cells[3].querySelector("textarea").value;

    // Update teamData object
    const slot = i + 2; // Slot number is 2 more than the row index (due to the header row)
    teamData[slot] = {
      slot: slot,
      name: teamName,
      tag: teamTag,
      notes: notes,
    };
  }

  // 1. Get all team dropdowns in all tables
  let allTeamDropdowns = [];

  // Get all team dropdowns in all tables
  allTeamDropdowns = tablesContainer.querySelectorAll("#teamSelect");

  // 2. Create a set of unique team names
  const uniqueTeamNames = new Set(
    Object.values(teamData)
      .map((team) => team.name)
      .filter((name) => name)
  );

  // 3. Iterate through all team dropdowns
  allTeamDropdowns.forEach((dropdown) => {
    const currentSelectedTeam = dropdown.value;
    // Check if the selected team is invalid (empty string or not in the list of unique teams)
    if (!currentSelectedTeam || !uniqueTeamNames.has(currentSelectedTeam)) {
      dropdown.value = ""; // Set to blank if invalid
      dropdown.innerHTML = ""; // Clear existing options

      // Add unique team options
      dropdown.appendChild(new Option("Select a team", ""));
      uniqueTeamNames.forEach((teamName) => {
        const team = Object.values(teamData).find((t) => t.name === teamName);
        const option = document.createElement("option");
        option.value = teamName;
        option.text = `${teamName} - ${team.tag}`;
        dropdown.add(option);
      });
    }
  });

  //console.log(teamData);
  scoreRoomData.teamData = teamData;
}

// Function to update teamData object
function updateTeamData(rowNumber, field, value) {
  scoreRoomData.teamData[rowNumber] = scoreRoomData.teamData[rowNumber] || {}; // Ensure the slot exists in teamData
  scoreRoomData.teamData[rowNumber][field] = value;
}

function openModal() {
  populateTeamList();
  teamListModal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  updateTeamDataFromTable();
  setChangesMade(true);
  teamListModal.style.display = "none";
}

manageTeamsButton.addEventListener("click", openModal);

// Function to populate the team list table
function populateTeamList() {
  teamListTable.innerHTML = ""; // Clear existing rows

  // Function to add a row to the table
  function addRow(rowNumber, teamName = "", teamTag = "", notes = "") {
    let row;
    if (rowNumber < teamListTable.rows.length) {
      row = teamListTable.rows[rowNumber]; // Get existing row
    } else {
      row = teamListTable.insertRow(); // Create a new row if needed
    }

    const slotCell = row.cells[0] || row.insertCell();
    const infoCell = row.cells[1] || row.insertCell();
    const tagCell = row.cells[2] || row.insertCell();
    const notesCell = row.cells[4] || row.insertCell();

    slotCell.textContent = rowNumber;

    // Team Info Input
    const infoInput = document.createElement("input");
    infoInput.type = "text";
    infoInput.placeholder = "Team Name";
    infoInput.value = teamName || "";
    infoInput.addEventListener("input", () => {
      updateTeamData(rowNumber, "name", infoInput.value); // Correct field name here
    });
    infoCell.appendChild(infoInput);

    // Team Tag Input
    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.placeholder = "Team Tag";
    tagInput.value = teamTag || "";
    tagInput.addEventListener("input", () => {
      updateTeamData(rowNumber, "tag", tagInput.value);
    });
    tagCell.appendChild(tagInput);

    // Notes Textarea
    const notesTextarea = document.createElement("textarea");
    notesTextarea.placeholder = "Notes";
    notesTextarea.value = notes || "";
    notesTextarea.addEventListener("input", () => {
      updateTeamData(rowNumber, "notes", notesTextarea.value);
    });
    notesCell.appendChild(notesTextarea);
  }

  // Create header row
  const headerRow = teamListTable.insertRow();
  ["Slot", "Team Name", "Team Tag", "Notes"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  // Iterate through teamData and add rows
  for (let i = 3; i <= 25; i++) {
    const team = scoreRoomData.teamData[i];

    // Check if data exists for the current slot
    if (team) {
      addRow(i, team.name, team.tag, team.altTag, team.notes);
    } else {
      // If no data exists, add an empty row
      addRow(i);
    }
  }

  teamListTable.addEventListener("input", updateTeamDataFromTable());
  updateTeamDataFromTable();
}

// Paste handler (same as your code)
teamListTable.addEventListener("paste", (event) => {
  event.preventDefault();

  const activeElement = document.activeElement; // Get the focused element
  if (!activeElement || !activeElement.tagName === "INPUT") return; // Only handle input fields

  const columnIndex = activeElement.parentElement.cellIndex; // Get the column index

  const text = (event.originalEvent || event).clipboardData.getData(
    "text/plain"
  );
  // Use a more robust way to split rows
  const values = text
    .replace(/\r\n/g, "\n") // Normalize line endings (Windows/macOS/Linux)
    .split("\n")
    .filter((value) => value.trim() !== ""); // Remove empty lines

  values.forEach((value, index) => {
    const rowNumber = index + 1; // Start from row 1 (header is row 0)

    if (rowNumber < teamListTable.rows.length) {
      const row = teamListTable.rows[rowNumber];
      const cell = row.cells[columnIndex] || row.insertCell();

      // Update the content based on the column type
      if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
        cell.innerHTML = `<input type="text" value="${value}"/>`;
      } else if (columnIndex === 4) {
        cell.innerHTML = `<textarea>${value}</textarea>`;
      }
    } else {
      // If there are more values than existing rows, add new rows
      addRow(
        rowNumber,
        columnIndex === 1 ? value : "",
        columnIndex === 2 ? value : "",
        columnIndex === 3 ? value : ""
      );
    }
  });
});

const addTableButton = document.getElementById("addTableButton");
const tablesContainer = document.getElementById("tablesContainer");
let numTables = 0;
let currentGame = 1;

addTableButton.addEventListener("click", () => {
  addTable();
});

function addTable() {
  const newTableContainer = document.createElement("div");
  newTableContainer.classList.add("tableContainer");

  const newTable = createTable();
  newTable.classList.add("gameScores");
  newTableContainer.appendChild(newTable);
  tablesContainer.appendChild(newTableContainer);
  updateTeamDataFromTable();
}

function createTable() {
  const newTable = document.createElement("table");
  newTable.dataset.gameNumber = currentGame;
  const numRows = 23;

  let matchData;
  if (scoreRoomData.gameData[currentGame]) {
    matchData = scoreRoomData.gameData[currentGame].placements;
    //console.log(scoreRoomData.gameData[currentGame]);
  }

  let teamOptions = [];

  if (scoreRoomData.teamData) {
    teamOptions = Array.from(
      // 2. Create a set of unique team names
      new Set(
        Object.values(scoreRoomData.teamData)
          .map((team) => team.name)
          .filter((name) => name)
      )
    );
  }

  // Create header row within <thead>
  const thead = newTable.createTHead();
  const headerRow = thead.insertRow();

  const headerCell = headerRow.insertCell();
  headerCell.colSpan = 4;

  const h2Element = document.createElement("h2");
  h2Element.textContent = `Game ${currentGame} Scores`;
  headerCell.appendChild(h2Element);

  // Create table body (<tbody>)
  const tbody = newTable.createTBody(); // Create tbody element

  // Create headers for data rows within <tbody>
  const dataHeaderRow = tbody.insertRow(); // Insert row into tbody
  ["Placement", "Team", "Kills", "No Score"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    dataHeaderRow.appendChild(th);
  });

  // Create data rows with input elements
  for (let i = 0; i < numRows; i++) {
    const row = newTable.insertRow();
    let teamText,
      teamValue,
      kills = 0,
      noScore = false;

    if (matchData && matchData[i + 1]) {
      teamText = `${matchData[i + 1].teamName} - ${matchData[i + 1].teamTag}`;
      teamValue = matchData[i + 1].teamName;
      kills = matchData[i + 1].teamEliminations;
      noScore = matchData[i + 1].noScore;
    }

    // Placement (not user input)
    const placementCell = row.insertCell();
    placementCell.textContent = i + 1;

    // Team (dropdown)
    const teamCell = row.insertCell();
    const teamSelect = document.createElement("select");
    teamSelect.id = "teamSelect";
    // Add a blank option at the beginning
    const blankOption = document.createElement("option");
    blankOption.value = "";
    blankOption.text = "Select a team";
    teamSelect.add(blankOption, 0); // Add to the 0th index
    if (scoreRoomData.teamData) {
      for (key in scoreRoomData.teamData) {
        team = scoreRoomData.teamData[key];
        const option = document.createElement("option");
        option.value = team.name;
        option.text = `${team.name} - ${team.tag}`;
        teamSelect.add(option);
      }
    } else {
      teamOptions.forEach((team) => {
        const option = document.createElement("option");
        option.value = team;
        option.text = team;
        teamSelect.add(option);
      });
    }

    teamSelect.value = teamValue; // Select teamName if it exists, otherwise blank

    // Inside the loop for creating rows:
    teamSelect.addEventListener("change", function () {
      const currentTable = this.closest("table"); // Get the table this dropdown belongs to
      const gameNumber = parseInt(currentTable.dataset.gameNumber, 10); // Get the game number from the table's data attribute

      if (areTeamsDuplicatedInTable(currentTable)) {
        //alert(`Duplicate team found in Game ${gameNumber}!`);
        // Optionally, you can add logic to reset the dropdown or handle the duplicate in other ways
      }
    });

    // Inside the loop for creating rows:
    teamSelect.addEventListener("focus", function () {
      this.oldSelectedIndex = this.selectedIndex; // Store initial selection
    });

    teamSelect.addEventListener("keyup", function (event) {
      const key = event.key.toLowerCase();
      const options = this.options;
      //console.log(key);

      // Check for special keys (e.g., arrow keys, Enter, Escape)
      if (["arrowup", "arrowdown", "enter", "escape"].includes(key)) {
        return; // Allow default behavior for these keys
      }

      for (let i = 0; i < options.length; i++) {
        const [teamName, teamTag] = options[i].text
          .split(" - ")
          .map((str) => str.toLowerCase());
        if (teamName.startsWith(key) || teamTag.startsWith(key)) {
          this.selectedIndex = i;
          break;
        }
      }

      // If no match, reset to the original selection
      if (this.selectedIndex === -1) {
        this.selectedIndex = this.oldSelectedIndex;
      }
    });

    teamCell.appendChild(teamSelect);

    // Kills (text input with validation)
    const killsCell = row.insertCell();
    const killsInput = document.createElement("input");
    killsInput.type = "text"; // Change to text input
    killsInput.min = 0;
    killsInput.max = 999;
    killsInput.value = kills || "";
    killsInput.style.width = "50px";
    killsInput.style.textAlign = "center";

    killsInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9+]/g, ""); // Remove non-digit and non-'+' characters
    });

    // Add input validation event listener
    killsInput.addEventListener("focusout", function () {
      // Calculate and update the value if it contains '+'
      if (this.value.includes("+")) {
        this.value = this.value
          .split("+")
          .map((num) => parseInt(num, 10) || 0) // Parse each number (or 0 if invalid)
          .reduce((acc, num) => acc + num, 0); // Sum the numbers
        //.toString(); // Convert back to string
      }
      if (this.value < 0) this.value = 0; // Set to 0 if negative
      if (this.value > 999) this.value = 999; // Set to 999 if too high
    });

    killsCell.appendChild(killsInput);

    // No Score (checkbox)
    const noScoreCell = row.insertCell();
    const noScoreCheckbox = document.createElement("input");
    noScoreCheckbox.type = "checkbox";
    noScoreCell.appendChild(noScoreCheckbox);

    noScoreCheckbox.checked = noScore;

    // Event Listener for input, select, and checkbox changes
    row.addEventListener("change", () => {
      setChangesMade(true);
    });
  }

  // Create a new row for the map dropdown
  const mapRow = newTable.insertRow();
  const mapCell = mapRow.insertCell();
  mapCell.colSpan = 4;

  // Create a select element for the map options
  const mapSelect = document.createElement("select");
  mapSelect.id = "maps";
  const mapOptions = ["Erangel", "Miramar", "Sanhok", "Vikendi"];
  mapSelect.appendChild(new Option("Select a map", "")); // Add a blank option
  mapOptions.forEach((map) => {
    const option = document.createElement("option");
    option.value = map;
    option.text = map;
    mapSelect.add(option);
  });

  mapSelect.addEventListener("change", () => {
    setChangesMade(true);
  });

  if (scoreRoomData.gameData[currentGame]) {
    mapSelect.value = scoreRoomData.gameData[currentGame].map;
    //console.log(matchData);
  }

  mapCell.appendChild(mapSelect);

  areTeamsDuplicatedInTable(newTable);

  currentGame++;
  return newTable;
}

function getGameData() {
  const gameData = {
  };
  const tables = tablesContainer.querySelectorAll(".gameScores");

  tables.forEach((table, gameIndex) => {
    const gameNumber = gameIndex + 1;
    const matchData = {
      placements: {},
      map: "",
      noScoreTeams: [],
      mapWinner: "",
      noShows: [],
      mapTopFragger: { name: "", frags: 0 },
    };

    let teamOptions = Array.from(
      // 2. Create a set of unique team names
      new Set(
        Object.values(scoreRoomData.teamData)
          .map((team) => team.name)
          .filter((name) => name)
      )
    );

    let currentPlacement = 1;

    const rows = table.querySelectorAll("tbody tr");

    // Get the map select element
    const mapSelect = table.querySelector("select#maps"); // Use the #maps ID
    const selectedMap = mapSelect ? mapSelect.value : ""; // Get selected map, if available

    // Set the map in matchData
    matchData.map = selectedMap;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      const teamSelect = row.querySelector("select");
      const noScoreCheckbox = row.querySelector("input[type='checkbox']");
      const killsInput = row.querySelector("input[type='text']");
      const teamName = teamSelect.value;
      const teamTag =
        teamSelect.options[teamSelect.selectedIndex]?.text.split(" - ")[1] ||
        "";

      if (teamName.trim() !== "" && noScoreCheckbox) {
        const noScore = noScoreCheckbox.checked;
        const teamEliminations = parseInt(killsInput.value, 10)
          ? parseInt(killsInput.value, 10)
          : 0; // Conditional null and base 10 parsing
        const indexToRemove = teamOptions.indexOf(teamName);

        if (indexToRemove !== -1) {
          teamOptions.splice(indexToRemove, 1);
        }

        if (noScore) {
          matchData.noScoreTeams.push(teamName);
        }

        if (currentPlacement == 1) {
          matchData.mapWinner = teamName;
        }

        if (teamEliminations > matchData.mapTopFragger.frags) {
          matchData.mapTopFragger = {
            name: teamName,
            frags: teamEliminations,
          };
        }

        matchData.placements[currentPlacement] = {
          teamName,
          teamTag,
          teamEliminations,
          noScore,
        };

        currentPlacement++;
      }
    }

    matchData.noShows = teamOptions;

    if (matchData.map !== "" || matchData.placements["1"]) {
      gameData[gameNumber] = matchData;
    }
  });

  //console.log(`new game data: `, gameData);

  scoreRoomData.gameData = gameData;
  return gameData;
}

function areTeamsDuplicatedInTable(gameScoresTable) {
  const selectedTeams = new Map(); // Use a Map to track counts and elements
  const teamSelects = gameScoresTable.querySelectorAll("select#teamSelect");
  let hasDuplicates = false;

  for (const select of teamSelects) {
    const teamName = select.value;
    //console.log(teamName);

    // Skip blank team names
    if (teamName === "" || teamName === "Select a team") {
      continue;
    }

    if (selectedTeams.has(teamName)) {
      selectedTeams.get(teamName).push(select); // Add the duplicate select element to the array
      hasDuplicates = true; // Mark that duplicates exist
    } else {
      selectedTeams.set(teamName, [select]); // Start a new array for this team with the select element
      if (select.classList.contains("invalidSelection")) {
        select.classList.remove("invalidSelection");
      }
    }
  }

  // If duplicates were found, mark all selections of that team as invalid
  if (hasDuplicates) {
    for (const [teamName, selects] of selectedTeams) {
      if (selects.length > 1) {
        selects.forEach((select) => select.classList.add("invalidSelection"));
      }
    }
  }

  return hasDuplicates;
}

// Function to close the results modal
const resultsModal = document.getElementById("resultsModal");
const resultsTableContainer = document.getElementById("resultsTableContainer");
const previewResultsButton = document.getElementById("previewResults");
function createStatsTable() {
  function calculateTeamStats() {
    const teamStats = {};

    // Get the game data
    let gameData = scoreRoomData.gameData;

    // Iterate over the game data
    for (const gameNumber in gameData) {
      if (gameData.hasOwnProperty(gameNumber)) {
        const matchData = gameData[gameNumber];

        for (const placement in matchData.placements) {
          if (matchData.placements.hasOwnProperty(placement)) {
            const teamInfo = matchData.placements[placement];
            const teamName = teamInfo.teamName;

            // Initialize team stats if not present
            if (!teamStats[teamName]) {
              teamStats[teamName] = {
                teamEliminations: 0,
                placementPoints: 0,
                totalWins: 0,
                totalGamesPlayed: 0,
                noScoredMatches: [],
                totalPoints: 0,
              };
            }

            // Update stats if the team didn't get "No Score"
            if (!teamInfo.noScore) {
              teamStats[teamName].teamEliminations += teamInfo.teamEliminations;
              teamStats[teamName].placementPoints +=
                placementPoints[placement] || 0;
              teamStats[teamName].totalPoints +=
                placementPoints[placement] || 0;
              teamStats[teamName].totalPoints += teamInfo.teamEliminations;
              if (placement == 1) {
                teamStats[teamName].totalWins++;
              }
            } else {
              teamStats[teamName].noScoredMatches.push(gameNumber);
            }

            teamStats[teamName].totalGamesPlayed++;
          }
        }
      }
    }

    return teamStats;
  }
  const teamStats = calculateTeamStats();
  //console.log(teamStats);
  const statsTable = document.createElement("table");
  statsTable.id = "teamStatsTable";
  statsTable.classList.add("gameScores"); // Add styling class
  statsTable.style.width = "100%";

  // Create header row
  const headerRow = statsTable.insertRow();
  const headers = ["Rank", "Team Name", "WWCD", "PP", "EP", "Total"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  // Sort teams by total points (descending)
  const sortedTeams = Object.entries(teamStats).sort((a, b) => {
    const teamA = a[1];
    const teamB = b[1];

    // 1. Sort by total points (descending)
    if (teamA.totalPoints !== teamB.totalPoints) {
      return teamB.totalPoints - teamA.totalPoints;
    }

    // 2. If total points are tied, sort by WWCD (descending)
    if (teamA.totalWins !== teamB.totalWins) {
      return teamB.totalWins - teamA.totalWins;
    }

    // 3. If total points and WWCD are tied, sort by placement points (descending)
    if (teamA.placementPoints !== teamB.placementPoints) {
      return teamB.placementPoints - teamA.placementPoints;
    }

    // 4. If all previous criteria are tied, sort by total eliminations (descending)
    return teamB.teamEliminations - teamA.teamEliminations;
  });

  // Create data rows
  sortedTeams.forEach(([teamName, stats], index) => {
    const row = statsTable.insertRow();
    const rankCell = row.insertCell();
    const nameCell = row.insertCell();
    const winsCell = row.insertCell();
    const ppCell = row.insertCell();
    const epCell = row.insertCell();
    const totalCell = row.insertCell();

    rankCell.textContent = index + 1; // Calculate and display rank (1-based)
    nameCell.textContent = teamName;
    winsCell.textContent = stats.totalWins;
    ppCell.textContent = stats.placementPoints;
    epCell.textContent = stats.teamEliminations;
    totalCell.textContent = stats.totalPoints;
  });

  return statsTable;
}

// Function to create the "Match Winners" table
function createMatchWinnersTable() {
  // Get the game data
  let gameData = scoreRoomData.gameData;
  const winnersTable = document.createElement("table");
  winnersTable.classList.add("gameScores"); // Add styling class

  // Data header row
  const dataHeaderRow = winnersTable.insertRow();
  ["Map", "Team Name", "Eliminations"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    dataHeaderRow.appendChild(th);
  });

  // Data rows
  for (const gameNumber in gameData) {
    const matchData = gameData[gameNumber];

    const row = winnersTable.insertRow();
    const mapCell = row.insertCell();
    const teamNameCell = row.insertCell();
    const eliminationsCell = row.insertCell();


    if (matchData.placements && matchData.placements[1]) {
      const winner = matchData.placements[1];
      teamNameCell.textContent = winner.teamName;
      eliminationsCell.textContent = winner.teamEliminations;
    } else {
      teamNameCell.textContent = "No Winner";
      eliminationsCell.textContent = "-";
    }

    mapCell.textContent = matchData.map || "❌";
  }

  return winnersTable;
}

// Function to create the "Top Fragger" table
function createTopFraggerTable() {
  // Get the game data
  let gameData = scoreRoomData.gameData;
  const fraggersTable = document.createElement("table");
  fraggersTable.classList.add("gameScores"); // Add styling class

  // Header row

  // Data header row
  const dataHeaderRow = fraggersTable.insertRow();
  ["Team Name", "Kills"].forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    dataHeaderRow.appendChild(th);
  });

  // Data rows (populate with top fragger data from each match)
  for (const gameNumber in gameData) {
    const matchData = gameData[gameNumber];

    // Find the top fragger
    let topFragger = null;
    let maxKills = -1;
    for (const placement in matchData.placements) {
      const playerData = matchData.placements[placement];
      if (playerData.teamEliminations > maxKills && !playerData.noScore) {
        topFragger = playerData;
        maxKills = playerData.teamEliminations;
      }
    }

    const row = fraggersTable.insertRow();
    const teamNameCell = row.insertCell();
    const eliminationsCell = row.insertCell();

    if (topFragger) {
      teamNameCell.textContent = topFragger.teamName;
      eliminationsCell.textContent = topFragger.teamEliminations;
    } else {
      teamNameCell.textContent = "No Data"; // Or handle differently
      eliminationsCell.textContent = "-";
    }
  }

  return fraggersTable;
}

// Function to open the results modal
function openResultsModal() {
  const mainResultsTableContainer = document.getElementById(
    "mainResultsTableContainer"
  );
  const extraResultsTableContainer = document.getElementById(
    "extraResultsTableContainer"
  );

  // Clear containers
  mainResultsTableContainer.innerHTML = "";
  extraResultsTableContainer.innerHTML = "";

  // Create and append tables with headings
  const statsTable = createStatsTable();
  const statsTableHeading = document.createElement("h2");
  statsTableHeading.textContent = "Team Standings";
  statsTableHeading.style.marginBottom = "40px";
  mainResultsTableContainer.appendChild(statsTableHeading);
  mainResultsTableContainer.appendChild(statsTable);

  const winnersTable = createMatchWinnersTable();
  const winnersTableHeading = document.createElement("h2");
  winnersTableHeading.textContent = "Map Winners";
  extraResultsTableContainer.appendChild(winnersTableHeading);
  extraResultsTableContainer.appendChild(winnersTable);

  const fraggersTable = createTopFraggerTable();
  const fraggersTableHeading = document.createElement("h2");
  fraggersTableHeading.textContent = "Top Fragger";
  extraResultsTableContainer.appendChild(fraggersTableHeading);
  extraResultsTableContainer.appendChild(fraggersTable);

  resultsModal.style.display = "block";
}
function closeResultsModal() {
  resultsModal.style.display = "none";
}
previewResultsButton.addEventListener("click", () => {
  openResultsModal();
  // Enable the Print Results button
  printResultsButton.disabled = false;
});

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
  if (scoreRoomSelect.value !== '') {
    currentScoreRoom = scoreRoomSelect.value;
  }
  loadCurrentScoreRoom();
  saveScoreRoomSettings();


  scoreRoomSettingsModal.style.display = "none";
  setChangesMade(true);
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
  //console.log(scoreRoomData.scoreRoomSettings)
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

  if (currentScoreRoom) {
    scoreRoomIds[currentScoreRoom] = scoreRoomNicknameInput.value || null;
    localStorage.setItem("scoreRoomIds", JSON.stringify(scoreRoomIds));
  }
  //console.log(scoreRoomData.scoreRoomSettings);
  //saveScoreRooms(); // Save all score rooms to local storage

  // Update the score room selector
  //populateScoreRoomSelect();
}

// Function to populate the score room selector
function populateScoreRoomSelect() {
  scoreRoomSelect.innerHTML = ""; // Clear existing options
  //console.log(scoreRoomIds);
  const scoreRoomIdsArr = Object.keys(scoreRoomIds);
  let selections = {};
  for (let i = 0; i < scoreRoomIdsArr.length; i++) {
    const id = scoreRoomIdsArr[i];
    const scoreRoomName = scoreRoomIds[id] || `Score Room ${i}`;
    const option = document.createElement("option");
    option.value = id;
    option.text = scoreRoomName;
    scoreRoomSelect.add(option);
    selections[id] = scoreRoomName;
  }
  // Set the selected index to 0 (the first option)
  scoreRoomSelect.selectedIndex = 0;

  // Event listener for the score room select dropdown
  scoreRoomSelect.addEventListener('change', () => {
    const newScoreRoom = scoreRoomSelect.value;
    if (newScoreRoom !== "") { // Only change if a valid score room is selected
      currentScoreRoom = newScoreRoom;
      loadScoreRoomSettings(currentScoreRoom);
      loadCurrentScoreRoom();
    }
  });
  // Load settings for the currently selected score room after updating the dropdown
  loadScoreRoomSettings(currentScoreRoom);
}

const shareLinkElement = document.getElementById("shareScoreRoomLink");

function updateShareLink(scoreRoomName) {

  const currentUrl = new URL(window.location.href);//

  if (scoreRoomName) {
    let rawScoreRoomIds = localStorage.getItem("scoreRoomIds");

    if (rawScoreRoomIds && !scoreRoomIds) {
      scoreRoomIds = JSON.parse(rawScoreRoomIds);

      scoreRoomName = scoreRoomIds[Object.keys(scoreRoomIds)[0]];
    }
  }

  //console.log(`${currentScoreRoom} : ${scoreRoomIds[currentScoreRoom]}`);

  if (currentScoreRoom) {
    // Check if score room ID exists
    currentUrl.searchParams.set("shareId", currentScoreRoom);
    shareLinkElement.textContent = currentScoreRoom.toString();
  } else {
    shareLinkElement.textContent = "Score Room ID not yet generated."; // Display a message if no ID
  }
}

// Add click event listener to copy link
shareLinkElement.addEventListener('click', async () => {
  const linkToCopy = shareScoreRoomLink.textContent;
  try {
    await navigator.clipboard.writeText(linkToCopy);
    alert('Score room link copied to clipboard!'); // Optional feedback to the user
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
});

function createNewScoreRoom() {
  communicate2Backend("create").then((data) => {
    const roomId = data.roomId;
    if (roomId) {
      currentScoreRoom = roomId;
      addNewScoreRoom(roomId);
      loadCurrentScoreRoom();
      scoreRoomSelect.selectedIndex = 1; // Set the index to 1
    } else {
      // Handle the error if the score room wasn't found or there was another error
    }
  });
}

// Event listener for the "Score Room Settings" button
scoreRoomSettingsButton.addEventListener("click", openScoreRoomSettingsModal); // Call openScoreRoomSettingsModal to open the existing modal



createScoreRoomButton.addEventListener("click", createNewScoreRoom);

function deleteNewScoreRoom() {
  const confirmed = confirm(
    `Are you sure you want to delete score room "${currentScoreRoom}"? This action cannot be undone.`
  );
  if (confirmed) {
    delete scoreRoomIds[currentScoreRoom];
    localStorage.setItem("scoreRoomIds", JSON.stringify(scoreRoomIds));

    // Additional actions you need to take after deleting:
    console.log(Object.keys(scoreRoomIds).length)
    // - Update the score room select and load the default room
    if (Object.keys(scoreRoomIds).length < 1) {
      createNewScoreRoom();
      scoreRoomSelect.selectedIndex = 1; // Set the index to 1
    }

    populateScoreRoomSelect();

    // You might also want to:
    // - Send a request to your backend to delete the score room from the database
  }
}

deleteScoreRoomButton.addEventListener("click", deleteNewScoreRoom);
//

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

// Function to save the current score room data
function heartbeatsave() {
  updateOnlineStatus();
  if (currentScoreRoom.trim() !== "") {
    //updateGameData(); // Update the game data for the current score room
    saveCurrentScoreRoomData();
  }
}


// Function to create the loading screen
function createLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  const loadingAnimation = document.getElementById("loadingAnimation");

  // Create circles for the animation
  for (let i = 0; i < 5; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    const angle = (i * 72) * (Math.PI / 180); // Calculate angle for positioning
    const x = 30 + 25 * Math.cos(angle);    // Calculate x coordinate
    const y = 30 + 25 * Math.sin(angle);    // Calculate y coordinate
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    loadingAnimation.appendChild(circle);
  }

  loadingScreen.style.display = "flex"; // Show the loading screen
}

const printResultsButton = document.getElementById("printResultsButton");

// Function to enable/disable print button
function updatePrintButtonState() {
  printResultsButton.disabled = !isGameDataValid();
}

// Event listener for the "Print Results" button
const errorModal = document.getElementById("errorModal"); // Get the modal
const errorList = document.getElementById("errorList");   // Get the error list element


// Modify printResultsButton event listener
printResultsButton.addEventListener("click", () => {
  getGameData()
  // Check if game data is valid 
  const gameData = getGameData();
  const errors = validateGameData(gameData);
  if (errors.length === 0) {
    //If there are no errors
    communicate2Backend("print", null, scoreRoomData).then((response) => {
      if (response && response.success) {
        // ... (Logic for handling the response from your backend) ...
      } else {
        console.error(response.error);
      }
    });
  } else {
    // Show the error modal with the list of errors
    displayErrors(errors);
  }
});
// Create a function to validate the game data
function validateGameData(gameData) {
  const errors = []; // Array to store errors

  // Check if required score room settings are present and not empty
  const settings = scoreRoomData.scoreRoomSettings;
  if (!settings.date || settings.date.trim() === "") {
    errors.push("Score Room: Date is required.");
  }
  if (!settings.lobby || settings.lobby.trim() === "") {
    errors.push("Score Room: Lobby ID is required.");
  }
  if (!settings.server || settings.server.trim() === "") {
    errors.push("Score Room: Server is required.");
  }
  if (!settings.scrimName || settings.scrimName.trim() === "") {
    errors.push("Score Room: Scrim Name is required.");
  }

  for (const gameNumber in gameData) {
    const matchData = gameData[gameNumber];

    // Check if map is selected
    if (matchData.map === "") {
      errors.push(`Game ${gameNumber}: No map selected.`);
    }

    // Check for duplicate teams
    const teams = new Set();
    for (const placement in matchData.placements) {
      const teamName = matchData.placements[placement].teamName;
      if (teams.has(teamName)) {
        errors.push(`Game ${gameNumber}: Duplicate team "${teamName}".`);
      }
      teams.add(teamName);
    }
  }
  return errors;
}

// Function to display errors in the modal
function displayErrors(errors) {
  errorList.innerHTML = ""; // Clear previous errors
  errors.forEach(error => {
    const listItem = document.createElement("li");
    listItem.textContent = error;
    errorList.appendChild(listItem);
  });

  errorModal.style.display = "block"; // Show the modal
}

// Function to close the error modal
function closeErrorModal() {
  errorModal.style.display = "none";
}


// Call on page load
document.addEventListener("DOMContentLoaded", async () => {
  //createLoadingScreen();
  await validateAndCleanScoreRoomIds().then(() => {
    if (currentScoreRoom) {
      loadCurrentScoreRoom();
      //document.getElementById("loadingScreen").style.display = "none";
      setInterval(heartbeatsave, 5000); // 10000 milliseconds = 10 seconds
    } else {
      openScoreRoomSettingsModal();
      setInterval(heartbeatsave, 5000); // 10000 milliseconds = 10 seconds
    }
  });
});
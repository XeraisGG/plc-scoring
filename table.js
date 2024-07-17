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

let rawScoreRoomIds = localStorage.getItem("scoreRoomIds");

if (rawScoreRoomIds) {
  scoreRoomIds = JSON.parse(rawScoreRoomIds);
}

// Get the current URL object
const currentUrl = new URL(window.location.href);

// Get the query parameters as a URLSearchParams object
const params = currentUrl.searchParams;

// Check if the "roomId" parameter exists
const shareId = params.get("shareId");
if (shareId) {
  console.log("shareId:", shareId); // Log the roomId if it exists
  addNewScoreRoom(shareId);
  params.delete("shareId"); // Remove the roomId parameter

  // Update the URL without a full reload (using history.replaceState)
  const newUrl = `${currentUrl.origin}${
    currentUrl.pathname
  }?${params.toString()}`;
  window.history.replaceState({}, document.title, newUrl);
}

function addNewScoreRoom(shareId) {
  communicate2Backend("get", shareId).then((scoreRoomData) => {
    if (scoreRoomData) {
      scoreRoomIds[shareId] = scoreRoomData.scoreRoomSettings.nickname || null;
      localStorage.setItem("scoreRoomIds", scoreRoomIds);
    } else {
      // Handle the error if the score room wasn't found or there was another error
    }
  });
}

let currentScoreRoom = Object.keys(scoreRoomIds)[0];

let scoreRoomData = {
  _id: "66962249dfe4320808764e57",
  teamData: {
    3: {
      slot: 3,
      name: "STRANGERS",
      tag: "STES",
      notes: "",
    },
    4: {
      slot: 4,
      name: "SENTINELS",
      tag: "SEN",
      notes: "",
    },
    5: {
      slot: 5,
      name: "OLD GANGSTERS",
      tag: "OGX",
      notes: "",
    },
    6: {
      slot: 6,
      name: "INFINITY REAPERS",
      tag: "I69",
      notes: "",
    },
    7: {
      slot: 7,
      name: "INFERNO ESPORTS",
      tag: "INFX",
      notes: "",
    },
    8: {
      slot: 8,
      name: "NEBULA",
      tag: "NEB",
      notes: "",
    },
    9: {
      slot: 9,
      name: "DAUNTLESS",
      tag: "DAUNT",
      notes: "",
    },
    10: {
      slot: 10,
      name: "ZENITHS",
      tag: "ZENX",
      notes: "",
    },
    11: {
      slot: 11,
      name: "SECTOR 11",
      tag: "11SEC",
      notes: "",
    },
    12: {
      slot: 12,
      name: "SENECA ESPORTS",
      tag: "SE",
      notes: "",
    },
    13: {
      slot: 13,
      name: "CYBER SOLDIERS",
      tag: "CS",
      notes: "",
    },
    14: {
      slot: 14,
      name: "TEAM FATE",
      tag: "FATE",
      notes: "",
    },
    15: {
      slot: 15,
      name: "SKY",
      tag: "SKY",
      notes: "",
    },
    16: {
      slot: 16,
      name: "RAIN ESPORTS",
      tag: "RAIN",
      notes: "",
    },
    17: {
      slot: 17,
      name: "YUNGVAMPLIFE",
      tag: "VAMP",
      notes: "",
    },
    18: {
      slot: 18,
      name: "JATTS ESPORTS",
      tag: "JATTSメ",
      notes: "",
    },
    19: {
      slot: 19,
      name: "SKILLS OF MIND",
      tag: "SOM",
      notes: "",
    },
    20: {
      slot: 20,
      name: "NRG GALAXY",
      tag: "NRG",
      notes: "",
    },
    21: {
      slot: 21,
      name: "DARK ESPORTS",
      tag: "DARK",
      notes: "",
    },
    22: {
      slot: 22,
      name: "MIXED MAFIA",
      tag: "MM",
      notes: "",
    },
    23: {
      slot: 23,
      name: "TEAM ACES",
      tag: "ACES",
      notes: "",
    },
    24: {
      slot: 24,
      name: "REDSTORM",
      tag: "RDS",
      notes: "",
    },
    25: {
      slot: 25,
      name: "Illegal Immigrants",
      tag: "Foxi",
      notes: "",
    },
  },
  scoreRoomSettings: {
    date: "2024-07-16",
    lobby: "1",
    server: "Region 8 Gaming",
    nickname: "",
  },
  gameData: {
    1: {
      placements: {
        1: {
          teamName: "DAUNTLESS",
          teamTag: "DAUNT",
          teamEliminations: 10,
          noScore: false,
        },
        2: {
          teamName: "ZENITHS",
          teamTag: "ZENX",
          teamEliminations: 14,
          noScore: false,
        },
        3: {
          teamName: "NEBULA",
          teamTag: "NEB",
          teamEliminations: 4,
          noScore: false,
        },
        4: {
          teamName: "SKY",
          teamTag: "SKY",
          teamEliminations: 2,
          noScore: false,
        },
        5: {
          teamName: "SENTINELS",
          teamTag: "SEN",
          teamEliminations: 4,
          noScore: false,
        },
        6: {
          teamName: "INFINITY REAPERS",
          teamTag: "I69",
          teamEliminations: 2,
          noScore: false,
        },
        7: {
          teamName: "JATTS ESPORTS",
          teamTag: "JATTSメ",
          teamEliminations: 3,
          noScore: false,
        },
        8: {
          teamName: "TEAM FATE",
          teamTag: "FATE",
          teamEliminations: 2,
          noScore: false,
        },
        9: {
          teamName: "RAIN ESPORTS",
          teamTag: "RAIN",
          teamEliminations: 1,
          noScore: false,
        },
        10: {
          teamName: "SECTOR 11",
          teamTag: "11SEC",
          teamEliminations: 4,
          noScore: false,
        },
        11: {
          teamName: "TEAM ACES",
          teamTag: "ACES",
          teamEliminations: 3,
          noScore: false,
        },
        12: {
          teamName: "SKILLS OF MIND",
          teamTag: "SOM",
          teamEliminations: 5,
          noScore: false,
        },
        13: {
          teamName: "REDSTORM",
          teamTag: "RDS",
          teamEliminations: 0,
          noScore: false,
        },
        14: {
          teamName: "SENECA ESPORTS",
          teamTag: "SE",
          teamEliminations: 0,
          noScore: false,
        },
        15: {
          teamName: "OLD GANGSTERS",
          teamTag: "OGX",
          teamEliminations: 4,
          noScore: false,
        },
        16: {
          teamName: "NRG GALAXY",
          teamTag: "NRG",
          teamEliminations: 8,
          noScore: false,
        },
        17: {
          teamName: "MIXED MAFIA",
          teamTag: "MM",
          teamEliminations: 1,
          noScore: false,
        },
        18: {
          teamName: "RAIN ESPORTS",
          teamTag: "RAIN",
          teamEliminations: 0,
          noScore: false,
        },
        19: {
          teamName: "CYBER SOLDIERS",
          teamTag: "CS",
          teamEliminations: 0,
          noScore: false,
        },
        20: {
          teamName: "INFINITY REAPERS",
          teamTag: "I69",
          teamEliminations: 0,
          noScore: false,
        },
        21: {
          teamName: "Illegal Immigrants",
          teamTag: "Foxi",
          teamEliminations: 1,
          noScore: false,
        },
        22: {
          teamName: "STRANGERS",
          teamTag: "STES",
          teamEliminations: 2,
          noScore: false,
        },
        23: {
          teamName: "DARK ESPORTS",
          teamTag: "DARK",
          teamEliminations: 1,
          noScore: false,
        },
      },
      map: "Erangel",
      noScoreTeams: [],
    },
    2: {
      placements: {
        1: {
          teamName: "REDSTORM",
          teamTag: "RDS",
          teamEliminations: 9,
          noScore: false,
        },
        2: {
          teamName: "DARK ESPORTS",
          teamTag: "DARK",
          teamEliminations: 1,
          noScore: false,
        },
        3: {
          teamName: "NEBULA",
          teamTag: "NEB",
          teamEliminations: 1,
          noScore: false,
        },
        4: {
          teamName: "DAUNTLESS",
          teamTag: "DAUNT",
          teamEliminations: 12,
          noScore: false,
        },
        5: {
          teamName: "Illegal Immigrants",
          teamTag: "Foxi",
          teamEliminations: 1,
          noScore: false,
        },
        6: {
          teamName: "RAIN ESPORTS",
          teamTag: "RAIN",
          teamEliminations: 4,
          noScore: false,
        },
        7: {
          teamName: "SECTOR 11",
          teamTag: "11SEC",
          teamEliminations: 0,
          noScore: false,
        },
        8: {
          teamName: "RAIN ESPORTS",
          teamTag: "RAIN",
          teamEliminations: 2,
          noScore: false,
        },
        9: {
          teamName: "NRG GALAXY",
          teamTag: "NRG",
          teamEliminations: 1,
          noScore: false,
        },
        10: {
          teamName: "SKY",
          teamTag: "SKY",
          teamEliminations: 0,
          noScore: false,
        },
        11: {
          teamName: "INFERNO ESPORTS",
          teamTag: "INFX",
          teamEliminations: 10,
          noScore: false,
        },
        12: {
          teamName: "JATTS ESPORTS",
          teamTag: "JATTSメ",
          teamEliminations: 0,
          noScore: false,
        },
        13: {
          teamName: "TEAM FATE",
          teamTag: "FATE",
          teamEliminations: 0,
          noScore: false,
        },
        14: {
          teamName: "SENECA ESPORTS",
          teamTag: "SE",
          teamEliminations: 3,
          noScore: false,
        },
        15: {
          teamName: "STRANGERS",
          teamTag: "STES",
          teamEliminations: 13,
          noScore: false,
        },
        16: {
          teamName: "TEAM ACES",
          teamTag: "ACES",
          teamEliminations: 6,
          noScore: false,
        },
        17: {
          teamName: "SENTINELS",
          teamTag: "SEN",
          teamEliminations: 0,
          noScore: false,
        },
        18: {
          teamName: "CYBER SOLDIERS",
          teamTag: "CS",
          teamEliminations: 0,
          noScore: false,
        },
        19: {
          teamName: "ZENITHS",
          teamTag: "ZENX",
          teamEliminations: 4,
          noScore: false,
        },
        20: {
          teamName: "SKILLS OF MIND",
          teamTag: "SOM",
          teamEliminations: 1,
          noScore: false,
        },
        21: {
          teamName: "INFINITY REAPERS",
          teamTag: "I69",
          teamEliminations: 3,
          noScore: false,
        },
        22: {
          teamName: "OLD GANGSTERS",
          teamTag: "OGX",
          teamEliminations: 0,
          noScore: false,
        },
        23: {
          teamName: "MIXED MAFIA",
          teamTag: "MM",
          teamEliminations: 0,
          noScore: false,
        },
      },
      map: "Miramar",
      noScoreTeams: [],
    },
    3: {
      placements: {
        1: {
          teamName: "INFINITY REAPERS",
          teamTag: "I69",
          teamEliminations: 11,
          noScore: false,
        },
        2: {
          teamName: "JATTS ESPORTS",
          teamTag: "JATTSメ",
          teamEliminations: 6,
          noScore: false,
        },
        3: {
          teamName: "DAUNTLESS",
          teamTag: "DAUNT",
          teamEliminations: 2,
          noScore: false,
        },
        4: {
          teamName: "ZENITHS",
          teamTag: "ZENX",
          teamEliminations: 0,
          noScore: false,
        },
        5: {
          teamName: "REDSTORM",
          teamTag: "RDS",
          teamEliminations: 4,
          noScore: false,
        },
        6: {
          teamName: "STRANGERS",
          teamTag: "STES",
          teamEliminations: 9,
          noScore: false,
        },
        7: {
          teamName: "NEBULA",
          teamTag: "NEB",
          teamEliminations: 6,
          noScore: false,
        },
        8: {
          teamName: "RAIN ESPORTS",
          teamTag: "RAIN",
          teamEliminations: 6,
          noScore: false,
        },
        9: {
          teamName: "DARK ESPORTS",
          teamTag: "DARK",
          teamEliminations: 7,
          noScore: false,
        },
        10: {
          teamName: "NRG GALAXY",
          teamTag: "NRG",
          teamEliminations: 7,
          noScore: false,
        },
        11: {
          teamName: "INFERNO ESPORTS",
          teamTag: "INFX",
          teamEliminations: 6,
          noScore: false,
        },
        12: {
          teamName: "Illegal Immigrants",
          teamTag: "Foxi",
          teamEliminations: 0,
          noScore: false,
        },
        13: {
          teamName: "SENECA ESPORTS",
          teamTag: "SE",
          teamEliminations: 2,
          noScore: false,
        },
        14: {
          teamName: "SENTINELS",
          teamTag: "SEN",
          teamEliminations: 2,
          noScore: false,
        },
        15: {
          teamName: "SKILLS OF MIND",
          teamTag: "SOM",
          teamEliminations: 3,
          noScore: false,
        },
        16: {
          teamName: "SKY",
          teamTag: "SKY",
          teamEliminations: 2,
          noScore: false,
        },
        17: {
          teamName: "SECTOR 11",
          teamTag: "11SEC",
          teamEliminations: 1,
          noScore: false,
        },
        18: {
          teamName: "RAIN ESPORTS",
          teamTag: "RAIN",
          teamEliminations: 0,
          noScore: false,
        },
        19: {
          teamName: "OLD GANGSTERS",
          teamTag: "OGX",
          teamEliminations: 0,
          noScore: false,
        },
        20: {
          teamName: "TEAM ACES",
          teamTag: "ACES",
          teamEliminations: 0,
          noScore: false,
        },
        21: {
          teamName: "CYBER SOLDIERS",
          teamTag: "CS",
          teamEliminations: 0,
          noScore: false,
        },
      },
      map: "Sanhok",
      noScoreTeams: [],
    },
    4: {
      placements: {
        1: {
          teamName: "SKILLS OF MIND",
          teamTag: "SOM",
          teamEliminations: 13,
          noScore: false,
        },
        2: {
          teamName: "DAUNTLESS",
          teamTag: "DAUNT",
          teamEliminations: 6,
          noScore: false,
        },
        3: {
          teamName: "REDSTORM",
          teamTag: "RDS",
          teamEliminations: 0,
          noScore: false,
        },
        4: {
          teamName: "NRG GALAXY",
          teamTag: "NRG",
          teamEliminations: 7,
          noScore: false,
        },
        5: {
          teamName: "RAIN ESPORTS",
          teamTag: "RAIN",
          teamEliminations: 3,
          noScore: false,
        },
        6: {
          teamName: "NEBULA",
          teamTag: "NEB",
          teamEliminations: 2,
          noScore: false,
        },
        7: {
          teamName: "ZENITHS",
          teamTag: "ZENX",
          teamEliminations: 3,
          noScore: false,
        },
        8: {
          teamName: "SECTOR 11",
          teamTag: "11SEC",
          teamEliminations: 6,
          noScore: false,
        },
        9: {
          teamName: "INFINITY REAPERS",
          teamTag: "I69",
          teamEliminations: 3,
          noScore: false,
        },
        10: {
          teamName: "RAIN ESPORTS",
          teamTag: "RAIN",
          teamEliminations: 1,
          noScore: false,
        },
        11: {
          teamName: "STRANGERS",
          teamTag: "STES",
          teamEliminations: 13,
          noScore: false,
        },
        12: {
          teamName: "JATTS ESPORTS",
          teamTag: "JATTSメ",
          teamEliminations: 0,
          noScore: false,
        },
        13: {
          teamName: "INFERNO ESPORTS",
          teamTag: "INFX",
          teamEliminations: 1,
          noScore: false,
        },
        14: {
          teamName: "DARK ESPORTS",
          teamTag: "DARK",
          teamEliminations: 0,
          noScore: false,
        },
        15: {
          teamName: "OLD GANGSTERS",
          teamTag: "OGX",
          teamEliminations: 2,
          noScore: false,
        },
        16: {
          teamName: "SENECA ESPORTS",
          teamTag: "SE",
          teamEliminations: 1,
          noScore: false,
        },
        17: {
          teamName: "TEAM ACES",
          teamTag: "ACES",
          teamEliminations: 1,
          noScore: false,
        },
      },
      map: "Erangel",
      noScoreTeams: [],
    },
  },
};

async function loadCurrentScoreRoom() {
  communicate2Backend("get", currentScoreRoom).then((scoreRoomData) => {
    if (scoreRoomData) {
      populateTeamList();
      const totalSavedMatches = Object.keys(scoreRoomData.gameData).length;
      const tables = tablesContainer.querySelectorAll(".gameScores");

      for (let i = tables.length; i < totalSavedMatches; i++) {
        addTable();
      }
    } else {
      // Handle the error if the score room wasn't found or there was another error
    }
  });
}

// Replace 'YOUR_APPS_SCRIPT_URL' with your actual deployed Apps Script URL
const apiBaseUrl = "";
// Function to get a score room
async function communicate2Backend(
  method,
  roomId = null,
  scoreRoomData = null
) {
  try {
    // Fetch data from your backend
    let backendUrl = `https://script.google.com/macros/s/AKfycbwzKSkiCanvw_F2yOTZhumh06q4k5Y7CKoTZ_Cjg1n2pyHtyQJUldO5fFx-rHZFHIzo0w/exec?method${method.toString()}`;
    if (method !== "create") {
      if (!roomId) {
        return handleError("Missing roomId parameter");
      }
      backendUrl += `&roomId=${roomId.toString()}`;
      if (method == "update") {
        if (!scoreRoomData) {
          return handleError("Missing scoreRoomData parameter");
        }
        backendUrl += `scoreRoomData${JSON.stringify(scoreRoomData)}`;
      }
    }
    const response = await fetch(backendUrl);

    const data = await response.json();
    if (data.success) {
      return data.scoreRoomData;
    } else {
      throw new Error(`Error fetching score room: ${data.error}`);
    }
  } catch (error) {
    console.error("Error getting score room:", error);
    return null;
  }
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
    //console.log(matchData);
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
    row.addEventListener("input", () => {
      getGameData(); // Call the function to update and save game data
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

  mapSelect.addEventListener("input", () => {
    getGameData(); // Call the function to update and save game data
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
  const gameData = {};
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

// Function to open the results modal
function openResultsModal() {
  const statsTable = createStatsTable();
  resultsTableContainer.innerHTML = ""; // Clear previous results
  resultsTableContainer.appendChild(statsTable);
  resultsModal.style.display = "block";
}
function closeResultsModal() {
  resultsModal.style.display = "none";
}
previewResultsButton.addEventListener("click", () => {
  openResultsModal();
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

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

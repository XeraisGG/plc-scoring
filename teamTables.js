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

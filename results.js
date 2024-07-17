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

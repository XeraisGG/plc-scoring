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
  communicate2Backend("get", currentScoreRoom).then((scoreRoomData) => {
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

/*
async function getScoreRoom(roomId) {
  try {
    const response = await fetch("http://160.3.190.51:63969/plc/api/get", {
      // Assuming your POST endpoint is /get
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch score room: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.success) {
      return data.scoreRoomData;
    } else {
      throw new Error(`Server error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error getting score room:", error);
    return null;
  }
}
*/
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

function handleError(message) {
  return console.error(message);
}

function handleError(message) {
  return console.error(message);
}
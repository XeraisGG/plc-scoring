const { MongoClient, ObjectId } = require("mongodb"); // Import ObjectId
const { mongoURL } = require("../../../Secrets/config.json");

const dbName = "AstroPulse";

// MongoDB Connection
let mongoClient; // Store the MongoDB client globally
async function connectToMongo() {
  if (!mongoClient) {
    mongoClient = await MongoClient.connect(mongoURL);
  }
  return mongoClient.db(dbName);
}

function generateUniqueId() {
  const timestamp = Date.now().toString(); // Get current Unix timestamp as a string
  const randomPart = Math.random().toString(36).substr(2, 9); // Generate random 9-character alphanumeric string
  return timestamp + randomPart; // Combine timestamp and random part
}

async function createScoreRoom(req, res) {
  const db = await connectToMongo();
  const scoringRoomsCollection = db.collection("ScoringRooms");

  try {
    // Generate a unique ID for the score room
    const roomId = generateUniqueId();

    // Create the new score room data object
    const newScoreRoomData = {
      roomId,
      teamData: {},
      gameData: {},
      scoreRoomSettings: {
        date: "",
        lobby: "",
        server: "",
        nickname: "",
      },
    };

    // Insert the new score room into the database
    await scoringRoomsCollection.insertOne(newScoreRoomData);

    // Send the success response with the generated roomId
    await res.json({ success: true, roomId });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error creating score room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function getScoreRoom(req, res) {
  const db = await connectToMongo();
  const scoringRoomsCollection = db.collection("ScoringRooms");

  try {
    let { roomId } = req.query;
    roomId = roomId.toString();

    if (!roomId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing roomId parameter" });
    }

    console.log(roomId);

    const scoreRoom = await scoringRoomsCollection.findOne({ roomId });
    console.log(scoreRoom);
    if (!scoreRoom) {
      return res
        .status(404)
        .json({ success: false, error: "Score room not found" });
    }

    res.json({ success: true, scoreRoomData: scoreRoom });
  } catch (error) {
    console.error("Error getting score room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function updateScoreRoom(req, res) {
  const db = await connectToMongo();
  const scoringRoomsCollection = db.collection("ScoringRooms");

  try {
    let { roomId, scoreRoomData } = req.query;
    roomId = roomId.toString();

    if (!roomId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing roomId parameter" });
    }

    const result = await scoringRoomsCollection.updateOne(
      { roomId }, // Match by roomId
      { $set: scoreRoomData }
    );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Score room not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating score room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

async function deleteScoreRoom(req, res) {
  const db = await connectToMongo();
  const scoringRoomsCollection = db.collection("ScoringRooms");

  try {
    let { roomId } = req.query;
    roomId = roomId.toString();
    if (!roomId) {
      return res.status(400).json({
        success: false,
        error: "Missing roomId parameter",
      });
    }

    const result = await scoringRoomsCollection.deleteOne({ roomId: roomId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Score room not found",
      });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting score room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

module.exports = {
  createScoreRoom,
  getScoreRoom,
  updateScoreRoom,
  deleteScoreRoom,
};

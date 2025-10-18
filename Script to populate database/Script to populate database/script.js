const mongoose = require("mongoose");
const fs = require("fs");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/CharterBox", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Call function to insert all data once connected
    insertAllData();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Async Function to Insert multiple
async function insertData(schemaModel, jsonFile) {
  try {
    // Load JSON data from the file
    const jsonData = JSON.parse(fs.readFileSync(jsonFile));

    // Insert data into the collection using insertMany
    await schemaModel.insertMany(jsonData);
    console.log(`Data from "${jsonFile}" inserted successfully!`);
  } catch (err) {
    console.error(`Error inserting data from "${jsonFile}":`, err);
  }
}

//User Schema
const userSchema = mongoose.Schema(
    {
        _id : { type: String, require: true},
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        createdTs: { type: Date, default: new Date() },
        updatedTs: { type: Date, default: new Date() }
    }
);
const userModel = mongoose.model("user", userSchema);

//User Session Schema
const userSessionSchema = mongoose.Schema(
    {
        _id : { type: String, require: true},
        userId: { type: String, required: true },
        sessionToken: { type: String, default: null },
        createdTs: { type: Date, default: new Date() },
        updatedTs: { type: Date, default: new Date() }
    }
)
const userSessionModel = mongoose.model("userSession", userSessionSchema);

const channelSchema = mongoose.Schema({
    _id : { type: String, require: true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: { type: Boolean, default: true },
    createdBy: { type: String, required: true },
    createdTs: { type: Date, default: new Date() },
    updatedTs: { type: Date, default: new Date() }
});

const channelModel = mongoose.model("channel", channelSchema);

const messageSchema = mongoose.Schema(
    {
        _id : { type: String, require: true},
        content: { type: String, required: true },
        sender: { type: String, required: true },
        channelId: { type: String, required: true },
        createdTs: { type: Date, default: new Date() },
    }
);

const messageModel = mongoose.model('message', messageSchema);

async function insertAllData() {
  try {
    await insertData(userModel, "data/user.json");
    await insertData(userSessionModel, "data/userSession.json");
    await insertData(channelModel, "data/channel.json");
    await insertData(messageModel, "data/message.json");
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('Connection closed');
  }
}
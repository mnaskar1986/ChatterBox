const express = require("express");

// Importing necessary modules and middleware
const connectDatabase = require("./app/database/databaseInit");
const { SERVER_PORT } = require("./app/constants");
const errorHandler = require("./app/middleware/errorHandlers");

const messageRouter = require("./app/routes/messageRoutes");
const channelRouter = require("./app/routes/channelRoutes");
const userRouter = require("./app/routes/userRoutes");

const app = express();

var cors = require("cors");

app.use(cors());

// Connecting to the database
connectDatabase();

// Parsing incoming requests as JSON and handling errors
app.use(express.json());
app.use(errorHandler);

var requestBodyParser = require("body-parser");

// Parsing request bodies
app.use(requestBodyParser.json({ limit: "5mb" }));
app.use(
  requestBodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Using routers for different API endpoints
app.use("/api/channels", channelRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

// Endpoint to check if the server is running
app.get("/PING", (_, res) => {
  res.status(200).json({
    message: "PONG",
  });
});

// Starting the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running at port : ${SERVER_PORT}`);
});
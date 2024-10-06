const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors"); // Import the CORS package
const bodyParser = require("body-parser");
const db = require("./Config/mongoose");
const Router = require("./Routers/mainRoute");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();


app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Enable CORS for all routes
app.use(cors());

app.use("/", Router);

const server = app.listen(port, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  }
  console.log(`Server is running on port ${port}`);
});


//-------------------------------------------------------------- Deployment -----------------------------------------------------------------------


const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../Client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "../" ,"Client", "build", "index.html"))
  );
} else {
  app.get("*", (req, res) => {
    res.status(503).send('Application is in maintenance, Please wait...');
  });
}


// ----------------------------------------------------------- Socket connection --------------------------------------------------------------------

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "https://localhost:3000",
//     // credentials: true,
//   },
// });


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://wechat-1go6.onrender.com",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log("User Joined: " + userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");
    // console.log("Here is chat id", chat._id);

    socket.broadcast.to(chat._id).emit("message received", newMessageRecieved);

    // chat.users.forEach((user) => {
    //   if (user._id == newMessageRecieved.sender._id) return;

    //   socket.in(user._id).emit("message recieved", newMessageRecieved);
    // });
  });

  socket.off("setup", () => {
    // console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

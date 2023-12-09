require("dotenv").config();
const port = process.env.PORT || 8000;
const app = require("./app");

// mongodb connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongooseConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`database connection established:${conn.connection.host}`);
  } catch (err) {
    console.log(`database connection failed : ${err}`);
  }
};
mongooseConnection();

const server = app.listen(port, () => {
  console.log(`server connected at port:${port}`);
});

// socket
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:5173" },
});

// check connection from client side
io.on("connection", (socket) => {
  console.log(`connected with socketid:${socket.id}`);

  // socket events
});

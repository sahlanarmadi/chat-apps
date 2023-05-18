const app = require ("express")()
const http = require("http")
const server = http.createServer(app)
const {Server} = require ("socket.io")
const io = new Server(server)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chatapps.html');
  });
  
  let user = 0
  let id = 1
  io.on('connection', (socket) => {
    socket.on("message", (data) => {
      console.log("data =>", data)
      const {id, message} = data
      socket.broadcast.emit("message", id, message)
    })
    socket.on("join", (socket) => {
      console.log("user login")
      user++;
      io.emit("user", user)
    })
    socket.on("id", (socket) => {
      console.log(id++)
      id++;
      io.emit("id", id)
    })
    socket.on("disconnect", (socket) => {
      console.log("user keluar")
      user--;
      io.emit("user", user)
    })
    });
  
  server.listen(3000, () => {
    console.log(`http://localhost:${3000}`);
  });
import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors'

const port = 3000;

const app = express();
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("User Connected");
    console.log("ID", socket.id);
    socket.emit("welcome", `Welcome to the server`)
    socket.broadcast.emit("welcome", `Welcome to the server ${socket.id}`)
})

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))

app.get("/", (req, res) => {
    res.json({
        title: 'Success',
        message: 'Server Response'
    })
})

server.listen(port, () => {
    console.log(`Server is running on port 3000 ${port}`);
})
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = ("cookie-parser");

require('dotenv').config();

const initSocket = require("./socket/index");

const app = express();
const port = process.env.port || 4000;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const authMiddleware = require("./middleware/authmiddlewar");
const corsOptions = {
    origin: ["http://localhost:5173"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
    methods: ['GET', 'POSTS'],
};

app.use(cors(corsOptions));

// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

//Users
mongoose
 .connect(process.env.MONGO_URL)
 .then(() => console.log("DB connected!"))
 .catch((err) => console.log("DB connection error " + err.message));

 app.post("/", authMiddleware);

 const server = app.listen(port, () => {
    console.log(`Server is running on ${port}`);
 });

 initSocket(server, corsOptions);
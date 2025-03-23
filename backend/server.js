import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js"
import accessRoutes from "./routes/accessRoutes.js"
import patientRoutes from "./routes/patientRoutes.js"
import http from "http"
import { initializeSocket } from './socket.js'
import "./utils/cronJobs.js";

dotenv.config();
connectDB();

const app= express();
const server = http.createServer(app)

//initialize Socket.IO
initializeSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/access", accessRoutes);
app.use("/api/v1/patient",patientRoutes)

const PORT= process.env.PORT || 4000;
server.listen(PORT,()=> console.log(` Server running on port ${PORT}`))
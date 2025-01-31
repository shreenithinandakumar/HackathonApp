const mongoose = require("mongoose")
const express= require('express')
//const {v4:uuidv4} = require('uuid')
require('dotenv').config()
const cors = require('cors')

const app = express()
const PORT = 3000
const jwtSecret = process.env.JWT_SECRET;
const mongoURI = process.env.DB_URI;

mongoose.connect(mongoURI)
.then(()=>{
    console.log('Connected to mongodb Atlas')
}).catch ((error)=>{
    console.log(error)
})

app.use(cors())
app.use(express.json())


const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const participantRoutes = require('./routes/participantRoutes');
app.use('/api/participants', participantRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admins', adminRoutes);

const hackathonRoutes = require('./routes/hackathonRoutes');
app.use('/api/hackathons', hackathonRoutes);


app.listen(PORT, ()=>{
    console.log('server is running')
})
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const userRoutes= require('./routes/UserRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://ashd:ALiWWYtz6wl8nHKq@cluster0.yen471o.mongodb.net/?retryWrites=true&w=majority",{
    useNewURlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DATABASE CONNECTED");
})

app.use('/api/user',userRoutes);

app.listen(4000,console.log("server started on port 4000"));
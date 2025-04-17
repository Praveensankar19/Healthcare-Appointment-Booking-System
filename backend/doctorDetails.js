const express = require("express")
const app = express()
const port = 8000
const cors =require("cors")
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/healthcare")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));


const doctorSchema = new mongoose.Schema({
    hospitalName: String,
    doctorName: String,
    speciallist: String,
    location: String,
    date: String,
    fromTime: String,
    toTime: String,
    token: Number,
    slot: [String]
});
const Doctor = mongoose.model("Doctor", doctorSchema);


app.post('/Doctorlist', async (req, res) => {
    try {
    const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json({ message: "Doctor data saved successfully" });
    } catch (error) {
        console.error("Error saving doctor:", error);
        res.status(500).json({ error: "Failed to save doctor data" });
    }
});


app.get('/api/hospitals', async (req, res) => {
    try {
        const data = await Doctor.find();
        console.log("Doctor data fetched:", data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching data from MongoDB:", err);
        res.status(500).json({ error: 'Server Error' });
    }
});


app.listen(port,(error) =>{
    if(error){
        console.error(error)
    }
    else{
        console.log("server running on " + port)
    }
})


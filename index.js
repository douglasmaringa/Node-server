const express = require("express")
const app = express()
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")

//routes imports
const authRoute = require("./routes/auth")

//db connection 
mongoose.connect('mongodb+srv://admin:admin@cluster0.qwahu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true })
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Db is connected successfully")
});

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

// initialising routes
app.use("/api/auth",authRoute);



app.listen(8800,()=>{
  console.log("server running on port 8800")
})
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Qwerty').then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{"Error connecting to MongoDB",err});
const cors=require('cors')
const express = require('express')
const app = express()
const port = 8000
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth',require('./routes/auth'))
//app.use('/api/notes',require('./routes/notes'))
app.use('/api/login',require('./routes/auth'))
app.use('/api/getUser',require('./routes/auth'))
app.use(cors());

app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})


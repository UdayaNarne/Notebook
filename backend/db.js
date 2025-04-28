const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Qwerty').then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{"Error connecting to MongoDB",err});
// const connectMongo = ()=>{
//     mongoose.connect('mongodb://127.0.0.1:27017/Qwerty',()=>{
//         console.log("Connected to MongoDB");
//     })
// }

// module.exports;

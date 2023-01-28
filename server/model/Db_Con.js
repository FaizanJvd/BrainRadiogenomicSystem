const mongoose = require("mongoose");
const DB = process.env.URL;
//MONGO COMPASS CONNECTION

// const compassURL = process.env.URL;
// mongoose.connect(compassURL,function(err,connect){ 
//     if(err) throw err;
//     console.log("connected to MongoCompass");
// });

// MONGO ATLAS CONNECTION.
mongoose.connect(DB).then(() => {
    console.log('connected to Mongo Atlas')
}).catch((err) => console.log(err));
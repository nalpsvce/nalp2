const mongoose = require("mongoose");

const database = mongoose.connect("mongodb+srv://harishs:Harishisagoodboy@cluster0.8lp5p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  //process.env.DB_URL,
  { useNewUrlParser: true, 
    useUnifiedTopology: true
    
  },
  (error) => {
    if (!error) {
      console.log("connected to the mongoDB");
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }
);

module.exports = database;



//mongoose.connect('mongodb+srv://user-ping:GXXNjDlXUNrzZjNf@cluster0.zmv6k.mongodb.net/Hackathon?retryWrites=true&w=majority', {
  //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
//})
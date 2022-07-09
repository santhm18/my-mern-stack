const mongoose = require('mongoose');
const connection = "mongodb+srv://santoshhm:SoZlgDv9zHEuo4tW@cluster0.n7tbj.mongodb.net/test";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
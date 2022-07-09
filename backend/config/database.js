const mongoose = require('mongoose');
const { MONGO_URI } = process.env;
const connection = MONGO_URI;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
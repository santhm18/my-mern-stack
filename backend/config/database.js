const mongoose = require('mongoose');
// MONGO_URI= 'mongodb://127.0.0.1:27017/dev-db'
// USER = "96d7eaead927ee"
// PASSWORD = "682508c2ae42c5$5655"
const { MONGO_URI } = process.env;
const connection = MONGO_URI;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
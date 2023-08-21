require("dotenv").config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middleware/auth');
const userRoute = require('./routes/user');
const memoryRoute = require('./routes/memory');
const chartRoute = require('./routes/chart');
const path = require('path')
const app = express();
require("./config/database");

const { API_PORT } = process.env
const port = process.env.PORT || 5000;
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "96d7eaead927ee",
    pass: "682508c2ae42c5"
  }
});

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// API
app.post('/send', auth, (req, res, next) => {
    let name = req.body.username
    let email = req.body.email
    let subject = req.body.subject
    let message = req.body.message
  
    var mail = {
      from: name,
      to: "santoshhm90@gmail.com",// receiver email,
      subject: subject,
      text: message
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  });

app.use(['/user', '/memory','/chartdata'],[userRoute,memoryRoute,chartRoute]); // Register the route using app.use(<router_name>)

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
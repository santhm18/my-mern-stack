require("dotenv").config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middleware/auth');
const userRoute = require('./routes/user');
const memoryRoute = require('./routes/memory');
const path = require('path')
const app = express();
require("./config/database");

const { API_PORT } = process.env
const port = process.env.PORT || 5000;
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io", //replace with your email provider
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    }
  });

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// API
app.post('/send', auth, (req, res, next) => {
    let name = req.body.username
    let email = req.body.email
    let subject = req.body.subject
    let message = req.body.message
  
    var mail = {
      from: name,
      to: process.env.EMAIL,// receiver email,
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

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
});

app.use(['/user', '/memory'],[userRoute,memoryRoute]); // Register the route using app.use(<router_name>)
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
const express = require('express');
const Memory = require('../models/memory');
const auth = require('../middleware/auth');
const moment = require('moment');
const router = express.Router();

router.get('/barchart', auth,async (req, res) => {   
       try {
        const memories =  await Memory.find({owner: req.user._id})
            var monthLists =  getMonth_Of_Posts();
            var number_of_posts =  getNumber_Of_Posts(memories);
            // console.log('barchart data',monthLists);
            // console.log('barchart data count per month',number_of_posts);
            res.json({
                error: null,
                labels: monthLists,
                data: number_of_posts
            });
       } catch (e) {
        res.status(400).send(e);
    }
    
});
  
function getMonth_Of_Posts(){
   var listOfMonths =  moment.months();
   return listOfMonths;
}

// This function takes a string and creates a date object from the string and return the month. 
function findMonth(datestring) {
    let date = new Date(datestring);
    return date.getMonth();
}

function getNumber_Of_Posts(postData){
    const monthFreq = new Array(12).fill(0); // 12 values as we there are total 12 months per year
    for (const content of postData) {
        const month = parseInt(findMonth(content.createdAt));
        // Months are from 0-11  so it matches directly with array index
        monthFreq[month] = monthFreq[month] + 1;
    }
    console.log(monthFreq);
     return monthFreq;
}

module.exports = router;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const memorySchema =  new mongoose.Schema({
    creator:
    {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    selectedFile: String,
    //  relationship between task and user
    owner: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User'  
    }
});

module.exports = mongoose.model('Memory', memorySchema);
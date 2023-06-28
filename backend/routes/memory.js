const express = require('express');
const Memory = require('../models/memory');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/createMemory', auth,async (req, res) => {
  
    try {
        const memory = new Memory({
            ...req.body,
            owner: req.user._id
        });
        await memory.save();
        res.status(200).send({memory});
    } catch (e) {
        res.status(400).send(e);
    }
});


router.get('/getMemories', auth,async (req, res) => {
    try {
        // const userDetails =  await User.findById(req.user._id);
        // console.log(userDetails);
        const memories =  await Memory.find({owner: req.user._id})
       // const userMemories = req.user['user']._mongooseOptions === {} ? {} : req.user['user']._mongooseOptions.populate('memories');
     //  await userMemories;
       res.json({
        error: null,
        memories: memories
       });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/getMemory/:id', auth,async (req, res) => {
    const { id } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        const memory = await Memory.findById(id);
        res.json(memory);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/getMemory/:id', auth,async (req, res) => {
    const { id } = req.params;
  //  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        const updatedMemory = await Memory.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedMemory);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/getMemory/:id', auth,async (req, res) => {
    const { id } = req.params;
    
    try {
      //  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        await Memory.findByIdAndRemove(id);
        res.json({  message: "Memory deleted successfully." });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
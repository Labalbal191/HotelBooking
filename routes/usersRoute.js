const express = require('express');

const router = express.Router();

const User = require('../models/user')

router.post("/register", async(req, res) => {
    
    const newuser = new User({name: req.body.name, email: req.body.email, password: req.body.password})
    try{
        const user = await newuser.save()
        res.send('Zarejestrowano pomyslnie')
    }
    catch(error){
        return res.status(400).json({ message: error });
    }
});

router.post("/login", async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email: email, password: password})
        if(user){
                const temp = {
                    name: user.name, 
                    email: user.email,
                    isAdmin: user.isAdmin,
                    _id: user._id
                }
                res.send(temp)   
        }
        else{
            return res.status(400).json({ message: 'Nie ma takiego uzytkownika'});  
        }
    }
    catch(error){
        return res.status(400).json({ message: error });
    }
}); 

router.get("/getallusers", async(req, res) =>{
    try{
        const users = await User.find()
        res.send(users)
    }
    catch(error){
        return res.status(400).json({message: error});
    }
});

router.post('/blockuser', async (req, res) => {
    
    const userid =  req.body.userid
    try {
      const userToBeBlocekd = await User.findOne({_id: userid})
      if(!userToBeBlocekd){
        res.send("Nie ma takiego użytkownika")
      }
      else{
        userToBeBlocekd.isBlocked = true 
        await userToBeBlocekd.save()
        res.send("Użytkownik zablokowany")
      }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.post('/checkifuserblocked', async (req, res) => {
    
    const useremail =  req.body.email
    try {
      const user= await User.findOne({email: useremail})
      if(user.isBlocked){
        res.send("Zablokowany")
      }
      else{
        res.send("Niezablokowany")
      }
    } catch (error) {
        return res.status(700).json({ message: error });
    }
})


router.post('/unblockuser', async (req, res) => {
    
    const userid =  req.body.userid
    try {
      const userToBeBlocekd = await User.findOne({_id: userid})
      if(!userToBeBlocekd){
        res.send("Nie ma takiego użytkownika")
      }
      else{
        userToBeBlocekd.isBlocked = false 
        await userToBeBlocekd.save()
        res.send("Użytkownik odblokowany")
      }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

/*
router.post('/checkexistingusers', async (req, res) => {
    const email =  req.body.email
    try {
        const user = await User.find({email: email})
        res.send(user)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})
*/


module.exports =router
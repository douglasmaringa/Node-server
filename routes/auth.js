const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")
const codes = require("../countries")


//register 
router.post("/register", async (req,res)=>{
    try{
        //encrypting password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password , salt);
        
        //get user data from request
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })

        //save user to db
        const user = await newUser.save();
        res.status(200).json(user);
    
    }catch(err){
        res.status(500).json(err)

    }
})
//LOGIN
router.post("/login", async (req, res) => {
  
  //get the code from first two letters of username
  const code = [];
  code.push(req.body.username.split("")[0])
  code.push(req.body.username.split("")[1])
  
  //validate location in username
  if(!codes.includes(code.join("").toUpperCase())){
    res.status(500).json({err:"Please include country code"})
  }else{
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("user not found");
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")
  
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  });
  
module.exports = router;
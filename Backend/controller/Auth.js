const { User } = require("../models/User");
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const response = await user.save();
    res.status(201).json({id:response.id,role:response.role});
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser=async(req,res)=>{
    try {
         const user =await User.findOne({ email: req.body.email }).exec(); 
         console.log({user});
       if(!user){
        res.status(401).json({message:'no such user email'});
       }
       else if(user.password===req.body.password){
            res.status(200).json({id:user.id,email:user.email, addresses:user.addresses,role:user.role});
       }
         else{
            res.status(401).json({message:'wrong credentials'});
         }
    } catch (error) {
        res.status(400).json(error);
    }
}
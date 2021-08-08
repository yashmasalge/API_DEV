const { json } = require('express');
const express = require('express');
require("dotenv").config();

//mongoose connection
const connectDB = require("./connection");

//mongoose model
const userModel = require("./user");

const app = express();

//configuration
app.use(express.json());

// route  :  /
// Description : To get all user
// parameter : none
app.get("/",async(req,res) => {
try{
    
        const user = await userModel.find();
        return res.json({user});
}catch(error){
    return res.status(500).json({error : error.Message});
}
});



// route  :  /user/type/:type
// Description : To get the user based on Type
// parameter : type
    app.get("/user/type/:type",async(req,res) => {
        try{
        const {type} = req.params;
        const user = await userModel.find({userType : type});
    
        if(!user){
            return res.json({Message : "No data Found"});
        }
        return res.json({user});
    }catch(error){
        return res.status(500).json({error : error.Message});
    }
    });



// route  :  /user/id/:type
// Description : To get the user based on id
// parameter : _id
    app.get("/user/:_id",async(req,res) => {
        try{
        const {_id} = req.params;
        const user = await userModel.findOne({_id});
    
        if(!user){
            return res.json({Message : "No data Found"});
        }
        return res.json({user});
    }catch(error){
        return res.status(500).json({error : error.Message});
    }
    });



// route  :  /user/update/:_id
// Description : To update the data using unique id
// parameter : _id
    app.put("/user/update/:_id",async(req,res) => {
        try{
        const {_id} = req.params;
        const {userData}  = req.body;
        const updateUser = await userModel.findByIdAndUpdate(_id,
            {$set: userData},
            { new: true });
    
            return res.json({user : updateUser});
        }catch(error){
            return res.status(500).json({error : error.message});
        }
    });




// route  :  /user/delete/:_id
// Description : To delete the data using unique id
// parameter : _id
    app.delete("/user/delete/:_id",async(req,res) => {
        try{
        const {_id} = req.params;
        await userModel.findByIdAndDelete(_id);
    
        return res.json({Message : "User Deleted"});
        }catch(error){
            return res.status(500).json({error : error.Message});
        }
    });



// route  :  /user/delete/type/:userType
// Description : To delete the data using usertype
// parameter : 
    app.delete("/user/delete/type/:userType",async(req,res) => {
        try{
        const {userType} = req.params;
        await userModel.findOneAndDelete({userType})
    
        return res.json({Message : "User Deleted"});
        }catch(error){
            return res.status(500).json({error : error.Message});
        }
    });




// route  :  /user/new
// Description : To add new user
// parameter : none
// request body : user object
    app.post("/user/new", async (req,res) => {
        try{
        const {newUser} = req.body;
        await userModel.create(newUser);
        return res.json ({Message : "user created"});
        }catch(error){
            return res.status(500).json({error : error.Message});
        }
    });


//creating a port 3000 
app.listen(process.env.PORT,() =>
 connectDB().then((data) =>
 console.log("Server started successfully"))
 .catch((error) => console.log(error))
 );   


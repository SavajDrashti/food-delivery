import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login user
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        //whether is avialble with this emailid?
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User doesn't exist"})
        }

        //if user is exist then we are matching the ppassword of user that are stored in data base
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false, message:"Inavalid credentials"})
        }

        //if pass matching generating a token
        const token = createToken(user._id);
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        //checking user is already exists or not
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }

        //validating email formmat and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter valid email"})
        }


        //password length is greater than 8 digit or not
        if(password.length<8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        //encrypt password-hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        //to save user in db
        const user = await newUser.save()

        //take user id and generate one token
        const token = createToken(user._id)

        //send this token to the response
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}



export {loginUser, registerUser}

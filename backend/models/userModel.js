import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    cartData:{
        type: Object,
        default: {}
    },
}, {minimize: false})       //if we will not save false then card data eill not be created bcz we dont provided any data here


const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;  
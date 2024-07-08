import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required : true
    },image: {
        type: String,
        required: true
    },
})


//we can create this model only once but when we run this file again it will create model again to solve use || operator 
const foodModel = mongoose.model.food || mongoose.model("food", foodSchema)


export default foodModel;
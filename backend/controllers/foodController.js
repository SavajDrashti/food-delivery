import foodModel from "../models/foodModel.js";
import fs from 'fs'               
                      //file system 

//add food item
const addFood = async(req, res) => {
      

    //to store data in db
    let image_filename = `${req.file.filename}`;    //store uploaded file name in this variable

    const food = new foodModel({
        name: req.body.name,
        description:req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })

    try {
        await food.save();    //using this method food items are stored in database
        res.json({success:true, meassage:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, meassage: "Error"})
    }
}

//display all items that are in db
//all food list
const listfood = async(req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({success:true, data:foods})
    } catch (error) {
        res.json({success:false, message:"Error"})
    }
}


//remove food item
const removeFood = async(req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);   //find model using id
        fs.unlink(`uploads/${food.image}`, () => {})         //delete img from folder

        await foodModel.findByIdAndDelete(req.body.id);      //delete image from db
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {addFood, listfood, removeFood}
import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://savajdrashti2511:Alpa0106@cluster0.f89jgb8.mongodb.net/food-deliviry')   //link from mongodb web
                  .then(() => console.log("DB Connected"));
}
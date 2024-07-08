import express from 'express'
import { addFood, listfood, removeFood} from '../controllers/foodController.js'
import multer from 'multer'   //using that we will create img storage system

const foodRouter = express.Router();    //using this exress router we can ceatw get, post method and many more

//image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb) => {
        return cb(null,`${Date.now()} ${file.originalname}`)
    }
})

const upload = multer({storage:storage})   //uses storage by creating diskStorage  using this we can add new image on upload folder


foodRouter.post("/add", upload.single("image"),addFood)     //
foodRouter.get("/list", listfood)
foodRouter.post("/remove", removeFood)





export default foodRouter
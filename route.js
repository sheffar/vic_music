import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { submitinfo, getallmusic } from "./controller.js"
import { upload } from "./middleware/upload.js";

const router = express.Router()

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//Middleware to serve the api page
router.get("/music", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'addapi.html'));
});

// Route to submit data to the db
router.post('/savemusic', upload.fields([ { name: 'image', maxCount: 1 },  { name: 'audio', maxCount: 1 }]), submitinfo )


//Route to get all the saved music
router.post("/getallmusic", getallmusic)




export default router
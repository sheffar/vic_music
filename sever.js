import express from "express"
import dotenv from "dotenv"
import route from "./route.js"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from 'url';



const app = express();
dotenv.config()



const port = process.env.PORT || 4000;


// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Body parser middleware to handle form submissions

// Increase the payload size limit to 10MB
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

 
// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));
 
// Serve index.html on the base route
app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
 

  
// Route
app.use('/', route); 
 



const startsever = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URI)  
        .then(() => {
            console.log("Connected to MongoDB!");
        });

        app.listen(port, () => {
            console.log(`app  listening on ${port}`);
         })
    } catch (e) {
        console.log(e.message + "Error connecting to Database")
    }   
}    
startsever()      
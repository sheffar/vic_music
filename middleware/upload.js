import path from 'path'
import multer from "multer"


// Configure multer for file storage
const filestorageengine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../uploads") // the /uplaods is there the uploaded files will be stored
        
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}--${file.originalname}`);
    }
});

export const upload = multer({
    storage: filestorageengine,
    limits: { fileSize: 10000000 }, // Limit files to 10MB each
});
































 // fileFilter: (req, file, cb) => {
    //     checkFileType(file, cb);
    // }
















// Check file type function
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|mp3|wav/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images and audio files only!');
    }
}
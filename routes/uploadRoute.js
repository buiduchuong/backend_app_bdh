
const uploadRouter = require('express').Router();

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        // cb(null, Date.now() + path.extname(file.originalname))
        cb(null, file.originalname)
    },
})
const upload = multer({ storage: storage });
uploadRouter.post('/post', upload.single('image'), (req, res) => {
    res.send("Image Uploaded")
})

module.exports = uploadRouter;



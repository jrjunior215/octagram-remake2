const Post = require('../../../models/Post');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: './img/post',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = async (req, res) => {
    const middleware = upload.array('images');
    middleware(req, res, async (err) => {
        if (err) {
            console.error('Error uploading files:', err);
            return res.status(500).json({ error: 'File upload failed' });
        }

        const images = req.files;

        if (!images || images.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        try {
            // Process the uploaded images here
            // For example, you can save the file paths to your database

            const imagePaths = images.map(image => `/img/post/${image.filename}`);
            // Assuming you have a Post model and a function to save it
            await Post.create({ images: imagePaths, ...req.body });

            return res.status(200).json({ message: 'Images uploaded successfully' });
        } catch (error) {
            console.error('Error processing images:', error);
            return res.status(500).json({ error: 'Image processing failed' });
        }
    });
}
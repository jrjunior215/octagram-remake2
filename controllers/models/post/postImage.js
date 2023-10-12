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
        const image = req.files; 
        const data = req.body;

        if (data.permission.includes('ALL')) {
            data.permission = ['ALL'];
        } else {
            data.permission = data.permission;
        }

        if (!image || !image.length) { 
            await Post.text(data);
            res.redirect('/creator');
        } else {
            const postId = await Post.text(data);

            for (const img of image) {
                const imageUrl = `/img/post/${img.filename}`;
                await Post.image(postId, imageUrl);
            }

            res.redirect('/creator');
        }
        
    });
}
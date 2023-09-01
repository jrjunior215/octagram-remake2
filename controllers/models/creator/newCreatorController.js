const Creator = require('../../../models/Creator');
const User = require('../../../models/User');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './img/profile/creator',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = (req, res) => {

    const middleware = upload.single('image');
    middleware(req, res, async (err) => {
        const image = req.file;
        const data = req.body;
        const { id_user } = data;

        if (!image) {
            const imageUrl = `/img/creator_img.png`;
            await Creator.create(data, imageUrl);
            await User.creator(id_user);
            await User.relogin(id_user).then(async (result) => {
                req.session.userData = await result[0]
            })
            res.redirect('/creator')
        } else {
            const image = req.file.filename;
            const imageUrl = `/img/profile/creator/${image}`;
            await Creator.create(data, imageUrl);
            await User.creator(id_user);
            await User.relogin(id_user).then(async (result) => {
                req.session.userData = await result[0]
            })
            res.redirect('/creator');
        }

    });

}
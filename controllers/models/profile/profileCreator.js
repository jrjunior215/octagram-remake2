const Creator = require('../../../models/Creator');
const User = require('../../../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: './img/profile/creator',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = (req, res) => {
    try {
        const middleware = upload.single('image');
        middleware(req, res, async (err) => {
            const image = req.file;
            const data = req.body;
            const id_user = SESSION_USER.id
            const { id_creator, img: oldImageUrl } = data;

            if (!image) {
                await Creator.profiletext(data);
                await User.relogin(id_user).then(async (result) => {
                    req.session.userData = await result[0]
                })
                res.redirect('/setting/creator')
            } else {
                const image = req.file.filename;
                const imageUrl = `/img/profile/creator/${image}`;
                await Creator.profileImg(data, imageUrl);
                await User.relogin(id_user).then(async (result) => {
                    req.session.userData = await result[0]
                })
                if (oldImageUrl !== '/img/creator_img.png') {
                    const oldImagePath = path.join(__dirname, '..', '..', '..', oldImageUrl);
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error(`Error deleting old image: ${err}`);
                        }
                    });
                }
                res.redirect('/setting/creator')
            }
        });
    } catch (error) {
        res.redirect('/error');
    }
}

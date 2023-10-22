const User = require('../../../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: './img/profile/user',
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
            const { id_user, img: oldImageUrl } = data;

            if (!image) {
                await User.profiletext(data);
                await User.relogin(id_user).then(async (result) => {
                    req.session.userData = await result[0]
                })
                res.redirect('/admin/setting')
            } else {
                const image = req.file.filename;
                const imageUrl = `/img/profile/user/${image}`;
                await User.profileImg(data, imageUrl);
                await User.relogin(id_user).then(async (result) => {
                    req.session.userData = await result[0]
                })
                if (oldImageUrl !== '/img/profile.png') {
                    const oldImagePath = path.join(__dirname, '..', '..', '..', oldImageUrl);
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error(`Error deleting old image: ${err}`);
                        }
                    });
                }
                res.redirect('/admin/setting')
            }
        });
    } catch (error) {
        res.redirect('/error');
    }
}

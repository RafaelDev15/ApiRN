const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = extname(file.originalname);
            const name = basename(file.originalname, ext);

            cb(null, `${name}-${Date.now()}${ext}`)
        }
        })
}
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename(req, files, cb) {
    cb(null, `${Date.now()}-${files.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;

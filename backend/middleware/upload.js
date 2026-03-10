const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads", // ensure this folder exists on Render
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filenames
  },
});

const upload = multer({ storage });

module.exports = upload;

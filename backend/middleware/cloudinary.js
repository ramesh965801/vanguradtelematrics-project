const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dp6gkcxya",
  api_key: "974792515371792",
  api_secret: "wI1qs4lxKLTp7ajNbr9aNphkMfs",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "vanguard-products",
    allowed_formats: ["jpg", "png", "jpeg","webp"],
  },
});

module.exports = multer({ storage });

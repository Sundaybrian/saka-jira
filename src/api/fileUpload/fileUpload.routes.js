const Role = require("../../constants/roles");
const router = require("express").Router();
const AuthService = require("../../services/auth.service");
const { Auth } = require("../../_middlewares/auth");
// const upload = require("../../utils/multer");
const multer = require("multer");
const { uploadFile } = require("../../utils/s3");

module.exports = router;

// helpers
const upload = multer({
    dest: __dirname + "/uploads",
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("please upload an image"));
        }

        cb(undefined, true);
    },
});

router.post("/avatar", upload.single("avatar"), uploadAvatar);

// handlers
function uploadAvatar(req, res, next) {
    const file = req.file;

    // upload to s3
    uploadFile(file)
        .then((result) => res.json(result))
        .catch(next);
}

const Role = require("../../constants/roles");
const router = require("express").Router();
const AuthService = require("../../services/auth.service");
const { Auth } = require("../../_middlewares/auth");
// const upload = require("../../utils/multer");
const multer = require("multer");
const { uploadFile, getFileStream } = require("../../utils/s3");
const fs = require("fs");
const { promisify } = require("util");
const unlinkFile = promisify(fs.unlink);

module.exports = router;

// helpers
const upload = multer({
    dest: __dirname + "/uploads",
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|doc|docx|pdf)$/)) {
            return cb(new Error("please upload an image"));
        }

        cb(undefined, true);
    },
});

router.post("/avatar", upload.single("avatar"), uploadAvatar);
router.get("/avatar/:key", getAvatar);

// handlers
function uploadAvatar(req, res, next) {
    const file = req.file;

    let response;

    // upload to s3
    uploadFile(file)
        .then((result) => {
            response = result;
            // delete file from ec2
            return unlinkFile(file.path);
        })
        .then((_) => {
            const { Location, key } = response;
            res.json({
                image_url: `https://uradybackend.tech/api/v1/images/avatar/${key}`,
            });
        })
        .catch(next);
}

function getAvatar(req, res, next) {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
}

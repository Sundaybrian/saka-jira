const multer = require("multer");

// helpers
const upload = multer({
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

module.export = upload;

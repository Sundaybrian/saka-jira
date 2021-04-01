require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const { promisify } = require("util");
// const mongoose = require("mongoose");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

s3.uploadP = promisify(s3.upload);

// uploads single file to s3
function uploadFile(file) {
    // const imageID = new mongoose.Types.ObjectId();
    const fileStream = fs.createReadStream(file.path);

    console.log(file);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    };

    return s3.uploadP(uploadParams);
}

function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    };

    return s3.getObject(downloadParams).createReadStream();
}

module.exports = {
    uploadFile,
    getFileStream,
};

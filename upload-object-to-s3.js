import fs from "fs";
import AWS from "aws-sdk";
import * as dotenv from "dotenv";

dotenv.config();

//Connectiong to the specified user
const s3bucket = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
});

const uploadObjectToS3 = async (imageData, filePath) => {
  const uploadObjectParams = {
    Key: filePath,
    Body: imageData,
    Bucket: process.env.BUCKET_NAME,
  };

  try {
    await s3bucket.putObject(uploadObjectParams).promise();

    // Put your onSuccess logic here
  } catch (error) {
    // Put your onError logic here
  }
};

// the local pathanme of the current image (You can also pass base64 format)
const sampleImagePathname = "sample-image.png";

// Bucket directory of the image after the upload
const filePath = `random-folder/my-uplaoded-image.png`;


// Reading local image as buffer
const sampleImageAsBuffer = fs.readFileSync(sampleImagePathname);

uploadObjectToS3(sampleImageAsBuffer, filePath);

import { Media } from '../models/media.model.js';
import ApiResponse from '../utils/apiResponse.js';
import AsyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import { generatePresignedUrl, uploadFileToS3 } from '../utils/awsS3.js';
import path from 'path';
import { AWS_BUCKET_NAME } from '../constants.js';

const mediaUploader = AsyncHandler(async(req, res)=>{
    
    const user = req.user[0];
    if(!user) throw new ApiError(401, 'User not found.');
    const {title, } = req.body;

    // upload files
    if(req.file){
      const fileName = path.join('uploads', req.file?.filename);
      const bucketName = `${AWS_BUCKET_NAME}/attachments`;
      const s3Key = path.basename(fileName); 
      // console.log("check bucket name", bucketName, fileName, s3Key);
      try{
          const upload = uploadFileToS3(fileName, bucketName, s3Key);
          console.log("log upload",fileName, bucketName, s3Key, upload);
      }
      catch(err){
        throw new ApiError(500, 'File Upload Error at server.');
      }
    }

    console.log("check userid", user._id);
    const media = await Media.create({
      title: title || "Untitled",
      attachment: req.file ? `attachments/${req.file?.filename}` : [],
      createdBy: user._id,
      createdAt: new Date()
    });

    // console.log("check media", media);

    const createdMedia = await Media.findById(media._id);

    if(!createdMedia) throw new ApiError(500, "Something went wrong.");
    return res.json(new ApiResponse(201, {mediaData: createdMedia}, "Media has been uploaded succesfully."))
});

const getUrl = async(fileName) => {
  const attachment = fileName || '1741808457608-ObserverDesignPattern.png' ;
  try {
    const bucketName = `${AWS_BUCKET_NAME}/attachments`;
    const s3Key = path.basename(attachment);
    const generatedUrl = await generatePresignedUrl(bucketName, s3Key);
    // console.log("check url", bucketName, s3Key, generatedUrl)
    return generatedUrl;
  
  } catch (err) {
    console.error(`Error generating presigned URL for ${attachment}:`, err);
  }
    
}

const getMedia = AsyncHandler(async(req, res)=>{
    
    const user = req.user[0];
    if(!user) throw new ApiError(401, 'User not found.');
    const getAllMedia = await Media.find({createdBy: user._id}).lean();
    const mediaDataWithUrl = await Promise.all(
      getAllMedia?.map(async (data) => ({
        ...data,
        mediaUrl: await getUrl(data.attachment)
      }))
    );
    // console.log("check url", mediaDataWithUrl);
    return res
          .status(200)
          .send(mediaDataWithUrl);
    
});

export {mediaUploader, getMedia};
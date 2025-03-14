import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        console.log("check file type", file.mimetype)
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg' || file.mimetype === 'image/heif' || file.mimetype === 'image/heic' || file.mimetype ==="video/mp4" || file.mimetype ==="video/webm" || file.mimetype ==="video/wmv" || file.mimetype ==="video/mov" || file.mimetype ==="video/mkv" || file.mimetype ==="video/avi") {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type'));
        }
    },
})
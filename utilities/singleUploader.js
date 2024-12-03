const multer = require("multer");

function uploader(subfolder_path, allowed_file_types, max_file_size, error_message) {
    //make upload object
    const UPLODAER_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`
    //define the storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLODAER_FOLDER)
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const filename = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
            cb(null, filename + fileExt)
        }
    })
    //prepare the final multer object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true)
            } else (
                cb(createError(error_message))
            )
        }
    })
    return upload;
}
module, exports = uploader;
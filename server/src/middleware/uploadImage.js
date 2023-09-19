const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/')
    }
    , filename: (req, file, cb) => {
        const originName = file.originalname?.replace(/ /, () => "_")
        const filename = `${originName}${Date.now()}.jpg`
        cb(null, filename)
    }
})

exports.upload = (upload) => {
    return multer({ storage }).single(upload)
}
const express = require('express');
const { addcategory, getCategory, updateCategories, deletecategories } = require('../controller/category');
const { requireSignin } = require('../common-middleware/index');
const {adminMiddleware} = require('../common-middleware/index')
const router = express.Router()

const multer=require('multer')
const path=require('path')

const shortid=require('shortid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate()+' -'+ file.originalname )
    }
  })
  const upload=multer({storage})
router.post("/category/create",requireSignin,adminMiddleware,upload.single('categoryImage'),addcategory )
router.get("/category/getcategory",getCategory )
router.post("/category/update",upload.array('categoryImage'),updateCategories )
router.post("/category/delete",deletecategories )
module.exports = router;

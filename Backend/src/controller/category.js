const Category = require('../models/category')
const slugify = require('slugify')
const shortid=require('shortid')
function createCategories(categories,parentId=null){
const categoryList=[]
let category
if(parentId==null){
  category = categories.filter(cat=>cat.parentId==undefined)
}else{
    category=categories.filter(cat=>cat.parentId==parentId)
}
for(let cate of category){
    categoryList.push({
        _id:cate._id,
        name:cate.name,
        slug:cate.slug,
        type:cate.type,
        parentId:cate.parentId,
        children: createCategories(categories,cate._id)
    })
}
 return categoryList
}


exports.addcategory=(req, resp) => {
  
    
    const categoryobj = {
        name: req.body.name,
        
        slug: `${slugify(req.body.name)}-${shortid.generate()}`
       
    }

    if(req.file){
        
        categoryobj.categoryImage = '/public/' + req.file.filename
            }
    if (req.body.parentId) {
        categoryobj.parentId = req.body.parentId
    }
    const cat = new Category(categoryobj)
    cat.save((error, category) => {
        if (error) {
            console.log(error)
            return resp.status(400).json({ error });
        }
        if (category) {
            return resp.status(201).json({ category })
        }
    })

}
exports.getCategory=(req,resp)=>{
    Category.find({})
    .exec((error,categories)=>{
        if (error) {
            console.log(error)
            return resp.status(400).json({ error });
        }
        if(categories){
            const categoryList=createCategories(categories)
            return resp.status(200).json({categoryList})
        }
    })
}

exports.updateCategories=async(req,resp)=>{
       const {_id,name,parentId,type}=req.body;
       const updatedCategories=[]
       if(name instanceof Array){
        for(let i=0;i<name.length;i++){
            const category={
                name:name[i],
                type:type[i]
            }
            if(parentId[i]!==""){
                category.parentId=parentId[i]
            }
            const updatedCategory=await Category.findOneAndUpdate({_id:_id[i]},category,{new:true})
            updatedCategories.push(updatedCategory)
            
        }
        return resp.status(201).json({updatedCategories})

       }else{
            const category={
                name,
                type
            }
            if(parentId!==""){
                category.parentId=parentId
            }
            const updatedCategory=await Category.findOneAndUpdate({_id},category,{new:true})
            resp.status(200).json({updatedCategory})
        }


    
}
exports.deletecategories=async(req,res)=>{
    const {ids}=req.body.payload;
    const deletedCategories=[]
    for(let i=0;i<ids.length;i++){
        const deleteCategory=await Category.findOneAndDelete({_id:ids[i]._id})
        deletedCategories.push(deleteCategory)
    }
    
    if(deletedCategories.length==ids.length){
        res.status(200).json({message:'Categories Removed'})
    }
    else{
        res.status(400).json({message:"something went wrong"})
    }
}
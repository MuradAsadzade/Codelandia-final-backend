const categoryService=require("../services/category-service.js");

const getAllCategories=async (req,res)=>{
    let result=await categoryService.getAllCategories();
    res.json(result);
};

const getCategoryById=async (req,res)=>{
    let result=await categoryService.getCategoryById(req.params.id);
    res.json(result);
}


const addCategory=async (req,res)=>{
    const result=await categoryService.addCategory(req.body);
    res.json(result);
}

const deleteCategory=async (req,res)=>{
    const result=await categoryService.deleteCategory(req.params.id);
    res.json(result);
}

const updateCategory=async(req,res)=>{
    const result=await categoryService.updateCategory(req.params.id,req.body);
    
    res.json(result);
}

const updateCategoryName=async(req,res)=>{
    const result=await categoryService.updateCategoryName(req.params.id,req.body.name);
    res.json(result);

}

const updateCategoryDescription=async(req,res)=>{
    const result=await categoryService.updateCategoryDescription(req.params.id,req.body.description);
    res.json(result);

}




module.exports={
    getAllCategories,
    addCategory,
    getCategoryById,
    deleteCategory,
    updateCategory,
    updateCategoryName,
    updateCategoryDescription
}

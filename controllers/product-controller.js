const productService=require("../services/product-service.js");

const getAllProducts=async (req,res)=>{
    let result=await productService.getAllProducts();
    res.json(result);
};

const getProductById=async (req,res)=>{
    let result=await productService.getProductById(req.params.id);
    res.json(result);
}


const addProduct=async (req,res)=>{
    const result=await productService.addProduct(req.body);
    res.json(result);
}

const deleteProduct=async (req,res)=>{
    const result=await productService.deleteProduct(req.params.id);
    res.json(result);
}

const updateProduct=async(req,res)=>{
    const result=await productService.updateProduct(req.params.id,req.body);
    
    res.json(result);
}

const updateProductName=async(req,res)=>{
    const result=await productService.updateCategoryName(req.params.id,req.body.name);
    res.json(result);

}

const updateProductDescription=async(req,res)=>{
    const result=await productService.updateCategoryDescription(req.params.id,req.body.description);
    res.json(result);

}
const updateProductPrice=async(req,res)=>{
    const result=await productService.updateProductPrice(req.params.id,req.body.price);
    res.json(result);
}

module.exports={
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,
    updateProductName,
    updateProductDescription,
    updateProductPrice
}

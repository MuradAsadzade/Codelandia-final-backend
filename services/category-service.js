const Category=require("../models/category/category.js");
const pool=require("../config/db.js");
const {ErrorResult,SuccessResult,EmptyResult}=require("../utils/results.js")


const getAllCategories=async ()=>{
    let result=await pool.query("SELECT * FROM categories where categories.deleted=0 ORDER BY id");
    // result=Category.MapAll(result.rows);
    if(result.length==0){
        return new SuccessResult(null,"No category found")
    }
    return new SuccessResult(result.rows,"All Categories displayed");
}

const getCategoryById=async (id)=>{
    let result=await pool.query("SELECT * FROM categories where categories.id=$1",[id]);
    result=Category.MapOne(result.rows[0]);
    if(result.name==undefined){
        return new SuccessResult(null,`Category with this id:${id} was not found`);
    }
    return new SuccessResult(result,"Category was found");
}


const addCategory=async (category)=>{
    try {
        
        let result=await pool.query("INSERT INTO categories(name,description) VALUES($1,$2)",[
            category.name,
            category.description
        ]);
        console.log(result);
        
        let new_category=Category.MapOne(category);
        
        return new SuccessResult(new_category,"Category created successfully");
    } catch (error) {
        return new ErrorResult(null,"This category is already available");
    }
}

const deleteCategory=async (id)=>{
    
    let res=await pool.query("UPDATE categories SET deleted=$1 WHERE id=$1 returning *" ,[id]);
  
    if (res.rows.length === 0) {
        return new ErrorResult(null, "Category not found");
    }
    return new SuccessResult(res.rows[0],"Category deleted");
}

const updateCategory=async (id,category)=>{
    
    let res = await pool.query('UPDATE categories SET name=$1, description=$2 WHERE id=$3 AND deleted=0 returning *', [category.name, category.description, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Category was not found")
    }
    let result=Category.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Category updated");
}

const updateCategoryName=async (id,name)=>{
    
    let res = await pool.query('UPDATE categories SET name=$1 WHERE id=$2 AND deleted=0 returning *', [name, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Category was not found")
    }
    let result=Category.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Category updated");
}

const updateCategoryDescription=async (id,description)=>{
    
    let res = await pool.query('UPDATE categories SET description=$1 WHERE id=$2 AND deleted=0 returning *', [description, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Category was not found")
    }
    let result=Category.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Category updated");
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
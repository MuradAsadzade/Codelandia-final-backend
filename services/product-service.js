const Product=require("../models/product/product.js");
const pool=require("../config/db.js");
const {ErrorResult,SuccessResult,EmptyResult}=require("../utils/results.js")


const getAllProducts=async ()=>{
    let result=await pool.query("SELECT * FROM products where products.deleted=0 ORDER BY id");
    result=Product.MapAll(result.rows);
    if(result.length==0){
        return new SuccessResult(null,"No products found")
    }
    return new SuccessResult(result,"All products displayed");
}

const getProductById=async (id)=>{
    let result=await pool.query("SELECT * FROM products where products.id=$1",[id]);
    result=Product.MapOne(result.rows[0]);
    if(result.name==undefined){
        return new SuccessResult(null,`Product with this id:${id} was not found`);
    }
    return new SuccessResult(result,"Product was found");
}


const addProduct=async (product)=>{
    try {
        
        let result=await pool.query("INSERT INTO products(name,description,price,stock_quantity,category_id) VALUES($1,$2,$3,$4,$5)",[
            product.name,
            product.description,
            product.price,
            product.stock_quantity,
            product.category_id
        ]);
        console.log(result);
        
        let new_product=Product.MapOne(product);
        
        return new SuccessResult(new_product,"Product created successfully");
    } catch (error) {
        return new ErrorResult(null,"This product is already available");
    }
}

const deleteProduct=async (id)=>{
    
    let res=await pool.query("UPDATE products SET deleted=$1 WHERE id=$1 returning *" ,[id]);
    let result=Product.MapOne(res.rows[0]);
    // console.log(result);
    if(result.name==undefined){
        return new ErrorResult(null,"Product not found")
    };

    return new SuccessResult(result,"Product deleted");
}

const updateProduct=async (id,product)=>{
    
    let res = await pool.query('UPDATE products SET name=$1, description=$2,price=$3,stock_quantity=$4,category_id=$5  WHERE id=$6 AND deleted=0 returning *', [product.name, product.description,product.price,product.stock_quantity,product.category_id, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Product was not found")
    }
    let result=Product.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Product updated");
}

const updateProductName=async (id,name)=>{
    
    let res = await pool.query('UPDATE products SET name=$1 WHERE id=$2 AND deleted=0 returning *', [name, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"product was not found")
    }
    let result=product.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"product updated");
}

const updateProductDescription=async (id,description)=>{
    
    let res = await pool.query('UPDATE categories SET description=$1 WHERE id=$2 AND deleted=0 returning *', [description, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"product was not found")
    }
    let result=Product.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"product updated");
}
const updateProductPrice=async (id,price)=>{
    
    let res = await pool.query('UPDATE products SET price=$1 WHERE id=$2 AND deleted=0 returning *', [price, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"product was not found")
    }
    let result=Product.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"product updated");
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
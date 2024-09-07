const OrderItem=require("../models/order_item/order_item.js");
const pool=require("../config/db.js");
const {ErrorResult,SuccessResult,EmptyResult}=require("../utils/results.js")


const getAllOrderItems=async ()=>{
    let result=await pool.query("SELECT * FROM order_items where deleted=0");
    result=OrderItem.MapAll(result.rows);
    if(result.length==0){
        return new SuccessResult(null,"No OrderItem found")
    }
    return new SuccessResult(result,"All OrderItems displayed");
}

const getOrderItemById=async (id)=>{
    let result=await pool.query("SELECT * FROM order_items where id=$1",[id]);
    result=OrderItem.MapOne(result.rows[0]);
    // console.log(result);
    
    if(result.user_id==undefined){
        return new SuccessResult(null,`OrderItem with this id:${id} was not found`);
    }
    return new SuccessResult(result,"OrderItem was found");
}


const addOrderItem=async (orderitem)=>{
    try {
        
        let result=await pool.query("INSERT INTO order_items(order_id,product_id,quantity,price) VALUES($1,$2,$3,$4)",[
            orderitem.order_id,
            orderitem.product_id,
            orderitem.quantity,
            orderitem.price
        ]);
        console.log(result);
        
        let new_OrderItem=OrderItem.MapOne(orderitem);
        
        return new SuccessResult(new_OrderItem,"OrderItem created successfully");
    } catch (error) {
        console.log(error);
        
        return new ErrorResult(null,"This orderItem is already available");
    }
}

const deleteOrderItem=async (id)=>{
    
    let res=await pool.query("UPDATE order_items SET deleted=$1 WHERE id=$1 returning *" ,[id]);
    let result=OrderItem.MapOne(res.rows[0]);
    if(result.name==undefined){
        return new ErrorResult(null,"OrderItem not found")
    };
    return new SuccessResult(result,"OrderItem deleted");
}

const updateOrderItem=async (id,orderitem)=>{
    
    let res = await pool.query('UPDATE order_items SET order_id=$1, product_id=$2,quantity=$3,price=$4 WHERE id=$5 AND deleted=0 returning *', [orderitem.order_id,orderitem.product_id,orderitem.quantity,orderitem.price, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"OrderItem was not found")
    }
    let result=OrderItem.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"OrderItem updated");
}

const updateOrderItemOrderId=async (id,order_id)=>{
    
    let res = await pool.query('UPDATE order_items SET order_id=$1 WHERE id=$2 AND deleted=0 returning *', [order_id, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"Order was not found")
    }
    let result=OrderItem.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"Order updated");
}

const updateOrderItemProductId=async (id,product_id)=>{
    
    let res = await pool.query('UPDATE order_items SET product_id=$1 WHERE id=$2 AND deleted=0 returning *', [product_id, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"OrderItem was not found")
    }
    let result=OrderItem.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"OrderItem updated");
}

const updateOrderItemQuantity=async (id,quantity)=>{
    
    let res = await pool.query('UPDATE order_items SET quantity=$1 WHERE id=$2 AND deleted=0 returning *', [quantity, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"OrderItem was not found")
    }
    let result=OrderItem.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"OrderItem updated");
}

const updateOrderItemPrice=async (id,price)=>{
    
    let res = await pool.query('UPDATE order_items SET price=$1 WHERE id=$2 AND deleted=0 returning *', [price, id]);
    
    if(res.rows[0]==undefined){
        return new ErrorResult(null,"OrderItem was not found")
    }
    let result=OrderItem.MapOne(res.rows[0]);
    
    return new SuccessResult(result,"OrderItem updated");
}



module.exports={
    getAllOrderItems,
    getOrderItemById,
    addOrderItem,
    deleteOrderItem,
    updateOrderItem,
    updateOrderItemOrderId,
    updateOrderItemPrice,
    updateOrderItemProductId,
    updateOrderItemQuantity
}
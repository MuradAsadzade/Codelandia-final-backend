const OrderItemService=require("../services/order_items-service.js");

const getAllOrderItems=async (req,res)=>{
    let result=await OrderItemService.getAllOrderItems();
    res.json(result);
};

const getOrderItemById=async (req,res)=>{
    let result=await OrderItemService.getOrderItemById(req.params.id);
    res.json(result);
}


const addOrderItem=async (req,res)=>{
    const result=await OrderItemService.addOrderItem(req.body);
    res.json(result);
}

const deleteOrderItem=async (req,res)=>{
    const result=await OrderItemService.deleteOrderItem(req.params.id);
    res.json(result);
}

const updateOrderItem=async(req,res)=>{
    const result=await OrderItemService.updateOrderItem(req.params.id,req.body);
    
    res.json(result);
}

const updateOrderItemOrderId=async(req,res)=>{
    const result=await OrderItemService.updateOrderItemOrderId(req.params.id,req.body.order_id);
    res.json(result);

}

const updateOrderItemProductId=async(req,res)=>{
    const result=await OrderItemService.updateOrderItemProductId(req.params.id,req.body.product_id);
    res.json(result);

}

const updateOrderItemQuantity=async(req,res)=>{
    const result=await OrderItemService.updateOrderItemQuantity(req.params.id,req.body.quantity);
    res.json(result);

}

const updateOrderItemPrice=async(req,res)=>{
    const result=await OrderItemService.updateOrderItemPrice(req.params.id,req.body.price);
    res.json(result);

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

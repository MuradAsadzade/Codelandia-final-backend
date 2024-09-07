const orderService=require("../services/order-service.js");

const getAllOrders=async (req,res)=>{
    let result=await orderService.getAllOrders();
    res.json(result);
};

const getOrderById=async (req,res)=>{
    let result=await orderService.getOrderById(req.params.id);
    res.json(result);
}


const addOrder=async (req,res)=>{
    const result=await orderService.addOrder(req.body);
    res.json(result);
}

const deleteOrder=async (req,res)=>{
    const result=await orderService.deleteOrder(req.params.id);
    res.json(result);
}

const updateOrder=async(req,res)=>{
    const result=await orderService.updateOrder(req.params.id,req.body);
    
    res.json(result);
}

const updateOrderUserId=async(req,res)=>{
    const result=await orderService.updateOrderUserId(req.params.id,req.body.user_id);
    res.json(result);

}

const updateOrderTotalAmount=async(req,res)=>{
    const result=await orderService.updateOrderTotalAmount(req.params.id,req.body.total_amount);
    res.json(result);

}

const updateOrderStatus=async(req,res)=>{
    const result=await orderService.updateOrderStatus(req.params.id,req.body.status);
    res.json(result);

}




module.exports={
    getAllOrders,
    getOrderById,
    addOrder,
    deleteOrder,
    updateOrder,
    updateOrderUserId,
    updateOrderTotalAmount,
    updateOrderStatus
}

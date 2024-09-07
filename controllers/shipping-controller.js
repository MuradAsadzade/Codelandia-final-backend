const shippingService=require("../services/shipping-service.js");

const getAllShippings=async (req,res)=>{
    let result=await shippingService.getAllShippings();
    res.json(result);
};

const getShippingById=async (req,res)=>{
    let result=await shippingService.getShippingById(req.params.id);
    res.json(result);
}


const addShipping=async (req,res)=>{
    const result=await shippingService.addShipping(req.body);
    res.json(result);
}

const deleteShipping=async (req,res)=>{
    const result=await shippingService.deleteShipping(req.params.id);
    res.json(result);
}

const updateShipping=async(req,res)=>{
    const result=await shippingService.updateShipping(req.params.id,req.body);
    
    res.json(result);
}

const updateShippingOrderId=async(req,res)=>{
    const result=await shippingService.updateShippingOrderId(req.params.id,req.body.order_id);
    res.json(result);

}
const updateShippingAddress=async(req,res)=>{
    const result=await shippingService.updateShippingAddress(req.params.id,req.body.shipping_address);
    res.json(result);

}

const updateShippingMethod=async(req,res)=>{
    const result=await shippingService.updateShippingMethod(req.params.id,req.body.shipping_method);
    res.json(result);

}

const updateShippingStatus=async(req,res)=>{
    const result=await shippingService.updateShippingStatus(req.params.id,req.body.shipping_status);
    res.json(result);

}

const updateShippingDate=async(req,res)=>{
    const result=await shippingService.updateShippingDate(req.params.id,req.body.shipping_date);
    res.json(result);

}




module.exports={
    getAllShippings,
    getShippingById,
    addShipping,
    deleteShipping,
    updateShipping,
    updateShippingOrderId,
    updateShippingAddress,
    updateShippingMethod,
    updateShippingStatus,
    updateShippingDate,
}

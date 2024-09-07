const paymentService=require("../services/payment-service.js");

const getAllPayments=async (req,res)=>{
    let result=await paymentService.getAllPayments();
    res.json(result);
};

const getPaymentById=async (req,res)=>{
    let result=await paymentService.getPaymentById(req.params.id);
    res.json(result);
}


const addPayment=async (req,res)=>{
    const result=await paymentService.addPayment(req.body);
    res.json(result);
}

const deletePayment=async (req,res)=>{
    const result=await paymentService.deletePayment(req.params.id);
    res.json(result);
}

const updatePayment=async(req,res)=>{
    const result=await paymentService.updatePayment(req.params.id,req.body);
    
    res.json(result);
}

const updatePaymentOrderId=async(req,res)=>{
    const result=await paymentService.updatePaymentOrderId(req.params.id,req.body.order_id);
    res.json(result);

}

const updatePaymentMethod=async(req,res)=>{
    const result=await paymentService.updatePaymentMethod(req.params.id,req.body.payment_method);
    res.json(result);

}

const updatePaymentStatus=async(req,res)=>{
    const result=await paymentService.updatePaymentStatus(req.params.id,req.body.payment_status);
    res.json(result);

}

const updatePaymentDate=async(req,res)=>{
    const result=await paymentService.updatePaymentDate(req.params.id,req.body.payment_date);
    res.json(result);

}




module.exports={
    getAllPayments,
    getPaymentById,
    addPayment,
    deletePayment,
    updatePayment,
    updatePaymentDate,
    updatePaymentMethod,
    updatePaymentOrderId,
    updatePaymentStatus
}

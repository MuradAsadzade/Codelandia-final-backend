const CartItemService=require("../services/cart_items-service.js");

const getAllCartItems=async (req,res)=>{
    let result=await CartItemService.getAllCartItems();
    res.json(result);
};

const getCartItemById=async (req,res)=>{
    let result=await CartItemService.getCartItemById(req.params.id);
    res.json(result);
}


const addCartItem=async (req,res)=>{
    const result=await CartItemService.addCartItem(req.body);
    res.json(result);
}

const deleteCartItem=async (req,res)=>{
    const result=await CartItemService.deleteCartItem(req.params.id);
    res.json(result);
}

const updateCartItem=async(req,res)=>{
    const result=await CartItemService.updateCartItem(req.params.id,req.body);
    
    res.json(result);
}

const updateCartItemUserId=async(req,res)=>{
    const result=await CartItemService.updateCartItemUserId(req.params.id,req.body.user_id);
    res.json(result);

}

const updateCartItemProductId=async(req,res)=>{
    const result=await CartItemService.updateCartItemProductId(req.params.id,req.body.product_id);
    res.json(result);

}

const updateCartItemQuantity=async(req,res)=>{
    const result=await CartItemService.updateCartItemQuantity(req.params.id,req.body.quantity);
    res.json(result);

}



module.exports={
    getAllCartItems,
    getCartItemById,
    addCartItem,
    deleteCartItem,
    updateCartItem,
    updateCartItemUserId,
    updateCartItemProductId,
    updateCartItemQuantity
}

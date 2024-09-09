const CartItem = require("../models/cart_item/cart_item.js");
const pool = require("../config/db.js");
const { ErrorResult, SuccessResult, EmptyResult } = require("../utils/results.js")


const getAllCartItems = async () => {
    let result = await pool.query("SELECT * FROM cart_items where deleted=0 ORDER BY id");
    result = CartItem.MapAll(result.rows);
    if (result.length == 0) {
        return new SuccessResult(null, "No CartItem found")
    }
    return new SuccessResult(result, "All CartItem displayed");
}

const getCartItemById = async (id) => {
    let result = await pool.query("SELECT * FROM cart_items where id=$1", [id]);
    result = CartItem.MapOne(result.rows[0]);
    // console.log(result);

    if (result.user_id == undefined) {
        return new SuccessResult(null, `CartItem with this id:${id} was not found`);
    }
    return new SuccessResult(result, "CartItem was found");
}


const addCartItem = async (cartItem) => {
    try {

        let result = await pool.query("INSERT INTO cart_items(user_id,product_id,quantity) VALUES($1,$2,$3)", [
            cartItem.user_id,
            cartItem.product_id,
            cartItem.quantity

        ]);
        console.log(result);

        let new_CartItem = CartItem.MapOne(cartItem);
        return new SuccessResult(new_CartItem, "CartItem created successfully");
    } catch (error) {
        console.log(error);

        return new ErrorResult(null, "This CartItem is already available");
    }
}

const deleteCartItem = async (id) => {

    let res = await pool.query("UPDATE cart_items SET deleted=$1 WHERE id=$1 returning *", [id]);
    let result = CartItem.MapOne(res.rows[0]);
    if (result.user_id == undefined) {
        return new ErrorResult(null, "CartItem not found")
    };
    return new SuccessResult(result, "CartItem deleted");
}

const updateCartItem = async (id, cartItem) => {
    try {
        let res = await pool.query(
            'UPDATE cart_items SET user_id=$1, product_id=$2, quantity=$3 WHERE id=$4 AND deleted=0 RETURNING *',
            [cartItem.user_id, cartItem.product_id, cartItem.quantity, id]
        );

        // If no rows were returned, the item wasn't found or wasn't updated due to the condition
        if (!res.rows.length) {
            return new ErrorResult(null, "CartItem was not found or could not be updated");
        }

        // Map the updated cart item
        let result = CartItem.MapOne(res.rows[0]);

        return new SuccessResult(result, "CartItem updated successfully");
    } catch (error) {
        // Handle any other errors that might occur during the query
        console.error("Error updating cart item:", error);
        return new ErrorResult(null, "An error occurred while updating the cart item");
    }
};


const updateCartItemUserId = async (id, user_id) => {

    let res = await pool.query('UPDATE cart_items SET user_id=$1 WHERE id=$2 AND deleted=0 returning *', [user_id, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Order was not found")
    }
    let result = CartItem.MapOne(res.rows[0]);

    return new SuccessResult(result, "Order updated");
}

const updateCartItemProductId = async (id, product_id) => {

    let res = await pool.query('UPDATE cart_items SET product_id=$1 WHERE id=$2 AND deleted=0 returning *', [product_id, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "CartItem was not found")
    }
    let result = CartItem.MapOne(res.rows[0]);

    return new SuccessResult(result, "CartItem updated");
}

const updateCartItemQuantity = async (id, quantity) => {

    let res = await pool.query('UPDATE cart_items SET quantity=$1 WHERE id=$2 AND deleted=0 returning *', [quantity, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "CartItem was not found")
    }
    let result = CartItem.MapOne(res.rows[0]);

    return new SuccessResult(result, "CartItem updated");
}





module.exports = {
    getAllCartItems,
    getCartItemById,
    addCartItem,
    deleteCartItem,
    updateCartItem,
    updateCartItemUserId,
    updateCartItemProductId,
    updateCartItemQuantity
}
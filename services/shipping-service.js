const Shipping = require("../models/shipping/shipping.js");
const pool = require("../config/db.js");
const { ErrorResult, SuccessResult, EmptyResult } = require("../utils/results.js")


const getAllShippings = async () => {
    let result = await pool.query("SELECT * FROM shippings where deleted=0");
    result = Shipping.MapAll(result.rows);
    if (result.length == 0) {
        return new SuccessResult(null, "No Shipping found")
    }
    return new SuccessResult(result, "All Shipping displayed");
}

const getShippingById = async (id) => {
    let result = await pool.query("SELECT * FROM shippings where id=$1", [id]);
    result = Shipping.MapOne(result.rows[0]);
    // console.log(result);

    if (result.order_id == undefined) {
        return new SuccessResult(null, `Shipping with this id:${id} was not found`);
    }
    return new SuccessResult(result, "Shipping was found");
}


const addShipping = async (shipping) => {
    try {

        let result = await pool.query("INSERT INTO shippings(order_id,shipping_address,shipping_method,shipping_status,shipping_date) VALUES($1,$2,$3,$4,$5)", [
            shipping.order_id,
            shipping.shipping_address,
            shipping.shipping_method,
            shipping.shipping_status,
            shipping.shipping_date

        ]);
        console.log(result);

        let new_Shipping = Shipping.MapOne(shipping);
        return new SuccessResult(new_Shipping, "Shipping created successfully");
    } catch (error) {
        console.log(error);

        return new ErrorResult(null, "This Shipping is already available");
    }
}

const deleteShipping = async (id) => {

    let res = await pool.query("UPDATE shippings SET deleted=$1 WHERE id=$1 returning *", [id]);
    let result = Shipping.MapOne(res.rows[0]);
    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Shipping not found")
    };
    return new SuccessResult(result, "Shipping deleted");
}

const updateShipping = async (id, shipping) => {

    let res = await pool.query('UPDATE shippings SET order_id=$1, shipping_address=$2,shipping_method=$3,shipping_status=$4,shipping_date=$5 WHERE id=$6 AND deleted=0 returning *', [shipping.order_id, shipping.shipping_address,shipping.shipping_method,shipping.shipping_status,shipping.shipping_date, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Shipping was not found")
    }
    let result = Shipping.MapOne(res.rows[0]);

    return new SuccessResult(result, "Shipping updated");
}

const updateShippingOrderId = async (id, order_id) => {

    let res = await pool.query('UPDATE shippings SET order_id=$1 WHERE id=$2 AND deleted=0 returning *', [order_id, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Shipping was not found")
    }
    let result = Shipping.MapOne(res.rows[0]);

    return new SuccessResult(result, "Shipping updated");
}

const updateShippingAddress = async (id, address) => {

    let res = await pool.query('UPDATE shippings SET shipping_address=$1 WHERE id=$2 AND deleted=0 returning *', [shipping_address, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Shipping was not found")
    }
    let result = Shipping.MapOne(res.rows[0]);

    return new SuccessResult(result, "Shipping updated");
}

const updateShippingMethod = async (id, shipping_method) => {

    let res = await pool.query('UPDATE shippings SET shipping_method=$1 WHERE id=$2 AND deleted=0 returning *', [shipping_method, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Shipping was not found")
    }
    let result = Shipping.MapOne(res.rows[0]);

    return new SuccessResult(result, "Shipping updated");
}

const updateShippingStatus = async (id, shipping_status) => {

    let res = await pool.query('UPDATE shippings SET shipping_status=$1 WHERE id=$2 AND deleted=0 returning *', [shipping_status, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Shipping was not found")
    }
    let result = Shipping.MapOne(res.rows[0]);

    return new SuccessResult(result, "Shipping updated");
}

const updateShippingDate = async (id, shipping_date) => {

    let res = await pool.query('UPDATE shippings SET shipping_date=$1 WHERE id=$2 AND deleted=0 returning *', [shipping_date, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Shipping was not found")
    }
    let result = Shipping.MapOne(res.rows[0]);

    return new SuccessResult(result, "Shipping updated");
}



module.exports = {
    getAllShippings,
    getShippingById,
    addShipping,
    deleteShipping,
    updateShipping,
    updateShippingOrderId,
    updateShippingAddress, 
    updateShippingMethod,
    updateShippingStatus,
    updateShippingDate
}
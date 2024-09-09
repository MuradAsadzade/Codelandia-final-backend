const Payment = require("../models/payment/payment.js");
const pool = require("../config/db.js");
const { ErrorResult, SuccessResult, EmptyResult } = require("../utils/results.js")


const getAllPayments = async () => {
    try {
        const result = await pool.query("SELECT * FROM payments WHERE deleted = 0 ORDER BY id");
        if (result.rows.length === 0) {
            return new SuccessResult(null, "No payments found");
        }
        return new SuccessResult(result.rows, "All payments displayed");
    } catch (error) {
        return new ErrorResult(null, "Error retrieving payments");
    }
};

const getPaymentById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM payments WHERE id = $1", [id]);
        if (!result.rows.length) {
            return new SuccessResult(null, `Payment with ID: ${id} not found`);
        }
        return new SuccessResult(result.rows[0], "Payment found");
    } catch (error) {
        return new ErrorResult(null, "Error retrieving payment");
    }
};


const addPayment = async (payment) => {
    try {

        let result = await pool.query("INSERT INTO payments(order_id,payment_method,payment_status,payment_date) VALUES($1,$2,$3,$4)", [
            payment.order_id,
            payment.payment_method,
            payment.payment_status,
            payment.payment_date

        ]);
        console.log(result);

        let new_Payment = Payment.MapOne(payment);
        return new SuccessResult(new_Payment, "Payment created successfully");
    } catch (error) {
        console.log(error);

        return new ErrorResult(null, "This Payment is already available");
    }
}

const deletePayment = async (id) => {

    let res = await pool.query("UPDATE payments SET deleted=$1 WHERE id=$1 returning *", [id]);
    let result = Payment.MapOne(res.rows[0]);
    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Payment not found")
    };
    return new SuccessResult(result, "Payment deleted");
}

const updatePayment = async (id, payment) => {

    let res = await pool.query('UPDATE payments SET order_id=$1, payment_method=$2,payment_status=$3,payment_date=$4 WHERE id=$5 AND deleted=0 returning *', [payment.order_id, payment.payment_method, payment.payment_status,payment.payment_date, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Payment was not found")
    }
    let result = Payment.MapOne(res.rows[0]);

    return new SuccessResult(result, "Payment updated");
}

const updatePaymentOrderId = async (id, order_id) => {

    let res = await pool.query('UPDATE payments SET order_id=$1 WHERE id=$2 AND deleted=0 returning *', [order_id, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Payment was not found")
    }
    let result = Payment.MapOne(res.rows[0]);

    return new SuccessResult(result, "Payment updated");
}

const updatePaymentMethod = async (id, payment_method) => {

    let res = await pool.query('UPDATE payments SET payment_method=$1 WHERE id=$2 AND deleted=0 returning *', [payment_method, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Payment was not found")
    }
    let result = Payment.MapOne(res.rows[0]);

    return new SuccessResult(result, "Payment updated");
}

const updatePaymentStatus = async (id, payment_status) => {

    let res = await pool.query('UPDATE payments SET payment_status=$1 WHERE id=$2 AND deleted=0 returning *', [payment_status, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Payment was not found")
    }
    let result = Payment.MapOne(res.rows[0]);

    return new SuccessResult(result, "Payment updated");
}

const updatePaymentDate = async (id, payment_date) => {

    let res = await pool.query('UPDATE payments SET payment_date=$1 WHERE id=$2 AND deleted=0 returning *', [payment_date, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "Payment was not found")
    }
    let result = Payment.MapOne(res.rows[0]);

    return new SuccessResult(result, "Payment updated");
}



module.exports = {
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
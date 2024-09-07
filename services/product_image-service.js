const ProductImage = require("../models/product_image/product_image.js");
const pool = require("../config/db.js");
const { ErrorResult, SuccessResult, EmptyResult } = require("../utils/results.js");

const getAllProductImages = async () => {
    let result = await pool.query("SELECT * FROM product_images WHERE deleted=0");
    result = ProductImage.MapAll(result.rows);
    if (result.length == 0) {
        return new SuccessResult(null, "No ProductImage found");
    }
    return new SuccessResult(result, "All ProductImages displayed");
}

const getProductImageById = async (id) => {
    let result = await pool.query("SELECT * FROM product_images WHERE id=$1 AND deleted=0", [id]);
    result = ProductImage.MapOne(result.rows[0]);
    if (result.image_url == undefined) {
        return new SuccessResult(null, `ProductImage with this id: ${id} was not found`);
    }
    return new SuccessResult(result, "ProductImage was found");
}

const addProductImage = async (productImage) => {
    try {
        let result = await pool.query("INSERT INTO product_images(product_id, image_url) VALUES($1, $2)", [
            productImage.product_id,
            productImage.image_url
        ]);
        console.log(result);

        let new_productImage = ProductImage.MapOne(productImage);

        return new SuccessResult(new_productImage, "ProductImage created successfully");
    } catch (error) {
        return new ErrorResult(null, "This ProductImage is already available");
    }
}

const deleteProductImage = async (id) => {
    let res = await pool.query("UPDATE product_images SET deleted=$1 WHERE id=$1 returning *", [id]);
    let result = ProductImage.MapOne(res.rows[0]);
    if (result.image_url == undefined) {
        return new ErrorResult(null, "ProductImage not found");
    }
    return new SuccessResult(result, "ProductImage deleted");
}

const updateProductImage = async (id, productImage) => {
    let res = await pool.query('UPDATE product_images SET product_id=$1, image_url=$2 WHERE id=$3 AND deleted=0 returning *', [
        productImage.product_id,
        productImage.image_url,
        id
    ]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "ProductImage was not found");
    }
    let result = ProductImage.MapOne(res.rows[0]);

    return new SuccessResult(result, "ProductImage updated");
}

const updateProductImageURL = async (id, image_url) => {
    let res = await pool.query('UPDATE product_images SET image_url=$1 WHERE id=$2 AND deleted=0 returning *', [image_url, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "ProductImage was not found");
    }
    let result = ProductImage.MapOne(res.rows[0]);

    return new SuccessResult(result, "ProductImage URL updated");
}

const updateProductImageProductId = async (id, product_id) => {
    let res = await pool.query('UPDATE product_images SET product_id=$1 WHERE id=$2 AND deleted=0 returning *', [product_id, id]);

    if (res.rows[0] == undefined) {
        return new ErrorResult(null, "ProductImage was not found");
    }
    let result = ProductImage.MapOne(res.rows[0]);

    return new SuccessResult(result, "ProductImage product_id updated");
}

module.exports = {
    getAllProductImages,
    addProductImage,
    getProductImageById,
    deleteProductImage,
    updateProductImage,
    updateProductImageURL,
    updateProductImageProductId
};

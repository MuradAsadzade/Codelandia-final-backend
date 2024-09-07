const productImageService = require("../services/product_image-service")
const getAllProductImages = async (req, res) => {
    let result = await productImageService.getAllProductImages();
    res.json(result);
};

const getProductImageById = async (req, res) => {
    let result = await productImageService.getProductImageById(req.params.id);
    res.json(result);
};

const addProductImage = async (req, res) => {
    const result = await productImageService.addProductImage(req.body);
    res.json(result);
};

const deleteProductImage = async (req, res) => {
    const result = await productImageService.deleteProductImage(req.params.id);
    res.json(result);
};

const updateProductImage = async (req, res) => {
    const result = await productImageService.updateProductImage(req.params.id, req.body);
    res.json(result);
};

const updateProductImageURL = async (req, res) => {
    const result = await productImageService.updateProductImageURL(req.params.id, req.body.image_url);
    res.json(result);
};

const updateProductImageProductId = async (req, res) => {
    const result = await productImageService.updateProductImageProductId(req.params.id, req.body.product_id);
    res.json(result);
};

module.exports = {
    getAllProductImages,
    addProductImage,
    getProductImageById,
    deleteProductImage,
    updateProductImage,
    updateProductImageURL,
    updateProductImageProductId
};

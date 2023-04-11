
const productService = {};
const Product = require('../models/Product');


productService.findAllForListing = async (options, auth) => {
    try {
        return await Product.find(options);

    } catch (error) {
        return error;
    }
  };

  module.exports = productService;
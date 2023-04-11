const express = require('express');
const responseHelper  =  require('../responseHelper');
const productService  =  require('../services/productService');
const router = express.Router();

router.get('/', (req, res, next) => {
    // const { userId } = req.cappAuth;
    console.log("req", req.session.userId)
    return productService.findAllForListing()
      .then(ret => responseHelper.success(res, ret))
      .catch(err => next(err));
  });

module.exports = router;
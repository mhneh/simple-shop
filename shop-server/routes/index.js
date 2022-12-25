var express = require('express');
var router = express.Router();
const DB = require("./../database/connection");

/* GET home page. */
router.get('/', async function(req, res, next) {
  const categories = await DB.categories.all();
  const products = await DB.products.all();

  const page = (req.query.page) ? +req.query.page : 1;
  const pageSize = 6;
  const pagingProducts = products.slice((page - 1) * pageSize, page * pageSize);
  res.render('index', {
    title: 'Simple Shop',
    categories: categories,
    products: pagingProducts,
    page: page,
    previousPage: (page <= 1) ? 1 : (page - 1),
    nextPage: (pagingProducts.length == 0) ? page : (page + 1)
  });
});

module.exports = router;

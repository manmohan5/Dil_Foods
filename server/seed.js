
const mongoose = require('mongoose');
const MONGO_URI = require("./config").MONGO_URI;

  const seedData = [
    {
      "name": "Maggi noodles",
      "company": "Nestle India",
      "price": "25"
    },
    {
      "name": "Amul butter",
      "company": "Gujarat Cooperative Milk Marketing Federation",
      "price": "50"
    },
    {
      "name": "Parle-G biscuits",
      "company": "Parle Products Pvt. Ltd.",
      "price": "20"
    },
    {
      "name": "Britannia Marie Gold biscuits",
      "company": "Britannia Industries Ltd.",
      "price": "40"
    },
    {
      "name": "Tata salt",
      "company": "Tata Chemicals",
      "price": "70"
    },
    {
      "name": "Haldiram's Bhujia",
      "company": "Haldiram's",
      "price": "150"
    },
    {
      "name": "MDH Masala",
      "company": "MDH Spices",
      "price": "125"
    },
    {
      "name": "Cadbury Dairy Milk chocolate",
      "company": "Mondelez India",
      "price": "50"
    },
    {
      "name": "Saffola cooking oil",
      "company": "Marico Limited",
      "price": "700"
    },
    {
      "name": "Patanjali Atta noodles",
      "company": "Patanjali Ayurved Limited",
      "price": "55"
    },
    {
      "name": "Kellogg's Corn Flakes",
      "company": "Kellogg India",
      "price": "400"
    },
    {
      "name": "Bournvita health drink",
      "company": "Mondelez India",
      "price": "500"
    },
    {
      "name": "Knorr soup",
      "company": "Hindustan Unilever Ltd.",
      "price": "150"
    },
    {
      "name": "Red Label tea",
      "company": "Hindustan Unilever Ltd.",
      "price": "400"
    },
    {
      "name": "Lay's chips",
      "company": "PepsiCo India",
      "price": "100"
    },
    {
      "name": "Nestle KitKat chocolate",
      "company": "Nestle India",
      "price": "50"
    },
    {
      "name": "Top Ramen noodles",
      "company": "Indo Nissin Foods Pvt. Ltd.",
      "price": "50"
    },
    {
      "name": "Brooke Bond Taj Mahal tea",
      "company": "Hindustan Unilever Ltd.",
      "price": "500"
    },
    {
      "name": "Kissan tomato ketchup",
      "company": "Hindustan Unilever Ltd.",
      "price": "200"
    },
]  ;

const Product = require('./models/Product');

mongoose.connect(MONGO_URI, { useNewUrlParser: true });


Product.insertMany(seedData)
  .then(() => {
    console.log('Data seeded successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
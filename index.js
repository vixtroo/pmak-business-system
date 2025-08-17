require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 8080;


app.use(express.json());

// Import routes
const orderRoutes = require('./src/routes/orders.js');
//const productRoutes = require('./src/routes/products');

// Use routes
app.use('/orders', orderRoutes);
//app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
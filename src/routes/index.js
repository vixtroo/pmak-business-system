const express = require('express');
const app = express();
const PORT = 8080;
const supabase = require('../config/supabase');

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//CREATE ORDER
app.post('/create-order', async (req, res) => {
  const { store, orders } = req.body;

  // Validate store
  if (!store || typeof store !== 'string' || store.trim() === '') {
    return res.status(400).send({ message: 'Store is required and must be a string' });
  }

  // Validate orders is an array of JSON objects
  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(400).send({ message: 'Orders must be a non-empty list of JSON objects' });
  }

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    if (typeof order !== 'object' || order === null || Array.isArray(order)) {
      return res.status(400).send({ message: `Order ${i + 1} must be a JSON object` });
    }

    const { product, quantity, price } = order;
    if (!product || typeof product !== 'string' || product.trim() === '') {
      return res.status(400).send({ message: `Order ${i + 1}: Product is required and must be a string` });
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).send({ message: `Order ${i + 1}: Quantity must be greater than zero` });
    }
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).send({ message: `Order ${i + 1}: Price must be greater than zero` });
    }
  }

 // Insert into Supabase
 try {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        store,       // string
        orders       // array of JSON objects
      }
    ])
    .select();

  if (error) {
    return res.status(500).send({ message: 'Database insert failed', error: error.message });
  }

  res.status(200).send({
    message: `Order/s at ${store} created successfully`,
    data
  });
} catch (err) {
  res.status(500).send({ message: 'Unexpected server error', error: err.message });
}
});

module.exports = app;
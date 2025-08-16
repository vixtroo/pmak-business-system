const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/my-love', (req, res) => {
  res.status(200).send({first_name: 'Christine Chelsey', last_name: 'Sebastian' });
});

app.post('/tshirt/:id', (req, res) => { 
  const { id } = req.params;
  const { brand, size, color } = req.body

  if(!brand || !size || !color){
    res.status(400).send({ message: `Brand, Size, and Color are required` });
  }
  res.status(200).send({ message: `T-shirt with ID ${id} and brand ${brand} with a size ${size} created successfully` });
});

const express = require('express');
const cors = require('cors');
const path = require('path');
require('./db/mongoose');
const assetsRoutes = require('./routes/api/assetsRoutes.js');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/assets', assetsRoutes);

if (process.env.NODE_ENV === undefined) {
  app.get('*', (req, res) => {
    res.redirect('http://localhost:3000');
  });
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

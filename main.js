const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3333;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server works!')
});

app.get('/data', (req, res) => {
  res.json({ message: 'Hi from server! CaelumVoxGenesis!', time: Date.now() });
});

app.post('/save', (req, res) => {
  console.log('Data to save', req.body);
  res.json({ status: 'OK', received: req.body });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
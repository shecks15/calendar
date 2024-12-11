const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', transactionRoutes);

app.use((req, res, next) => {
    console.log(`Пришел запрос: ${req.method} ${req.url}`);
    next();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

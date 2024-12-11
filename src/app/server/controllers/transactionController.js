const db = require('../db/database');

const getTransactions = (req, res) => {
  const sql = 'SELECT * FROM transactions_new ORDER BY dateTime DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

const addTransaction = (req, res) => {
  const { dateTime, sum, comment } = req.body; 
  

  const sql = 'INSERT INTO transactions_new (dateTime, sum, comment) VALUES (?, ?, ?)';
  const params = [dateTime, sum, comment];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).send('Error adding transaction');
    }
    res.status(201).json({
      id: this.lastID,
      dateTime,
      sum,
      comment
    });
  });
};

module.exports = { getTransactions, addTransaction };

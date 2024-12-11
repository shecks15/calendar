const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./src/app/SQLite/transactions_new.db', (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

const initDb = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS transactions_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dateTime TEXT NOT NULL,
      sum REAL NOT NULL,
      comment TEXT
    );
  `;
  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table "transactions_new" created or already exists');
    }
  });
};

initDb();

module.exports = db;

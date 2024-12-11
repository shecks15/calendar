CREATE TABLE IF NOT EXISTS transactions_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dateTime TEXT NOT NULL,
    sum REAL NOT NULL,
    comment TEXT
);
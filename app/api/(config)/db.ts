import Database from "better-sqlite3";

const db = new Database("./database.sqlite");

// Ensure the table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS answers (
    questionId TEXT PRIMARY KEY,
    answer TEXT NOT NULL
  );
`);

export default db;

import { pool } from "./database.js";

export const createNotesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS notes CASCADE;

    CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        document_key VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        timestamp NUMERIC(100, 2) NOT NULL
    )
`;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 notes table created successfully");
  } catch (err) {
    console.error("⚠️ error creating notes table", err);
  }
};

export const createAINotesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS notes_ai CASCADE;

    CREATE TABLE IF NOT EXISTS notes_ai (
        id SERIAL PRIMARY KEY,
        chat_id INTEGER NOT NULL,
        note_content TEXT NOT NULL,
        created_at NUMERIC(100, 2) NOT NULL
    )
`;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 notes ai table created successfully");
  } catch (err) {
    console.error("⚠️ error creating notes table", err);
  }
};

export const createChatTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS chat CASCADE;

    CREATE TABLE IF NOT EXISTS chat (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        document_id VARCHAR(255) NOT NULL,
        user_question TEXT NOT NULL,
        model_response TEXT NOT NULL,
        model_version VARCHAR(255) NOT NULL,
        created_at NUMERIC(100, 2) NOT NULL
    )
`;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 chat table created successfully");
  } catch (err) {
    console.error("⚠️ error creating notes table", err);
  }
};

// createNotesTable();
createAINotesTable();
// createChatTable();

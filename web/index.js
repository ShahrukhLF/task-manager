const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'admin',
  host: 'db-container',
  database: 'tasks',
  password: 'secret',
  port: 5432,
});

async function initializeDatabase() {
  try {
    // Simple, clean SQL without any JavaScript comments
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255)
      );
    `);
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Database initialization failed:', err);
    process.exit(1);
  }
}

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.send(`
      <h1>Task Manager</h1>
      <ul>${result.rows.map(task => `<li>${task.title}</li>`).join('')}</ul>
      <form method="POST" action="/add">
        <input type="text" name="title" placeholder="New task">
        <button>Add Task</button>
      </form>
    `);
  } catch (err) {
    res.status(500).send('Error loading tasks');
  }
});

app.post('/add', async (req, res) => {
  try {
    const { title } = req.body;
    await pool.query('INSERT INTO tasks (title) VALUES ($1)', [title]);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error adding task');
  }
});

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
});
const { pool } = require('../config/db');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM notes');
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (note) => {
  const { title, body } = note;
  const result = await pool.query(
    'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING *',
    [title, body]
  );
  return result.rows[0];
};

const update = async (id, note) => {
  const { title, body } = note;
  const result = await pool.query(
    'UPDATE notes SET title = $1, body = $2, updatedAt = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [title, body, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM notes WHERE id = $1', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

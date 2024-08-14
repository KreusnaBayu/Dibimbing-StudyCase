const Note = require('../models/Note');

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.getAll();
    if (notes.length === 0) {
      return res.status(200).json({ message: 'Tidak ada catatan' });
    }
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.getById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Catatan tidak ditemukan' });
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const updatedNote = await Note.update(req.params.id, req.body);
    if (!updatedNote) {
      return res.status(404).json({ message: 'Catatan tidak ditemukan' });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    await Note.remove(req.params.id);
    res.status(200).json({ message: 'Catatan berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};

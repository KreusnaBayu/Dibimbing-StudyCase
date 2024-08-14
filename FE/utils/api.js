const API_URL = 'http://localhost:8080/api/notes';

// Mengambil semua catatan
export const fetchNotes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map(note => ({
      id: note.id,
      title: note.title,
      body: note.body,
      createdAt: note.createdat, // Menggunakan nama field yang sesuai dari API
      updatedAt: note.updatedat, // Menggunakan nama field yang sesuai dari API
    }));
  } catch (error) {
    console.error('Fetching notes failed:', error);
    return [];
  }
};

// Mengambil catatan berdasarkan ID
export const fetchNoteById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const note = await response.json();
    return {
      id: note.id,
      title: note.title,
      body: note.body,
      createdAt: note.createdat, // Menggunakan nama field yang sesuai dari API
      updatedAt: note.updatedat, // Menggunakan nama field yang sesuai dari API
    };
  } catch (error) {
    console.error('Fetching note by ID failed:', error);
    return null;
  }
};

// Menambahkan catatan baru
export const createNote = async (note) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const newNote = await response.json();
    return {
      id: newNote.id,
      title: newNote.title,
      body: newNote.body,
      createdAt: newNote.createdat, // Menggunakan nama field yang sesuai dari API
      updatedAt: newNote.updatedat, // Menggunakan nama field yang sesuai dari API
    };
  } catch (error) {
    console.error('Creating note failed:', error);
    return null;
  }
};

// Memperbarui catatan yang ada
export const updateNote = async (id, note) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const updatedNote = await response.json();
    return {
      id: updatedNote.id,
      title: updatedNote.title,
      body: updatedNote.body,
      createdAt: updatedNote.createdat, // Menggunakan nama field yang sesuai dari API
      updatedAt: updatedNote.updatedat, // Menggunakan nama field yang sesuai dari API
    };
  } catch (error) {
    console.error('Updating note failed:', error);
    return null;
  }
};

// Menghapus catatan berdasarkan ID
export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Deleting note failed:', error);
  }
};

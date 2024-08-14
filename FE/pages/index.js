import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import NotePage from '../components/Notepage';
import { fetchNotes } from '../utils/api';

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, []);

  const handleCreateOrUpdateNote = (note) => {
    if (note.id) {
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === note.id ? note : n))
      );
    } else {
      setNotes((prevNotes) => [...prevNotes, note]);
    }
    setSelectedNote(null);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={5}>
      <NotePage
        notes={notes}
        selectedNote={selectedNote}
        onSave={handleCreateOrUpdateNote}
      />
    </Box>
  );
}

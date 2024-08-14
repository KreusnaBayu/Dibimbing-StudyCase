
import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import NoteList from '../../components/NoteList';
import { fetchNotes } from '../../utils/api';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  return (
    <Box p={5}>
      {notes.length === 0 ? (
        <Text>Tidak ada </Text>
      ) : (
        <NoteList notes={notes} />
      )}
    </Box>
  );
}

// pages/notes/new.js
import NoteForm from '../../components/NoteForm';
import { Box, Heading } from '@chakra-ui/react';

export default function NewNote() {
  return (
    <Box p={5}>
      <Heading mb={4}>Tambah Catatan Baru</Heading>
      {/* Passing null or an empty object as no existing note */}
      <NoteForm existingNote={null} />
    </Box>
  );
}

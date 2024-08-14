// pages/notes/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Text, Button, Spinner, useToast, IconButton } from '@chakra-ui/react';
import { fetchNoteById, deleteNote } from '../../utils/api';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export default function NoteDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (id) {
      fetchNoteById(id)
        .then((data) => {
          setNote(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch note.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        toast({
          title: 'Note deleted.',
          description: 'The note has been deleted successfully.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/');
      } catch (error) {
        toast({
          title: 'Deletion failed.',
          description: 'There was an error deleting the note.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!note) {
    return <Text>No note found</Text>;
  }

  return (
    <Box p={6} maxW="800px" mx="auto" mt={10} borderWidth="1px" borderRadius="md" shadow="lg">
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        {note.title}
      </Text>
      <Text fontSize="lg" mb={6}>
        {note.body}
      </Text>
      <Box d="flex" justifyContent="flex-end" gap={4}>
        <Button
          colorScheme="blue"
          onClick={() => router.push(`/notes/${note.id}/edit`)}
          leftIcon={<EditIcon />}
        >
          Edit
        </Button>
        <IconButton
          colorScheme="red"
          icon={<DeleteIcon />}
          onClick={handleDelete}
          aria-label="Delete Note"
        />
      </Box>
    </Box>
  );
}

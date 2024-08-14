// pages/notes/[id]/edit.js
import { useRouter } from 'next/router';
import NoteForm from '../../../components/NoteForm';
import { fetchNoteById } from '../../../utils/api';

export default function EditNotePage({ note }) {
  const router = useRouter();

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Catatan</h1>
      <NoteForm existingNote={note} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const note = await fetchNoteById(id);

  return {
    props: {
      note: note || null,
    },
  };
}

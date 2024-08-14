import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Button, Heading } from '@chakra-ui/react';
import { fetchNotes, fetchNoteById, createNote, updateNote, deleteNote } from '../utils/api';
import { AiOutlineFileText, AiOutlineSave, AiOutlineCalendar } from 'react-icons/ai'; 
import { CgPen } from "react-icons/cg";
import { MdPostAdd } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import styles from '../styles/NotePage.module.css';


export default function NotePage({ initialNotes, initialNote }) {
  const [notes, setNotes] = useState(initialNotes || []);
  const [selectedNote, setSelectedNote] = useState(initialNote || null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setBody(selectedNote.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [selectedNote]);

  useEffect(() => {
    if (textareaRef.current) {
      const containerHeight = textareaRef.current.parentElement.offsetHeight;
      textareaRef.current.style.height = `${containerHeight * 0.75}px`;
    }
  }, []);

  useEffect(() => {
    if (!initialNotes || initialNotes.length === 0) {
      const fetchData = async () => {
        try {
          const data = await fetchNotes();
          setNotes(data);
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };
      fetchData();
    } else {
      setNotes(initialNotes);
    }
  }, [initialNotes]);

  const handleNoteClick = async (note) => {
    setSelectedNote(note);
    const fetchedNote = await fetchNoteById(note.id);
    setSelectedNote(fetchedNote);
    setTitle(fetchedNote.title);
    setBody(fetchedNote.body);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const note = { title, body };
  
    try {
      if (selectedNote) {
        await updateNote(selectedNote.id, note);
        console.log('Note updated:', note);
      } else {
        await createNote(note);
        console.log('Note created:', note);
      }
      const data = await fetchNotes();
      setNotes(data);
      setSelectedNote(null);
      setTitle(''); 
      setBody('');  
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async () => {
    if (selectedNote) {
      const isConfirmed = window.confirm('Are you sure you want to delete this note? This action cannot be undone.');
      if (isConfirmed) {
        try {
          await deleteNote(selectedNote.id);
          console.log('Note deleted:', selectedNote);
          const data = await fetchNotes();
          setNotes(data);
          setSelectedNote(null);
          setTitle('');
          setBody('');
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      }
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.topContainer}>
        <Box className={styles.userInfo}>
          <img src="https://png.pngtree.com/png-clipart/20221231/original/pngtree-cartoon-style-male-user-profile-icon-vector-illustraton-png-image_8836451.png" alt="User Avatar" className={styles.avatar} />
          <Text className={styles.username}>Kreusna Bayu</Text>
        </Box>
        <Box className={styles.nav}>
          <Text className={styles.navItem}>All</Text>
          <Text className={styles.navItem}>Projects</Text>
          <Text className={styles.navItem}>Meeting</Text>
        </Box>
        <Box className={styles.logo}>
          <img src="/assets/Logo.png" alt="Logo" className={styles.logoImage} />
        </Box>
      </Box>
      <Box className={styles.mainContainer}>
        <Box className={styles.leftContainer}>
          <Heading as="h3" size="md" mb={4} color="black" className={styles.heading}>
            <AiOutlineFileText style={{ marginRight: '8px', fontSize: '24px' }} /> All Notes
          </Heading>
          <Box className={styles.listContainer}>
            {notes.length === 0 ? (
              <Text color="black">No notes available</Text>
            ) : (
              notes.map((note) => (
                <Box
                  key={note.id}
                  className={styles.noteCard}
                  onClick={() => handleNoteClick(note)}
                >
                  <h4 className={styles.noteTitle}>{note.title}</h4>
                  <p className={styles.noteBody}>{note.body}</p>
                  <Box display="flex" alignItems="center" mb={2} className={styles.noteDate}>
                    <AiOutlineCalendar style={{ marginRight: '8px', fontSize: '18px' }} />
                    <Text as="span">{new Date(note.createdAt).toLocaleString()}</Text>
                  </Box>
                  
                </Box>
              ))
            )}
          </Box>
        </Box>
        <Box className={styles.rightContainer}>
          <Box className={styles.titleSection}>
            <Heading as="h3" size="md">
              {selectedNote ? (
                <>
                  <CgPen style={{ marginRight: '8px', fontSize: '24px', verticalAlign: 'middle' }} />
                  Edit Note
                </>
              ) : (
                <>
                  <MdPostAdd style={{ marginRight: '8px', fontSize: '24px', verticalAlign: 'middle' }} />
                  Create Note
                </>
              )}
            </Heading>
          </Box>
          <hr className={styles.divider} />
          <Box className={styles.bodySection}>
            <form onSubmit={handleSubmit}>
              <input
                className={styles.inputField}
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                ref={textareaRef}
                className={styles.textareaField}
                placeholder="Description"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <Button
                className={styles.button}
                type="submit"
                leftIcon={selectedNote ? <AiOutlineSave /> : <MdPostAdd />}
                colorScheme={selectedNote ? 'blue' : 'teal'}
              >
                {selectedNote ? 'Save Changes' : 'Create Note'}
              </Button>
              {selectedNote && (
                <Button
                  className={styles.buttonhps}
                  onClick={handleDelete}
                  colorScheme="red"
                  leftIcon={<IoTrashOutline />}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              )}
            </form>
          </Box>
          <Box className={styles.bottomRightContainer}>
            <Box className={styles.card}>
                <img src='https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/2d/1e/73/2d1e7358-0dde-30fc-b5fe-d6ca7d975954/5060450063043_1.jpg/1200x1200bb.jpg' alt="Image" className={styles.cardImage} />
                <Box className={styles.cardContent}>
                    <Text className={styles.cardTitle}>Music Of the Day</Text>
                    <a href="https://www.youtube.com/watch?v=NZc__Hhi4L8" target="_blank" rel="noopener noreferrer" className={styles.cardDescription}>
                        Rex Orange County - Television/So Far So Good
                    </a>
                    <Text className={styles.cardQuote}>"Music is the divine way to tell beautiful, poetic things to the heart." - Pablo Casals</Text>
                </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

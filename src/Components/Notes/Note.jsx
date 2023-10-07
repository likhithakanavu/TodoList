import React, { useState, useContext } from "react";

import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  TextField,
  Button,
  editing,
  setEditing,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { EditOutlined,CheckOutlined } from '@mui/icons-material';

import { ArchiveOutlined, DeleteOutlineOutlined } from "@mui/icons-material";

import { DataContext } from "../../Context/DataProvider";

const NoteCard = styled(Card)`
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 1px 3px 1px rgba(60, 64, 67, 0.149);
  }
`;

const Note = ({ note }) => {
  const [showActions, setShowActions] = useState(false);
  const [editing, setEditing] = useState(false); // Add this state
  const [updatedNote, setUpdatedNote] = useState({ ...note });


  const { notes, setNotes, setArchivedNotes, setDeletedNotes } =
  useContext(DataContext);
  
  const { updateNote } = useContext(DataContext);

  const onTextChange = (e, field) => {
    const newValue = e.target.value;
    setUpdatedNote((prevNote) => ({
      ...prevNote,
      [field]: newValue,
    }));
  };
     const handleEdit = () => {
         setEditing(true);
     };

     
    


  

  const archiveNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setArchivedNotes((prevArr) => [...prevArr, note]);
  };

  const deleteNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setDeletedNotes((prevArr) => [...prevArr, note]);
  };

  const handleSave = () => {
    // Update the note in your data context
    setNotes(prevNotes => {
        const updatedNotes = prevNotes.map(prevNote =>
            prevNote.id === note.id ? updatedNote : prevNote
        );
         return updatedNotes;
    });

    // Exit editing mode and reset updatedNote
    setEditing(false);
    setUpdatedNote({ ...note });
};

  return (
    // <NoteCard>
    // <CardContent>
    //     {editing ? (
    //         <TextField
    //             multiline
    //             fullWidth
    //             variant="outlined"
    //             value={updatedNote.text}
    //             onChange={(e) =>
    //                 setUpdatedNote({ ...updatedNote, text: e.target.value })
    //             }
    //         />
    //     ) : (
    //         <Typography>{note.text}</Typography>
    //     )}
    // </CardContent>
    // <CardActions>
    //     <Tooltip title={editing ? "Save" : "Edit"}>
    //         <IconButton onClick={editing ? handleSave :  () => setEditing(true) }>
             
    //             {editing ? <CheckOutlined /> : <EditOutlined />}
    //         </IconButton>
    //     </Tooltip>



    <NoteCard
    onMouseEnter={() => setShowActions(true)}
    onMouseLeave={() => setShowActions(false)}
  >
     <CardContent sx={{ wordWrap: "break-word" }}>
     {editing ? (
      <> 
        <TextField
          size="small"
          placeholder="Title"
          variant="standard"
          InputProps={{ disableUnderline: true }}
          style={{ marginBottom: 10 }}
          value={updatedNote.title}
          // onChange={(e) => onTextChange(e, "title")}
          onChange={(e) => setUpdatedNote({ ...updatedNote, title: e.target.value })}
        />
        <TextField
          multiline
          placeholder="Take a note..."
          variant="standard"
          InputProps={{ disableUnderline: true }}
          value={updatedNote.text}
          // onChange={(e) => onTextChange(e, "text")}
          onChange={(e) => setUpdatedNote({ ...updatedNote, text: e.target.value })}
        />
        <Button onClick={handleSave}>Save</Button>
        </>
    ) : (
        <>
        <Typography>{note.title}</Typography>
        <Typography>{note.text}</Typography>
        </>
      
    )}
    </CardContent>
    <CardActions sx={{ display: "flex", justifyContent: "end", marginLeft: "auto" }}> 


    
     
        <Tooltip title="Archive">
          <IconButton
            sx={{ visibility: showActions ? "visible" : "hidden" }}
            onClick={() => archiveNote(note)}
          >
            <ArchiveOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            sx={{ visibility: showActions ? "visible" : "hidden" }}
            onClick={() => deleteNote(note)}
          >
            <DeleteOutlineOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
         <Tooltip title="Update">
          <IconButton
            sx={{ visibility: showActions ? "visible" : "hidden" }}
            onClick={handleEdit}
          >
            <EditOutlined fontSize="small" />
          </IconButton>
        </Tooltip> 
      </CardActions>
    </NoteCard>
  );
};

export default Note;

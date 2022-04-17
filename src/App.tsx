import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DUMMY_NOTES from "./DUMMY_NOTES";
import Note from "./components/Note/Note";
import INote from "./interfaces/note.interface";
function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);

  useEffect(() => {
    const listFromStorageString = localStorage.getItem("my-notes");
    if(listFromStorageString) {
      const listFromStorageArray = JSON.parse(listFromStorageString);
      setNotesList(listFromStorageArray);
    } else {
      setNotesList(DUMMY_NOTES);
    }
  }, []);

  useEffect(() => {
    console.log('saving to localstorage');
    const notesListString = JSON.stringify(notesList);
    localStorage.setItem("my-notes", notesListString);
  }, [notesList]);

  // const getNotes = async () => {
  //   try{
  //     const response = await axios.get('/notes');
  //     setNotesList(response.data);
  //     console.log(notesList);
  //   }
  //   catch (err){
  //     console.error(err);
  //   }
  // }

  const updateNoteItem = (updateNote: INote) => {

    const updatedList = notesList.map((noteItem: INote) => {
      if(noteItem._id === updateNote._id) {
        return updateNote;
      }
      return noteItem;
    });

    setNotesList(updatedList);
  }

  return (
    <div className="App">
      <div>
        {/* <button onClick={getNotes}>
         Click Me!
       </button> */}
        <div className="notes-list">
          {notesList.map((noteItem, index) => {
            return (
             <Note note={noteItem} onNoteUpdate={updateNoteItem} key={index}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

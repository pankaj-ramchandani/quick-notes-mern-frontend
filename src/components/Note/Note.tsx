import "./Note.css";
import INote from "../../interfaces/note.interface";
import { FC, FocusEvent } from "react";

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
};

const Note: FC<Props> = ({ note, onNoteUpdate }) => {
  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    const newTextValue = event.currentTarget.textContent;
    const updateNoteObject: INote = {
        ... note,
        text: newTextValue || '',
    }
    onNoteUpdate(updateNoteObject);
  };

  return (
    <div className="note">
      {/* SHOW DETAILS OF FIRST ELEMENT */}
      <div
        className="note__text"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={noteTextUpdated}
      >
        {note?.text}
      </div>
      <div className="note__link">
        <a href={note.link}>{note?.link}</a>
      </div>
    </div>
  );
};

export default Note;

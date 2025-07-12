import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./services/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateNote(editId, { title, content });
      setEditId(null);
    } else {
      await createNote({ title, content });
    }
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📝 Notes App</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
        <button type="submit">{editId ? "Update" : "Add"} Note</button>
      </form>
      <hr />
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

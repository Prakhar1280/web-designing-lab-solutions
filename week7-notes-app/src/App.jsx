import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Store notes
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Form values
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ID of the note currently being edited
  const [editingId, setEditingId] = useState(null);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add or update a note
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if fields are empty
    if (title.trim() === "" || content.trim() === "") {
      alert("Please enter both title and content.");
      return;
    }

    // Update existing note
    if (editingId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title,
                content: content,
              }
            : note
        )
      );

      setEditingId(null);
    }

    // Add new note
    else {
      const newNote = {
        id: Date.now(),
        title: title,
        content: content,
      };

      setNotes([...notes, newNote]);
    }

    // Clear form
    setTitle("");
    setContent("");
  };

  // Edit a note
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete a note
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>📝 My Notes</h1>
        <p>A simple React Notes Application</p>
      </header>

      <main className="container">

        {/* Add / Edit Note Form */}
        <section className="note-form">

          <h2>
            {editingId !== null
              ? "✏️ Edit Note"
              : "➕ Add a New Note"}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows="5"
            ></textarea>

            <div className="form-buttons">

              <button
                type="submit"
                className="save-btn"
              >
                {editingId !== null
                  ? "Update Note"
                  : "Add Note"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </section>


        {/* Notes Section */}
        <section className="notes-section">

          <div className="notes-heading">

            <h2>📚 My Notes</h2>

            <span>
              {notes.length} note{notes.length !== 1 ? "s" : ""}
            </span>

          </div>


          {/* Show message if there are no notes */}
          {notes.length === 0 ? (

            <div className="empty">

              <div className="empty-icon">
                🗒️
              </div>

              <h3>No notes yet</h3>

              <p>
                Add your first note using the form above.
              </p>

            </div>

          ) : (

            /* Display notes */
            <div className="notes-grid">

              {notes.map((note) => (

                <div
                  className="note-card"
                  key={note.id}
                >

                  <h3>{note.title}</h3>

                  <p>{note.content}</p>

                  <div className="note-actions">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(note)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(note.id)}
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* Footer */}
      <footer>
        <p>
          React.js Notes Application | Experiment 7
        </p>
      </footer>

    </div>
  );
}

export default App;
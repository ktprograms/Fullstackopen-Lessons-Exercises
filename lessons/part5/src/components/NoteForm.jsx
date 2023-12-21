import { useState } from 'react'

const NoteForm = ({ onCreateNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreateNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
/* eslint sort-imports: 'off' */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const handleCreateNote = jest.fn()
  const user = userEvent.setup()

  render(<NoteForm onCreateNote={handleCreateNote} />)

  const input = screen.getByPlaceholderText('write note content here')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(handleCreateNote.mock.calls).toHaveLength(1)
  expect(handleCreateNote.mock.calls[0][0].content).toBe('testing a form...')
})
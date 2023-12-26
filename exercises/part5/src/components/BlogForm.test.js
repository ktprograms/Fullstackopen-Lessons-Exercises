/* eslint sort-imports: off */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls handler with correct details', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  }

  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm onCreateBlog={mockHandler} />)

  const titleInput = screen.getByPlaceholderText('title...')
  await user.type(titleInput, blog.title)
  const authorInput = screen.getByPlaceholderText('author...')
  await user.type(authorInput, blog.author)
  const urlInput = screen.getByPlaceholderText('url...')
  await user.type(urlInput, blog.url)

  const submitButton = screen.getByText('create')
  await user.click(submitButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual(blog)
})
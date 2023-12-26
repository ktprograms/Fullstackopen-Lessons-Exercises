/* eslint sort-imports: off */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: {
    name: 'kt',
  },
}

test('renders title and author, but not url or # of likes', () => {
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)

  const detailsDiv = container.querySelector('.blog__details')
  expect(detailsDiv).toHaveStyle({ display: 'none' })
  expect(detailsDiv).toHaveTextContent(blog.url)
  expect(detailsDiv).toHaveTextContent(blog.likes)
  expect(detailsDiv).toHaveTextContent(blog.user.name)
})

test('shows details when view button is clicked', async () => {
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const detailsDiv = container.querySelector('.blog__details')
  expect(detailsDiv).not.toHaveStyle({ display: 'none' })
})

test('like handler called for every click of like button', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} onLikeBlog={mockHandler} />)

  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

describe('remove button', () => {
  test('is not in document when showRemove=false', () => {
    render(<Blog blog={blog} showRemove={false} />)

    const element = screen.queryByText('delete')
    expect(element).not.toBeInTheDocument()
  })

  describe('when clicked', () => {
    test('handler called if user confirms', async () => {
      jest.spyOn(globalThis, 'confirm').mockReturnValueOnce(true)
      const mockHandler = jest.fn()
      const user = userEvent.setup()

      render(<Blog blog={blog} showRemove={true} onRemoveBlog={mockHandler} />)

      const button = screen.getByText('delete')
      await user.click(button)

      expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('handler not called if user cancels', async () => {
      jest.spyOn(globalThis, 'confirm').mockReturnValueOnce(false)
      const mockHandler = jest.fn()
      const user = userEvent.setup()

      render(<Blog blog={blog} showRemove={true} onRemoveBlog={mockHandler} />)

      const button = screen.getByText('delete')
      await user.click(button)

      expect(mockHandler.mock.calls).toHaveLength(0)
    })
  })
})
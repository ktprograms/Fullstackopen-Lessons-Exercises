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
let container
beforeEach(() => {
  container = render(<Blog blog={blog} />).container
})

test('renders title and author, but not url or # of likes', () => {
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
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const detailsDiv = container.querySelector('.blog__details')
  expect(detailsDiv).not.toHaveStyle({ display: 'none' })
})
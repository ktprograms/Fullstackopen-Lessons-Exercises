/* eslint sort-imports: off */
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but not url or # of likes', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      name: 'kt',
    },
  }

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
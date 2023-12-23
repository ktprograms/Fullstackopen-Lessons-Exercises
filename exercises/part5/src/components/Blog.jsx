import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, onLikeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? 'hide' : 'view'}
      </button>

      <div style={showWhenVisible}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={() => onLikeBlog(blog.id)}>like</button><br />
        {blog.user.name}<br />
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLikeBlog: PropTypes.func.isRequired,
}

export default Blog
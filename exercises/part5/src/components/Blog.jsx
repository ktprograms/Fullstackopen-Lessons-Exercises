import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, onLikeBlog, showRemove, onRemoveBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleRemoveClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      onRemoveBlog(blog.id)
    }
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
        {showRemove && <>
          <button onClick={handleRemoveClick}>delete</button><br />
        </>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLikeBlog: PropTypes.func.isRequired,
  showRemove: PropTypes.bool.isRequired,
  onRemoveBlog: PropTypes.func.isRequired,
}

export default Blog
import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [message, setMessage] = useState(null)
  const [isSuccessMessage, setIsSuccessMessage] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setAuthorization(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setMessage(`Successfuly logged in as ${user.name}`)
      setIsSuccessMessage(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))
      blogService.setAuthorization(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setIsSuccessMessage(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)

    setMessage('Successfuly logged out')
    setIsSuccessMessage(true)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogVisible(false)

      setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setIsSuccessMessage(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage(`Error adding blog: ${exception.response.data.error}`)
      setIsSuccessMessage(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLikeBlog = async (id) => {
    try {
      const blog = blogs.find((b) => b.id === id)
      const update = { likes: blog.likes + 1 } // TODO: Not TOCTTOU/Multiple users safe

      const returnedBlog = await blogService.update(id, update)
      setBlogs(blogs.map((b) => b.id === id ? returnedBlog : b))
    } catch (exception) {
      setMessage(`Error liking blog: ${exception.response.data.error}`)
      setIsSuccessMessage(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleRemoveBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((b) => b.id !== id))
    } catch (exception) {
      setMessage(`Error removing blog: ${exception.response.data.error}`)
      setIsSuccessMessage(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogsList = () => {
    const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: newBlogVisible ? '' : 'none' }

    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm onCreateBlog={handleCreateBlog} />

          <button onClick={() => setNewBlogVisible(false)}>cancel</button>
        </div>

        {blogs
          .toSorted((a, b) => b.likes - a.likes) // sort from highest to lowest (reverse order)
          .map((blog) =>
            <Blog
              key={blog.id}
              blog={blog}
              onLikeBlog={handleLikeBlog}
              showRemove={blog.user.id === user.id}
              onRemoveBlog={handleRemoveBlog}
            />
          )
        }
      </div>
    )
  }

  return (
    <>
      <Notification message={message} setMessage={setMessage} isSuccess={isSuccessMessage} />

      {user
        ? blogsList()
        : loginForm()
      }
    </>
  )
}

export default App
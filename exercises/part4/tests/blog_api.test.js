const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('correct number of blogs returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

describe('adding blogs', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain(
      'Type wars'
    )
  })

  describe('likes property defaults to 0 when undefined', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
    })

    test('test backend response', async () => {
      const newBlog = {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      }

      const resultBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body.likes).toBe(0)
    })

    test('test database contents', async () => {
      const newBlog = {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd[0].likes).toBe(0)
    })
  })

  describe('fails with status code 400 if data is invalid', () => {
    test('without title', async () => {
      const newBlog = {
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        author: 'Robert C. Martin',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('without url', async () => {
      const newBlog = {
        title: 'Type wars',
        author: 'Robert C. Martin',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('without title or url', async () => {
      const newBlog = {
        author: 'Robert C. Martin',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })
})

describe('deleting blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '0'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('updating blogs', () => {
  const dataToUpdate = {
    likes: 21,
  }

  test('succeeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(dataToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()

    const expected = { ...blogToUpdate, ...dataToUpdate }
    expect(blogsAtEnd).toContainEqual(expected)
  })

  test('fails with status 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send(dataToUpdate)
      .expect(404)
  })

  test('fails with status 400 if id is invalid', async () => {
    const invalidId = '0'

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(dataToUpdate)
      .expect(400)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('correct number of users returned as json', async () => {
    const usersAtStart = await helper.usersInDb()

    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(usersAtStart.length)
  })

  describe('creating users', () => {
    test('succeeds with a unique username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ktprograms',
        name: 'kt',
        password: 'secret',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map((u) => u.username)
      expect(usernames).toContain(newUser.username)
    })

    describe('fails with invalid username', () => {
      test('nonexistent', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          name: 'kt',
          password: 'secret',
        }

        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('validation failed: username: Path `username` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })

      test('too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'kt',
          name: 'kt',
          password: 'secret',
        }

        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('validation failed: username: Path `username` (')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })

      test('not unique', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'root',
          name: 'rootyMcRootface',
          password: 'secret',
        }

        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })
    })

    describe('fails with invalid password', () => {
      test('nonexistent', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'ktprograms',
          name: 'kt',
        }

        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('password missing')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })

      test('too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'ktprograms',
          name: 'kt',
          password: 'pw',
        }

        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('password too short')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })
    })
  })

  test('users and blogs cross-populated', async () => {
    await Blog.deleteMany({})

    const firstNewBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }
    await api
      .post('/api/blogs')
      .send(firstNewBlog)

    const secondNewBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }
    await api
      .post('/api/blogs')
      .send(secondNewBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(2)

    const usersAtEnd = await helper.usersInDb()
    const expectedUser = usersAtEnd[0]

    const blogsResponse = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersResponse = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogsResponse.body).toContainEqual({ ...blogsAtEnd[0], user: expectedUser })
    expect(blogsResponse.body).toContainEqual({ ...blogsAtEnd[1], user: expectedUser })

    expect(usersResponse.body).toContainEqual({ ...expectedUser, blogs: blogsAtEnd })
  })

  describe('login', () => {
    let userToLogin
    beforeEach(async () => {
      const usersAtStart = await helper.usersInDb()
      userToLogin = usersAtStart[0]
    })

    test('succeeds with valid credentials', async () => {
      const loginDetails = {
        username: userToLogin.username,
        password: 'sekret',
      }

      const response = await api
        .post('/api/login')
        .send(loginDetails)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.username).toBe(userToLogin.username)
      expect(response.body.token).toBeDefined()

      const decodedToken = jwt.verify(response.body.token, process.env.JWT_SECRET)

      expect(decodedToken.username).toBe(userToLogin.username)
      expect(decodedToken.id).toBe(userToLogin.id)
    })

    describe('fails with invalid username', () => {
      test('missing username parameter', async () => {
        const loginDetails = {
          password: 'sekret',
        }

        const response = await api
          .post('/api/login')
          .send(loginDetails)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBe('invalid username or password')
      })

      test('wrong username', async () => {
        const loginDetails = {
          username: 'r',
          password: 'sekret',
        }

        const response = await api
          .post('/api/login')
          .send(loginDetails)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBe('invalid username or password')
      })
    })


    describe('fails with invalid password', () => {
      test('missing password parameter', async () => {
        const loginDetails = {
          username: userToLogin.username,
        }

        const response = await api
          .post('/api/login')
          .send(loginDetails)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBe('invalid username or password')
      })

      test('wrong password', async () => {
        const loginDetails = {
          username: userToLogin.username,
          password: 'pw',
        }

        const response = await api
          .post('/api/login')
          .send(loginDetails)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        expect(response.body.error).toBe('invalid username or password')
      })
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
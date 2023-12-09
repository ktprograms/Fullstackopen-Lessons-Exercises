const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return _.sumBy(blogs, 'likes')
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return
  const { title, author, likes } = _.maxBy(blogs, 'likes')
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return
  const [author, numBlogs] = _(blogs)
    .countBy('author')
    .toPairs()
    .maxBy(1)
  return {
    author,
    blogs: numBlogs,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return
  const [author, likes] = _(blogs)
    .groupBy('author')
    .mapValues((value) => _(value).sumBy('likes'))
    .toPairs()
    .maxBy(1)
  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
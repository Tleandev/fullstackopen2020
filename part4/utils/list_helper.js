const _ = require('lodash')
const dummy = () => 1

const totalLikes = blogs => (
	blogs.reduce((sum, blog) => sum + blog.likes, 0)
)

const favouriteBlog = blogs => {
	let max = 0
	let favourite = null
	blogs.map((blog) => {
		if (blog.likes > max) {
			max = blog.likes
			favourite = {
				title: blog.title,
				author: blog.author,
				likes: blog.likes
			}
		}
	})
	return favourite
}

const mostBlogs = blogs => {
	if (blogs.length === 0) return null
	const authorCounts = _.countBy(blogs, blog => blog.author)
	return _.reduce(authorCounts, (max, numBlogs, author) => {
		if (numBlogs > max.blogs) {
			max.blogs = numBlogs
			max.author = author
		}
		return max
	}, {'blogs': 0, 'author': ''})
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs
}
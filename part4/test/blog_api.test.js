const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeAll(async () => {
	await Blog.deleteMany({})
	for (let blog of helper.blogFixtures) {
		await new Blog(blog).save()
	}
})

describe('list all blogs endpoint', () => {

	test('the blogs contain the correct data', async () => {
		const response = await api.get('/api/blogs')

		const body = response.body.map(blog => {
			delete blog.id
			return blog
		})

		expect(body).toEqual(helper.blogFixtures)
	})

	test('the blogs contain an "id" property', async () => {
		const response = await api.get('/api/blogs')

		response.body.forEach(blog => {
			expect(blog.id).toBeDefined()
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
}) 
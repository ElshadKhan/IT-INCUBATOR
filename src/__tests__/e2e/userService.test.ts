import { app } from '../../index';

import request from 'supertest'

describe('/', () => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })
    it('should return 200 and empty array', async () => {
       await request(app)
           .get('/blogs')
           .expect(200, [])
    })
    it('should return 404 for not existing blog', async () => {
        await request(app)
            .get('/blogs/1')
            .expect(404)
    })
    let createdBlog1: any = null
    it(`should'nt create blog with incorrect input data`, async () => {
        const createResponse = await request(app)
            .post('/blogs')
            .send({name: 'Antonio', youtubeUrl: 'asdf@mail.ru'})
            .expect(201)

        createdBlog1 = createResponse.body

        expect(createdBlog1).toEqual({
            id: expect.any(String),
            name: 'Antonio',
            youtubeUrl: 'asdf@mail.ru',
            createdAt: expect.any(String)
        })
        await request(app)
            .get('/blogs')
            .expect(200, [createdBlog1])
    })

    let createdBlog2: any = null
    it(`create one more blog`, async () => {
        const createResponse = await request(app)
            .post('/blogs')
            .send({name: 'Banderos', youtubeUrl: 'Antonio@mail.ru'})
            .expect(201)

        createdBlog2 = createResponse.body

        expect(createdBlog2).toEqual({
            id: expect.any(String),
            name: 'Banderos',
            youtubeUrl: 'Antonio@mail.ru',
            createdAt: expect.any(String)
        })
        await request(app)
            .get('/blogs')
            .expect(200,[createdBlog2, createdBlog1])

    })

    it(`should'nt update blog that not exist`, async () => {
        await request(app)
            .put('/blogs/' + -100)
            .send({name: 'good name', youtubeUrl: 'Antonio@mail.ru'})
            .expect(404)
    })

    it(`should update blog with correct input data`, async () => {

        await request(app)
            .put('/blogs/' + createdBlog1.id)
            .send({name: 'Baldini', youtubeUrl: 'Antonio@mail.ru'})
            .expect(204)

        await request(app)
            .get('/blogs/' + createdBlog1.id)
            .expect(200,{
                ...createdBlog1,
                name:'Baldini',
                youtubeUrl: 'Antonio@mail.ru'
            })

        await request(app)
            .get('/blogs/' + createdBlog2.id)
            .expect(200, createdBlog2)

    })

    it(`should delete both blogs`, async () => {

        await request(app)
            .delete('/blogs/' + createdBlog1.id)
            .expect(204)

        await request(app)
            .get('/blogs/' + createdBlog1.id)
            .expect(404)

        await request(app)
            .delete('/blogs/' + createdBlog2.id)
            .expect(204)

        await request(app)
            .get('/blogs/' + createdBlog2.id)
            .expect(404)

        await request(app)
            .get('/blogs')
            .expect(200, [])

    })


})
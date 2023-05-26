import request from 'supertest'
import {describe,it,expect} from 'vitest'// skip if using jest
import app from './app'

//adding a new Book

describe('Books Tests', ()=>{

    it('Should add a new Book', ()=>{
      return request(app).post('/books')
      .expect('Content-Type', /json/)
      .expect(201)
      .send({
        title:'100',
        description:'Some Robbery stories'
      })
      .then((response:request.Response)=>{
        expect(response.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('Book Added')
            })
        )
      })
    })


    //Get Books
    it('Should Get Books', ()=>{
        return request(app).get('/books')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
          expect(response.body).toEqual(
             expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    description:expect.any(String)
                })
             ])
          )
        })
    })


    it('Should Get Books', ()=>{
        return request(app).get('/books')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
          expect(response.body).toEqual(
             expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.stringMatching('100'),
                    description:expect.stringMatching('Some Robbery stories')
                })
             ])
          )
        })
    })
    //Get one books
    

    it('Should Get a Book', ()=>{
        return request(app).get('/books/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response:request.Response)=>{
          expect(response.body).toEqual(
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    description:expect.any(String)
                })
          )
        })
    })

    //expect 404 id  is wrong

    
    it('Should not a book Get a with incorrect Id ', ()=>{
        return request(app).get('/books/10')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response:request.Response)=>{
          expect(response.body).toEqual(
                expect.objectContaining({
                  message:expect.stringContaining('Not Found')
                })
          )
        })
    })

    // Updating a book 

    it('Should update a Book', ()=>{
        return request(app).put('/books/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .send({
          title:'Updated Book',
          description:'Updated Description'
        })
        .then((response:request.Response)=>{
          expect(response.body).toEqual(
              expect.objectContaining({
                  message:expect.stringMatching('Book Updated')
              })
          )
        })
      })

      it('Should not update a Book', ()=>{
        return request(app).put('/books/10')
        .expect('Content-Type', /json/)
        .expect(404)
        .send({
          title:'Updated Book',
          description:'Updated Description'
        })
        .then((response:request.Response)=>{
          expect(response.body).toEqual(
              expect.objectContaining({
                  message:expect.stringMatching('Book  Not Found')
              })
          )
        })
      })

      //deleting

       
    it('Should not a book Get a with incorrect Id ', ()=>{
        return request(app).delete('/books/1')
        .expect('Content-Type', /json/)
        .set('token','xcvhjkl')
        .expect(200)
        .then((response:request.Response)=>{
          expect(response.body).toEqual(
                expect.objectContaining({
                  message:expect.stringContaining('Book Deleted')
                })
          )
        })
    })

    it('Should not a book Get a with incorrect Id ', ()=>{
        return request(app).delete('/books/1')
        .expect('Content-Type', /json/)
        .expect(404)
        .then((response:request.Response)=>{
          expect(response.body).toEqual(
                expect.objectContaining({
                  message:expect.stringContaining('Book  Not Found')
                })
          )
        })
    })
})
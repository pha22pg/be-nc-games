const request = require('supertest');

const app = require('../app');
const db = require('../db/connection')
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index')

beforeEach(()=>{
    return seed(testData);
})
afterAll(()=>{
    db.end();
})

describe("GET /api/categories", ()=>{
    test("GET /api/categories responds with an array of category objects, each of which should have the following properties: slug, description", ()=>{
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then((res)=>{
            expect(res.body.categories).toHaveLength(4);
            expect(res.body.categories.forEach((category)=>{
                expect(category).toEqual(expect.objectContaining(
                    {slug:expect.any(String),
                    description: expect.any(String)}
                ))
            }))
        })
    })
})

describe("GET /api/:invalid endpoint", ()=>{
    test("Returns 404 error", ()=>{
        return request(app)
        .get('/api/invalid')
        .expect(404) 
        .then((res)=>{
            expect(res.body.msg).toBe("Invalid endpoint");
        })
    })
})

describe("GET /api/reviews/:review_id", ()=>{
    test("GET /api/reviews responds with a review object, which has the following keys: review_id, title, review_body, designer, review_img_url, votes, category, owner, create_at", ()=>{
        return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then((res)=>{
            expect(res.body[0]).toEqual(expect.objectContaining({
                review_id:1,
                title:'Agricola',
                review_body:'Farmyard fun!',
                designer: 'Uwe Rosenberg',
                review_img_url:'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                votes: 1,
                category:'euro game',
                owner:'mallionaire',
                created_at: '2021-01-18T10:00:20.514Z',
            }))
        })
    })
})

describe("GET /api/reviews/:invalid_endpoint", ()=>{
    test("GET /api/reviews/666", ()=>{
        return request(app)
        .get(`/api/reviews/666`)
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).toBe("review_id not found")
        })
    })
    test("STATUS 400: BAD REQUEST, GET /api/reviews/bananas", ()=>{
        return request(app)
        .get(`/api/reviews/bananas`)
        .expect(400)
        .then((res)=>{
            expect(res.body.msg).toBe("Bad request")
        })

    })
})
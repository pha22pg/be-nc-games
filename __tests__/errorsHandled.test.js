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

describe("GET /api/reviews/:review_id", ()=>{
    test("GET /api/reviews responds with a review object, which has the following keys: review_id, title, review_body, designer, review_img_url, votes, category, owner, create_at", ()=>{
        return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then((res)=>{
            

        })
    })
})
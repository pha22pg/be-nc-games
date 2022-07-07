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
            expect(res.body.msg).toEqual("Bad request")
        })

    })
})

describe("PATCH /api/reviews/:review_id, Request body accepts an object in the form { inc_votes: newVote } indicating how much the 'votes' property of the review is to be changed by", ()=>{
    test("PATCH /api/reviews/{review_id} changes the votes from 1 to 667 by adding inc_votes of 666", ()=>{
        return request(app)
        .patch(`/api/reviews/1`)
        .send({ inc_votes : 666 })
        .expect(200)
        .then((res)=>{
            expect(res.body.votes === 667);
        })
    })
    test("PATCH /api/reviews/:invalid_review_id returns STATUS 400", ()=>{
        return request(app)
        .patch(`/api/reviews/bananas`)
        .send({ inc_votes : 666 })
        .expect(400)
        .then((res)=>{
            expect(res.body.msg).toEqual("Bad request")
        })
    })
    test("PATCH /api/reviews/:unfound_review_id returns STATUS 404", ()=>{
        return request(app)
        .patch(`/api/reviews/100000000`)
        .send({ inc_votes : 666 })
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).toBe("review_id not found")
        })
    })
    test("PATCH /api/reviews/valid_id with an invalid object i.e. an empty object gives STATUS 400", ()=>{
        return request(app)
        .patch(`/api/reviews/100`)
        .send({ })
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).toBe("request object incorrectly formatted")
            
        })
    })
    test("PATCH /api/reviews/valid_id with an invalid object i.e. an object with a non-integer inc_votes value gives STATUS 400", ()=>{
        return request(app)
        .patch(`/api/reviews/1`)
        .send({inc_votes : 'melon'})
        .expect(400)
        .then((res)=>{
            expect(res.body.msg).toBe("Bad request")
            
        })
    })
  
})




describe.only("GET /api/reviews/:review_id/", ()=>{
    test("GET /api/reviews responds with a review object, which has an additional key, comment_count, with a value of the total number of comments with this review_id", ()=>{
        return request(app)
        .get('/api/reviews/2/comment_count')
        .expect(200)
        .then((res)=>{
            expect(res.body).toEqual(expect.objectContaining({
                comment_count: 3,
                title: 'Jenga',
                designer: 'Leslie Scott',
                owner: 'philippaclaire9',
                review_img_url:
                'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                review_body: 'Fiddly fun for all the family',
                category: 'dexterity',
                created_at: "2021-01-18T10:01:41.251Z",
                votes: 5
            }))
        })
    })
    test("GET /api/reviews/:invalid_review_ID/comment_count", ()=>{
        return request(app)
        .get('/api/reviews/bananas/comment_count')
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).toEqual("Invalid endpoint, review_id needs to be an integer")
        })
    })
    test("GET /api/reviews/:non_existant_review_ID/comment_count", ()=>{
        return request(app)
        .get('/api/reviews/10000/comment_count')
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).toBe("review_id not found")
        })
    })
    test("GET /api/reviews/review_ID/:invalid_path_end_point", ()=>{
        return request(app)
        .get('/api/reviews/2/banana_count')
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).toBe("Bad request")
        })
    })
})
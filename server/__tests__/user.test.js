const request = require('supertest')
const app = require('../app')
const {User} = require('../models')
const { signToken,verifyToken } = require('../helpers/jsonwebtoken')

beforeAll(async ()=>{
    await User.create({
        username : 'usertest1',
        email : 'useremail01@email.com',
        password : '123456'
    })
})

describe.skip("user routes test", ()=>{
    describe("POST /register - create new user", () =>{
        const user = {
            email : 'emailtester@email.com',
            username : 'usertester',
            password : '123456'
        }
        test("201 success register - should create new user" , (done)=>{
            request(app).post('/register').send(user).end((err,res)=>{
                if(err) return done(err);
                const {body,status} = res
                expect(status).toBe(201)
                expect(body).toHaveProperty('msg','registration successfully')
                return done()
            })
        });

        test("400 empty email - should return email is required", (done)=>{
            request(app).post('/register').send({
                email : "",
                username : 'usertest',
                password : '123456'
            }).end((err,res)=>{
                if(err) return done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','email is required')
                return done()
            })
        })

        test("400 wrong email format - should return wrong email format", (done)=>{
            request(app).post('/register').send({
                email : "iniemail",
                username : 'usertest',
                password : '123456'
            }).end((err,res)=>{
                if(err) return done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','invalid email format')
                return done()
            })
        })

        test("400 empty username - should return error 'username is required' ", (done)=>{
            request(app).post('/register').send({
                email : "emailtester@email.com",
                password : '123456'
            }).end((err,res)=>{
                if(err) return done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','username is required')
                return done()
            })
        })

        test("400 empty password - should return error 'password is required' ", (done)=>{
            request(app).post('/register').send({
                email : "emailtester@email.com",
                usrname : 'usertest'
            }).end((err,res)=>{
                if(err) return done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','password is required')
                return done()
            })
        })

        test("400 passsword less than 6 characters - should return error 'The password must have at least six characters' ", (done)=>{
            request(app).post('/register').send({
                email : "emailtester@email.com",
                username : 'usertest',
                password : '1234'
            }).end((err,res)=>{
                if(err) return done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','The password must have at least six characters')
                return done()
            })
        })

        test("400 same email - should return error 'email is not available' ", (done)=>{
            request(app).post('/register').send({
                email : "useremail01@email.com",
                username : 'usertest',
                password : '123456'
            }).end((err,res)=>{
                if(err) return done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','email is not available')
                return done()
            })
        })
    })
    describe("POST /login - user login", ()=>{
        test('200 success login - should return access_token',(done)=>{
            request(app).post('/login').send({
                email : 'useremail01@email.com',
                password : '123456'
            }).end(async (err,res)=>{
                if(err) done(err)
                const {body,status} = res
                const user = await User.findOne({
                    where:{
                        email:'useremail01@email.com'
                    }
                })
                const access_token = signToken({id:user.id})
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token',access_token)
                done()
            })
        })

        test('400 null email - should return error "email is reqiured" with code 400',(done)=>{
            request(app).post('/login').send({
                password : '123456'
            }).end((err,res)=>{
                if(err) done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','email is required')
                done()
            })
        })

        test('400 empty email - should return error "email is reqiured" with code 400',(done)=>{
            request(app).post('/login').send({
                email : "",
                password : '123456'
            }).end((err,res)=>{
                if(err) done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','email is required')
                done()
            })
        })

        test('400 format email invalid- should return error "invalid email format" with code 400',(done)=>{
            request(app).post('/login').send({
                email : "iniemail",
                password : '123456'
            }).end((err,res)=>{
                if(err) done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','invalid email format')
                done()
            })
        })

        test('400 null password- should return error "possword is required" with code 400',(done)=>{
            request(app).post('/login').send({
                email : "useremail01@email.com",
            }).end((err,res)=>{
                if(err) done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','password is required')
                done()
            })
        })

        test('400 empty password- should return error "possword is required" with code 400',(done)=>{
            request(app).post('/login').send({
                email : "useremail01@email.com",
                password : ""
            }).end((err,res)=>{
                if(err) done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','password is required')
                done()
            })
        })

        test('400 unregistered email- should return error "email/password is incorrect" with code 400',(done)=>{
            request(app).post('/login').send({
                email : "unregisteredemail@email.com",
                password : "123456"
            }).end((err,res)=>{
                if(err) done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','email/password is incorrect')
                done()
            })
        })

        test('400 wrong password- should return error "email/password is incorrect" with code 400',(done)=>{
            request(app).post('/login').send({
                email : "useremail01@email.com",
                password : "123455"
            }).end((err,res)=>{
                if(err) done(err)
                const {body,status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg','email/password is incorrect')
                done()
            })
        })
    })
})
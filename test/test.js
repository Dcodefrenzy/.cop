const request = require("supertest");
const {app} = require("../server/server.js");
const expect = require("expect");
const {admins} = require("../api/v1/admin/adminModel.js");

var email = "test3@gmail.com";
var name = "test name";
var level = 2;
var password = "myTestPassword";
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzAyZTY4ZWQ2YzFkZTFjMDdiYzczODAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ0MDQ5NjYzfQ.rGS5yKE0SSK0Iau2Moo-9SLLjyrCRsGxIKAUWFHqM-g";

beforeEach((done)=>{
	admins.remove({email}).then(()=> done());
})
describe('Admins POST, GET, PATCH', ()=>{

	describe('POST /admins', ()=>{
		it('should create an admin', (done)=>{
			
			request(app)
				.post('/api/v1/admins/register')
				.send({email, name, level, password})
				.set('x-auth', token)
				.expect(200)
				.expect((res)=>{
					expect(res.body.email).toBe(email);
					expect(res.body.name).toBe(name);
					expect(res.body.level).toBe(level);
					expect(res.body.password)
					expect(res.header.token);
				})
				.end((err, res)=>{
					if (err) {
						return done(err)
					}
					admins.find({email}).then((admin)=>{
						expect(admin)
						done();
					}).catch((e)=>{
						done(e);
					})
				})
			})/*end of it should create block*/
	
		it("Should return a 404", (done)=>{
			request(app)
				.post('/api/v1/admins/register')
				.send({})
				.expect(404)
				.end(done);
		}); //end of should return a 404.

		it("should return 404 and fail authorization", (done)=>{
			var email = "test3@gmail.com";
			var name = "test name";
			var level = 2;
			var password = "myTestPassword";
			var token = "fwjhvuhuo2w832uh24bc9c02reh";

			request(app)
				.post('/api/v1/admins/register')
				.send({email, name, level, password})
				.set('x-auth', token)
				.expect(404)
				.end(done);
		});//end of should return 404 and fail authentication.
	})/*end of POST describe block*/
	describe('GET /admins', ()=>{
		it('should return all admins', (done)=>{
			request(app)
				.get('/api/v1/admins')
				.set('x-auth', token)
				.expect(200)
				.expect((res)=>{
					expect(res)
				})
				.end((err, res)=>{
					if (err) {
						return done(err);
					}
					admins.find().then((admins)=>{
						expect(admins)
						done();
					}).catch((e)=>{
						done(e);
					});
				})//end
		})//end should return admins
		it('should login an admin', (done)=>{
			request(app)
			.post('/api/v1/admins/register')
			.send({email, name, level, password})
			.set('x-auth', token)
			.end((err, res)=>{
				if (err) {
					return done(err);
				}
				request(app)
					.post('/api/v1/admins/login')
					.send({email, password})
					.expect(200)
					.expect((res)=>{
						expect(res.body.email).toBe(email)
						expect(res.body.name).toBe(name)
						
					})
					.end((err, res)=>{
						if (err) {
							return done(err);
						}
						admins.find({email}).then((data)=>{

							expect(res)
							done();
						}).catch((e)=>{
							done(e);
						});
					}); //end of second.end block.
			}); //end of first .end block. 
		});//end of login block
	});//end of GET describe block
	describe('Update /admins', ()=>{
		it('should update admin', (done)=>{
			request(app)
				.post('/api/v1/admins/register')
				.send({email, name, level, password})
				.set('x-auth', token)
				.end((err, res)=>{
						id = res.body._id;
						token = res.body.tokens[0].token;
						var email = "test7@gmail.com";
						var name = "name test";
						var level = 1;
					request(app)
						.patch('/api/v1/admins/' + id)
						.send({email, name, level})
						.set('x-auth', token)
						.expect(200)
						.expect((res)=>{
							expect(res.body.email).toBe("test7@gmail.com")
							expect(res.body.name).toBe("name test")
							expect(res.body.level).toBe(1);
						})
						.end(done);
				});//end of first .end block.
		})//end of it should update admin block
	})//end of update block
});//end of general admins describe.

describe('Users Block', ()=>{
	describe('POST /users', ()=>{
		it('should create a user', (done)=>{

		email= "email@gmail.com",
		name= "user name",
		phonenumber= "08133475878",
		gender= "male",
		password= "usermail",
		userstatus= "active",		
			request(app)
				.post('/api/v1/users/register')
				.send({email, name, phonenumber, gender, password, userstatus})
				.set('x-auth', token)
				.expect(200)
				.expect((res)=>{
					expect(res.body.email).toBe(email);
					expect(res.body.name).toBe(name);
					expect(res.body.gender).toBe(gender);
					expect(res.body.userstatus).toBe("active")
				})
				.end((err, res)=>{
					if (err) {
						return done(err)
					}
					admins.find({email}).then((user)=>{
						expect(user)
						done();
					}).catch((e)=>{
						done(e);
					});
				});
		})/*end of it should create block*/
	}); //end of post block		
	describe('Get users', ()=>{
		it('should get all users', (done)=>{
			request(app)
				.get('/api/v1/users')
				.send()
				.set('x-auth', token)
				.expect(200)
				.end(done);
		});//end of it should get all users
	})// end of GET describe block
})//end of USERS block.
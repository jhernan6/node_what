'use strict';

var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000/api');

describe('Client', function(){
	
	it('should get all clients', function(done){
		api.get('/clients')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if (err){
					return done(err);
				}
				var clients = res.body;

				expect(clients.length).to.be.above(1);
				done();
			});
	});

	it('should get a single client',function(done){
		api.get('/clients/findOne')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res){
				if(err){
					return done(err);
				}
				var client = res.body;

				expect(Array.isArray(client)).to.be.false;
				done();
			});
	});
});
var app = require('./helpers/app');

var should = require('should');
var supertest = require('supertest');

describe('Flights test',function(){
	
	it('should return valid data for flght 18', function(done){
		supertest(app)
		.get('/flight/18')
		.end(function (err,res){
			res.status.should.equal(200);
			done();
		});
	});
	
	it('should return error for invalid flight', function(done){
		supertest(app)
		.get('/flight/38')
		.end(function (err, res){
			res.status.should.equal(404);
			done();
		});
	});

	it('should mark a flight as arrived',function(done){
		supertest(app)
		.put('/flight/18/arrived')
		.end(function (err, res){
			res.status.should.equal(200);
			res.body.status.should.equal('Done');

			supertest(app)
			.get('/flight/18')
			.end(function (err, res){
				res.status.should.equal(200);
				res.body.actualArrive.should.not.equal(undefined);
				done();
			});
		});
	});
});

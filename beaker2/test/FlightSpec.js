var app = require('./helpers/app');

var should = require('should');
var supertest = require('supertest');

describe('Flights test',function(){
	
	it('should pass', function(done){
		done();
	});
	
	it('should not pass', function(done){
		throw "Don't pass";
		done();
	});
});

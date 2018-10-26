const mongoose = require('mongoose');
const User = require('../app/db/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const request = require('supertest');
const expect = require('chai').expect;
const sinon = require('sinon');

chai.use(chaiHttp);

const admin = {
    'email': 'admin@admin.com',
    'username': 'admin',
    'password': 'admin',
    'profile.firstName': 'Admin',
    'profile.lastName': 'Adminowski',
    'profile.address': 'Adminstr. 93, 45548 Horovod',
    'profile.birthday': '12.03.1996',
    'status': 'admin'
};

const member = {
    'email': '1@member.com',
    'username': 'member',
    'password': 'member',
    'profile.firstName': 'Member',
    'profile.lastName': 'Memberowski',
    'profile.address': 'Memberstr. 93, 45548 Horovod',
    'profile.birthday': '12.03.1996',
    'status': 'member'
};

const member2 = {
    'email': '2@member.com',
    'username': 'member2',
    'password': 'member2',
    'profile.firstName': 'Member',
    'profile.lastName': 'Memberowski-Memberski',
    'profile.address': 'Memberstr. 94, 45548 Horovod',
    'profile.birthday': '12.03.1996',
    'status': 'member'
};

const guest = {
    'email': '1@guest.com',
    'username': 'guest',
    'password': 'guest',
    'profile.firstName': 'Guest',
    'profile.lastName': 'Guestowski',
    'profile.address': 'Gueststr. 93, 45548 Horovod',
    'profile.birthday': '12.03.1996',
    'status': 'guest'
};

var adminToken = '';
var member1Token = '';
var member2Token = '';
var guestToken = '';

// before(async (done) => {
//     await User.deleteMany({});
//     await User.create(admin);
//     await User.create(member);
//     await User.create(member2);
//     await User.create(guest);
//     return done();
// });
// Empty up the database

// get JWT token of admin
// describe('## root user', () => {
//     it('should get valid JWT token for admin', () => {
//         request(server).post('/api/auth/login').send({
//             username: admin.username,
//             password: admin.password
//         }).expect(200).then((res) => {
//             expect(res.body).to.have.property('token');
//             adminToken = `Bearer ${res.body.token}`;
//             console.log(adminToken);
//         })
//     })
// });

// before(() => {
//     it('should get valid JWT token for admin', () => {
//         request(server).post('/api/auth/login').send({
//             username: admin.username,
//             password: admin.password
//         }).expect(200).then((res) => {
//             expect(res.body).to.have.property('token');
//             adminToken = `Bearer ${res.body.token}`;
//             console.log(adminToken);
//         })
//     })
// });
describe('Users', () => {

    beforeEach((done) => {
        request(server).post('/api/auth/login').send({
            username: admin.username,
            password: admin.password
        }).expect(200).then((res) => {
            expect(res.body).to.have.property('token');
            adminToken = `Bearer ${res.body.token}`;
            done();
        })
    });
    describe('/GET users', () => {
        it('it should GET all users', (done) => {
            chai.request(server).get('/api/users').set('authorization', adminToken).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(4);
                done();
            });
        });
    });
});
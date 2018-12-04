const { Given, When, Then } = require('cucumber');

const chai = require('chai');
const chaiExclude = require('chai-exclude');
chai.use(chaiExclude);
const { expect } = chai;
const supertest = require('supertest');
const { getRandomElement, getCommentList } = require('../../e2e/utils');

// Comment list
When('I get the Comment list', function() {
  const url = '/comments';
  this.request = supertest(global.url)
    .get(url)
    .set(this.headers);
});

Then('I should get the complete Comment list', async function() {
  this.response = await this.request
    .expect(200)
    .expect('content-type', /^application\/json;?/);
  expect(this.response.body).to.be.an('array');
  expect(this.response.body).to.have.lengthOf(getCommentList().length);
});

// Comments
Given('a new Comment {string}', function(v) {
  const data = { message: 'Test comment' };
  this.setVariable(v, data);
});

When('I get the Comment {string}', function(v) {
  const id = this.getVariable(v);
  const url = `/comments/${id}`;
  this.request = supertest(global.url)
    .get(url)
    .set(this.headers);
});
When('I create the Comment {string}', function(v) {
  const url = '/comments';
  const data = this.getVariable(v);
  this.request = supertest(global.url)
    .post(url)
    .set(this.headers)
    .send(data);
});
When('I update the Comment {string} with {string}', function(v1, v2) {
  const url = '/comments/' + this.getVariable(v1);
  const data = this.getVariable(v2);
  this.request = supertest(global.url)
    .patch(url)
    .set(this.headers)
    .send(data);
});
When('I replace the Comment {string} with {string}', function(v1, v2) {
  const url = '/comments/' + this.getVariable(v1);
  const data = this.getVariable(v2);
  this.request = supertest(global.url)
    .put(url)
    .set(this.headers)
    .send(data);
});
When('I delete the Comment {string}', function(v) {
  const url = '/comments/' + this.getVariable(v);
  this.request = supertest(global.url)
    .delete(url)
    .set(this.headers);
});

Then('I should get the Comment {string}', async function(v) {
  this.response = await this.request
    .expect(200)
    .expect('content-type', /^application\/json;?/);
  expect(this.response.body).to.be.an('object');
  this.setVariable(v, this.response.body);
});
Then('the Comment should be created as {string}', async function(v) {
  this.response = await this.request
    .expect(201)
    .expect('content-type', /^application\/json;?/);
  expect(this.response.body).to.be.an('object');
  this.setVariable(v, this.response.body);
});
Then('the Comment should be updated as {string}', async function(v) {
  this.response = await this.request
    .expect(200)
    .expect('content-type', /^application\/json;?/);
  expect(this.response.body).to.be.an('object');
  this.setVariable(v, this.response.body);
});
Then('the Comment should be replaced as {string}', async function(v) {
  this.response = await this.request
    .expect(200)
    .expect('content-type', /^application\/json;?/);
  expect(this.response.body).to.be.an('object');
  this.setVariable(v, this.response.body);
});
Then('the Comment should not be created', async function() {
  this.response = await this.request.expect(500);
});

Then('the Comment {string} should equal the Comment {string}', function(
  v1,
  v2
) {
  const comment1 = this.getVariable(v1);
  const comment2 = this.getVariable(v2);
  expect(comment1)
    .excluding('id')
    .to.deep.equal(comment2);
});
Then('the Comment {string} should include the Comment {string}', function(
  v1,
  v2
) {
  const comment1 = this.getVariable(v1);
  const comment2 = this.getVariable(v2);
  expect(comment1).to.include(comment2);
});

// Comment Ids
Given('an existing Comment Id {string}', function(v) {
  const comment = getRandomElement(db.comments);
  this.setVariable(v, comment.id);
});
Given('an unknown Comment Id {string}', function(v) {
  this.setVariable(v, 9999);
});
Given('the Comment Id {string} of the Comment {string}', function(v1, v2) {
  const comment = this.getVariable(v2);
  this.setVariable(v1, comment.id);
});

Then('the Comment Id {string} should equal the Comment Id {string}', function(
  v1,
  v2
) {
  const id1 = this.getVariable(v1);
  const id2 = this.getVariable(v2);
  expect(id1).to.equal(id2);
});

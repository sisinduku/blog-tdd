const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Article = require('../models/article');

let should = chai.should();

chai.use(chaiHttp)

describe('API Article', () => {
  describe('GET API', () => {
    before(function(done) {
      Article.remove({})
        .then(removed => {
          Article.create([{
              articleID: 'AAIII',
              title: 'Foo',
              content: 'THIS IS CONTENT',
              author: '123321123312',
            }, {
              articleID: 'AAUUU',
              title: 'Bar',
              content: 'THIS IS CONTENT',
              author: '123321121231',
            }])
            .then((inserted) => {
              done();
            })
        })
    });

    after((done) => {
      Article.remove({})
        .then(removed => {
          done()
        })
    });

    it('It should return all arricles', (done) => {
      let obj = [{
        articleID: 'AAIII',
        title: 'Foo',
        content: 'THIS IS CONTENT',
        author: '123321123312',
      }, {
        articleID: 'AAUUU',
        title: 'Bar',
        content: 'THIS IS CONTENT',
        author: '123321121231',
      }];

      chai.request(app)
        .get('/api/article/get_article')
        .send()
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.lengthOf(2);
          response.body.forEach((element, index) => {
            element.should.have.property('_id');
            element.should.have.property('articleID');
            element.should.have.property('title');
            element.should.have.property('content');
            element.should.have.property('author');
            element.should.have.property('createdAt');
            element.articleID.should.equal(obj[index].articleID);
            element.title.should.equal(obj[index].title);
            element.content.should.equal(obj[index].content);
            element.author.should.equal(obj[index].author);
          })
          done();
        })
    });

    it('It should return specific article which parameter specified', (done) => {
      chai.request(app)
        .get('/api/article/get_article/AAIII')
        .send()
        .end(function(err, response) {
          if (err)
            console.log(err.text);
          response.status.should.equal(200);
          response.body.should.be.an('array');
          response.body.should.have.lengthOf(1);
          response.body[0].should.have.property('_id');
          response.body[0].should.have.property('articleID');
          response.body[0].should.have.property('title');
          response.body[0].should.have.property('content');
          response.body[0].should.have.property('author');
          response.body[0].should.have.property('createdAt');
          response.body[0].articleID.should.equal('AAIII');
          response.body[0].title.should.equal('Foo');
          response.body[0].content.should.equal('THIS IS CONTENT');
          response.body[0].author.should.equal('123321123312');
          done();
        })
    });
  });
  before((done) => {
    Article.remove({})
      .then(removed => {
        done()
      })
  });
  after((done) => {
    Article.remove({})
      .then(removed => {
        done()
      })
  });
});
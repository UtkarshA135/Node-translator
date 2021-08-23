let chai = require('chai');
let chaiHttp = require('chai-http')
let server = require('./index');

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Translate API ', ()=>{
/*{
GET the translated word of the target language
 }*/
describe('GET /translate/:word/:language',()=>{
    it("It should GET the translated word of the target language",(done)=>{
        chai.request(server)
        .get('/translate/Hello/hi') //  word : Hello ; totranslate : hindi(hi)
        .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('string');
               
                done();
        })
    })
    it('It should not  GET the translated word of the target language',(done)=>{
        chai.request(server)
        .get('/translate/Hello/hn') //  word : Hello ; totranslate : Hindi (hn) : wrong language code given
        .end((err,response)=>{
                response.body.should.be.eql({});           
                done();
        })
    })
})
})
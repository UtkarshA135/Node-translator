# Node-translator
- A node.js translator which uses Bing Translation API in the background , stores the translation results in cache memory to prevent regular hits to API .
- Also implemented smart pre-caching. This means we assume that if a user translates a text into Kannada, he is 
likely to also translate the same text to Hindi. Therefore we want to not only request Kannada from the external service 
but also other languages like Hindi, Tamil, etc. and store it in our cache.

# Design Decisions 
- Used Bing Translation API over Google Translations , since the latter asked for a billing .
- Used Node cache over redis , since the latter asked for Redis cloud billing .
- dev-dependencies :
```
    "bing-translate-api": "^2.2.0",
    "chai": "^4.3.4",
    "chai-http": "^4.3.0",
    "express": "^4.17.1",
    "mocha": "^9.1.0",
    "node-cache": "^5.1.2"
```
# How to Setup & Run the Server
- Clone the repo 
- Install node modules : ``` npm install```
- Run ``` node index.js ```
- Go to ```localhost :8080```
- Base Url  is ``` \translate\:word\:language```
- Replace ```:word``` with any word of your choice and ```:language``` with the target language code , see all lang code [here](https://github.com/plainheart/bing-translate-api/blob/master/src/lang.js)
- For Example : ```localhost:8080\translate\Bonjour\en```
- Above will result in "Hello" on the screen 

# Testing
- Used well known testing frameworks ```mocha and chai ``` to test the RESTful API.
- Just run ``` npm test ``` to test the API.
- Two types of test :

   One where input is correct -
   ```
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
    ```
  Secondly , when the input (like lang code isn't correct) -
 

      it('It should not  GET the translated word of the target language',(done)=>{
         chai.request(server)
         .get('/translate/Hello/hn') //  word : Hello ; totranslate : Hindi (hn) : wrong language code given
         .end((err,response)=>{
                 response.body.should.be.eql({});           
                 done();
         })
     }) 

- Assertion style used - ``` chai.should() ```
# Cache Datbase Schema 
- Used ``` node-cache ``` which stores data as key-value pair
- For key , I made a JavaScipt Object :
 ```
   var obj = {
    text : req.params.word,
    toTranslate : req.params.language,
       }
 ```
 - I did JSON.stringify(obj) and store this as key
 - For value , I am storing ``` res.translation```
 - In built node-cache methods - 
 
   ```myCache.has(str)``` : Checks if cache has this particular word stored in memory and returns a boolean
   
   ```myCache.get(str)``` : Retrieves the value from the cache 
   
   ```myCache.set(str, res.translation)``` :  Stores a key-value pair in the cache memory.

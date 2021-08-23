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


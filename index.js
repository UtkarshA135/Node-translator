var express = require("express");
const { translate } = require('bing-translate-api');
var app = express();
const NodeCache = require( "node-cache" ); // prefered node-cache over redis , due to some redis cloud issues
const myCache = new NodeCache(); 
//const translate = require('google-translate-api'); // Earlier decided to use Google Translatations but was asking for billing :/
const langArray = require('./languages.js');
app.get("/translate/:word/:language",  function (req, r)  { // GET method with two params : word and target language
  var obj = {
    text : req.params.word,
    toTranslate : req.params.language,
}
 var str =  JSON.stringify(obj);

    if(myCache.has(str)) { // check if the word already exists in cache in memory
        console.log('Retrieved value from cache !!')
          
        // Serve response from cache using
        // myCache.get(key)

         r.json( myCache.get(str)) 
   }else{

        // Perform operation, since cache 
        // doesn't have key
        let ar=[];
        langArray.forEach(function (lang){
         if(lang.includes(req.params.language))  
         ar=lang;
        })
        //let ar = langArray[req.params.language];
        if(ar!=null)
    {   smartCaching(req.params.word,ar);} // smart - pre caching (bonus task)
        try{  translate(req.params.word, null, req.params.language, true).then(res => {
         
            
            myCache.set(str, res.translation)
          
            console.log('Value not present in cache,'
                  + ' performing computation')
         //   r.send("Result: " + res.translation)
           r.json(res.translation);

          }).catch(err => {
            r.json(err);
          }
          )}
          catch(e){
            console.log(e);
            res.send(500);
          }
        }
  
        // Set value for same key, in order to 
        // serve future requests efficiently
       
   }
) 
function smartCaching(word,arr)
{

  arr.map(x=>{
    var obj = {
      text : word,
      toTranslate : x,
  }
   var str =  JSON.stringify(obj);
   try{  translate(word, null, x, true).then(res => {
         
            
    myCache.set(str, res.translation)
  
    console.log('Value not present in cache,'
          + ' performing computation')
 //   r.send("Result: " + res.translation)
   //r.json(res.translation);

  }).catch(err => {
   console.log(err);
  }
  )}
  catch(e){
    console.log(e);
    res.send(500);
  }
  })
}
var server = app.listen(8080,function(req, res){
console.log("Server running on port 8080");
})
module.exports = server

# Node-translator
- A node.js translator which uses Bing Translation API in the background , stores the translation results in cache memory to prevent regular hits to API .
- Also implemented smart pre-caching. This means we assume that if a user translates a text into Kannada, he is 
likely to also translate the same text to Hindi. Therefore we want to not only request Kannada from the external service 
but also other languages like Hindi, Tamil, etc. and store it in our cache.

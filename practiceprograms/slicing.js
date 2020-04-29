//mycode

var tweet=prompt("compose your tweet:");
tweet.padStart(150,".");
var tweetcount=tweet.length;
tweet.slice (0,139);
console.log(tweetcount)
console.log(tweet)
//alert ("you have written " + tweetcount + " characters you have " + (140 - tweetcount)+ " characters remaining"); 

//angelas code
var tweet=prompt("compose your tweet");
var tweetunder140=tweet.slice()
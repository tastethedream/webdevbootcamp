prompt ("Enter your name");
prompt (" Enter the name of your match")



var score = Math.random();
score = score * 100;
score = Math.floor(score) +1;

if (score > 70) {
    alert ("Your love score is " + score + "%" + " you are so in love!");
}

if (score > 30 && score <= 70){
    alert ("Your love score is " + score + "%");
}

if (score <= 30){
    alert ("Your love score is " + score + "%" + " It is not meant to be");
} 


/*} else{
alert ("Your love score is " + score + "%");*/

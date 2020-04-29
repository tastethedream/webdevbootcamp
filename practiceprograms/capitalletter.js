//step 1 create a var that stores the name that the user enters via a prompt.
var name =prompt ("What is your name?");

//step 2 capitalise the first letter of their name.

//iscolate the first character.
var firstchar=name.slice(0,1);

//Turn the ifirst character in to a capital letter.
var upperCasefirstChar=firstchar.toUpperCase();

//Iscolate the rest of the name.

var restOfName=name.slice(1,name.length);

//change rest of the name to lower case.

restOfName=restOfName.toLowerCase();

//Concactenate first character with the rest of the characters.

var capitalisedName= upperCasefirstChar+restOfName;

//step 3 Use the capitalised versionof their name to greet them with an alert.
alert("Hello " +  capitalisedName);


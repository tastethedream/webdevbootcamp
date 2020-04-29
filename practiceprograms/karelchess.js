/**
 * Welcome to the Stanford Karel IDE.
 * This is a free space for you to 
 * write any Karel program you want.
 **/
function main(){
   
   chessLine1();
   move();
   chessLine2();
   move();
   chessLine1();
   move();
   chessLine2();
   move();
   chessLine1();
   move();

}

function chessLine1(){
   
   putBeeper();
   turnLeft();
   move();
   move();
   putBeeper();
   move();
   move();
   putBeeper();
   turnRight();
   


   
}

function chessLine2(){
   turnRight();
   move();
   putBeeper();
   move();
   move();
   putBeeper();
   move();
   turnLeft();
  
   
} 
   
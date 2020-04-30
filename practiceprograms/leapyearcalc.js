function isLeap(year) {


    if (year % 4 !== 0) {
    
            return ('Not leap year.');
    }
    else if (year % 4 === 0 && year % 100 !==0){
    
         return ('Leap year.');
    }
    
    else if (year % 100 === 0 && year % 400 === 0 && year % 4 === 0) {
    
            return ('Leap year.');
    
    } else{
    
        
            return ('Not leap year.');
    }
    
    
    
    
    }
    isLeap(2012);
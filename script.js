const birthDate = document.querySelector("#birth-date");
const calcPalindrome = document.querySelector("#calc");
const outputVal = document.querySelector("#output");

calcPalindrome.addEventListener("click", clickHandler)
function strReverse(str)
{
  var listOfChars = str.split('');
  var reverseListOfChars = listOfChars.reverse();
  var reversedStr = reverseListOfChars.join('');
  return reversedStr;

}

function isPalindrome(str)
{ var reverse = strReverse(str);
  return str === reverse; 
}

function convertDatetoStr(date)
{
  
  var dateStr = 
  {day: '',
   month: '', 
   year: '' }
   ;

  if(date.day < 10)
  {
    
    dateStr.day = '0' +  date.day
  }
  else{
    dateStr.day =  date.day.toString()
  }
 
  if(date.month < 10)
  {
    
    dateStr.month =   '0' + date.month
  }
  else{
    dateStr.month =  date.month.toString()
  }
  
    dateStr.year = date.year.toString();
  
  return dateStr;
  console.log(dateStr);
}



function getAllDateFormats(date)
{
var dateStr = convertDatetoStr(date);
var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month +
  dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function isLeapYear(year)
{
  if(year % 400 === 0)
  {
    return true;
  }
  if(year % 100 === 0)
  {
    return false;
  }
  if(year % 4 === 0)
  {
    return true;
  }
  return false;
}

function getNextDate(date)
{
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 31, 30, 30, 31];

  if (month === 2)
  {
    if (isLeapYear(year))
    {
      if (day>29)
      {
        day = 1;
        month++;
      }
    }
    else {
      if (day > 28){
      day = 1;
      month++;
    }
    }
  }
      else 
      {
        if (day > daysInMonth[month - 1])
        {
          day = 1;
          month++;
        }
      } 
      if (month > 12)
      {
        month = 1;
        year++;
      }
      return {
        day: day,
        month: month,
        year: year
      };
}

function checkPalindromeForAllDateFormats(date)
{
  
  var listOfAllPalindrome = getAllDateFormats(date)
  var flag = false;
  for (let i=0; i<listOfAllPalindrome.length; i++)
  
  {
    if (isPalindrome(listOfAllPalindrome[i]))
    {
    flag = true;
    break;
    }
  }
  return flag; 
}
function getNextPalindromeDate(date){
  var ctr = 0;
  var nextDate = getNextDate(date);

  while(1){
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if(isPalindrome){
      
      break;
    }
     
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function getPrevDate(date)
{
  
  var day = date.day;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   if (month === 3)
   {
    if (isLeapYear(year))
    {
      if (day === 1)
      {
        
        day = daysInMonth[month-2] + 1;
        month--;    
    }
   }
   else { if(day>1)
        {
          
          day = daysInMonth[month-2];
          month--
        }
        }
   }
    else{
     if (month === 1 && day === 1)
      {
        
        month = 12;
        day = 31;
        year--;
      }
    }
  if (day === 1)
  {
    
    month --;
    day = daysInMonth[month-1];
  }
  else {
        
  if (day >= daysInMonth[month-1])
      {
        
        day--;
        month.date = month;
      }
      else{
        
        day--;
      }
             }
  
  
      
    
    
           return {
        day: day,
        month: month,
        year: year
      }
}

function getPrevPalindromeDate(date){
  
  var ctr = 0;
  var prevDate = getPrevDate(date);

  while(1){
    ctr--;
    var isPalindrome = checkPalindromeForAllDateFormats(prevDate);
    if(isPalindrome){
  
      break;
    }
  
    prevDate = getPrevDate(prevDate);
  }
  return [ctr, prevDate];
}

function clickHandler(e){
  var birthStr = birthDate.value;
  if (birthStr !== '')
  {
    var listOfDate = birthStr.split('-');
    
    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])

    }
    var isPalindrome = checkPalindromeForAllDateFormats(date);
    console.log(isPalindrome);
    if(isPalindrome)
    {
    outputVal.innerText = "Yay!It's a Palindrome";
    }
    else
    {
     var [ctr, nextDate] = getNextPalindromeDate(date);
     console.log(nextDate);
      
      outputVal.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!`
    }
  }
}



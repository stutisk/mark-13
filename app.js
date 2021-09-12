const inputRef = document.querySelector("#inputDate");
const btnshow = document.querySelector("#btn-show");
const outPut = document.querySelector("#output");
const datesInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];


function isPalindrome(str) {
  var reversedStr = str.split("").reverse().join("");
  return reversedStr === str;
}

function convertDateToStr(date) {
  var dateStr = {
      day: "",
      month: "",
      year: ""
  };

 dateStr.day = date.day.toString();
 dateStr.month = date.month.toString();
 dateStr.year = date.year.toString();
 return dateStr;
};

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);
  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy];
};

function checkPalindromeForAllDateFormats(date) {
  var listofPalindromes = getAllDateFormats(date);
  for (var i = 0; i < listofPalindromes.length; i++) {
      if (isPalindrome(listofPalindromes[i])) {
          return listofPalindromes[i];
      }
  }
  return null;
};

function findNextPalindrome(date) {
  let ddNo1= Number(date.day);
  let mmNo1= Number(date.month);
  let yyNo1=Number(date.year);
  
  for(let i = 1; i > 0; i++) {
    ddNo1 = ddNo1+1;
      if(ddNo1 > Number(datesInMonth[mmNo1-1])){
          ddNo1 = 1;
          mmNo1 = mmNo1+1;
          if(mmNo1 > 12){
              mmNo1 = 1;
              yyNo1 = yyNo1+1;
          }
      }
      let yyString = yyNo1.toString();
      let mmString = mmNo1.toString();
      let ddString = ddNo1.toString();
    
      let dateObj = {
        day: yyString,
        month: mmString,
        year: ddString
      }
      if(mmString.length==1){
          mmString="0"+mmString;
      }
      if(ddString.length==1){
          ddString="0"+ddString;
      }
      let setFlagNextDate = checkPalindromeForAllDateFormats(dateObj);
      if(setFlagNextDate){
          console.log(setFlagNextDate, i);
          return [`${setFlagNextDate}`, i];
      }
  }
}


function clickHandler() {
  var bdayStr = inputRef.value;
  var listOfDate = bdayStr.split("-");

  if (bdayStr === "") {
    return output.innerText = 'Please input!';
  }

   let date = {
     day: listOfDate[2],
     month: listOfDate[1],
     year: listOfDate[0]
   }
   

   var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
        outPut.innerText = "yahhh your birthday is a palindromee";
    } else {
      findNextPalindrome(date);
      output.innerText = 'Your birthday is not a palindrome.'
    }
}

btnshow.addEventListener("click", clickHandler);
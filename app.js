const inputRef = document.querySelector("#inputDate");
const btnshow = document.querySelector("#btn-show");
const outPut = document.querySelector("#output");

function reverseStr(str) {
    var listofChars = str.split("");
    var reverselistofChars = listofChars.reverse();
    var reversedStr = reverselistofChars.join();
    return reversedStr;

};

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;

}

function convertDateToStr(date) {
    var dateStr = {
        day: "",
        month: "",
        year: ""
    };
    if (date.day < 10) {
        dateStr.day = "0" + date.day
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
};

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

function checkPalindromeForAllDateFormats(date) {
    var listofPalindromes = getAllDateFormats(date);
    var flag = false;
    for (var i = 0; i < listofPalindromes.length; i++) {
        if (isPalindrome(listofPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
};

function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
};



// to get the next date
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    // days in month 
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // check for feb month
    if (month === 2) {
        // if its leap year
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }

    }
    if (month > 12) {
        month = 1;
        year++;

    }
    return {
        day: day,
        month: month,
        year: year,
    };
};

//  leap year 
function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;

    }
    if (year % 4 === 0) {

        return true;
    }
    return false;
};





function clickHandler(e) {
    var bdayStr = inputRef.value;

    if (bdayStr !== "") {
        var listOfDate = bdayStr.split("-");
        

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0]),
        };

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {

            outPut.innerText = "yahhh yur birthday is a palindromee";
        } 
        else {
            var [ctr , nextDate] = getNextPalindromeDate(date);

            outPut.innerText = "The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days!";

        }
    } 
}
    btnshow.addEventListener("click", clickHandler);

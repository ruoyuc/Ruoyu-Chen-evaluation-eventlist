//Q1
function reverseNumber(n) {
  return n.toString().split("").reverse().join("");
}
//console.log(reverseNumber(32243));

//Q2
function checkPalindrome(str) {
  const reversed = str.split("").reverse().join("");
  return str == reversed;
}
//console.log(checkPalindrome("madam"));

//Q3

function generateCombination(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.slice(i, j));
    }
  }
  return result;
}
//console.log(generateCombination("dog"));

//Q4

function sortString(str) {
  return str.split("").sort().join("");
}
//console.log(sortString("webmaster"));

//Q5
function capitalize(str) {
  let arr = str.split(" ");
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i].charAt(0).toUpperCase() + arr[i].slice(1));
  }
  return result.join(" ");
}
const str = "the quick brown fox";
//console.log(capitalize(str));

//Q6
function longestWord(str) {
  const arr = str.split(" ");
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (result.length < arr[i].length) {
      result = arr[i];
    }
  }
  return result;
}
//console.log(longestWord("Web Development Tutorial"));

//Q7
function conuntVowels(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }
  return count;
}
//console.log(conuntVowels("The quick brown fox"));

//Q8
function isPrime(n) {
  if (n <= 1) {
    return false;
  } else {
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
}
// console.log(isPrime(2));true
// console.log(isPrime(4)); false
// console.log(isPrime(19)); true

//Q9
function typeOfArgument(arg) {
  return typeof arg;
}
//console.log(typeOfArgument(null));

//Q10
function identityMatrix(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    result.push(row);
  }
  return result;
}
//console.log(identityMatrix(3));

//Q11
function secondLowestSecondGreatest(array) {
  array.sort((a, b) => a - b); // It need array.sort((a, b) => a - b) to sort number
  let result = [];
  result.push(array[1], array[array.length - 2]);
  return result.toString();
}
//console.log(secondLowestSecondGreatest([1, 2, 3, 4, 5]));

//Q12
function perfectNumber(n) {
  let sum = 0;
  for (let i = 1; i < n; i++) {
    if (n % i === 0) {
      sum += i;
    }
  }
  return sum === n;
}
//console.log(perfectNumber(6));

//Q13
function factors(n) {
  let result = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      result.push(i);
      if (i !== n / i) {
        result.push(n / i);
      }
    }
  }
  return result.sort((a, b) => a - b);
}
// console.log(factors(14));
// console.log(factors(16));
// console.log(factors(19));

//Q14
function amountTocoins(amount, coins) {
  let result = [];
  for (let i = 0; i < coins.length; i++) {
    while (amount >= coins[i]) {
      result.push(coins[i]);
      amount -= coins[i];
    }
  }
  return result;
}
console.log(amountTocoins(46, [25, 10, 5, 2, 1]));

//Q15
function compute(b, n) {
  return b ** n;
}

//console.log(compute(2, 10));

//Q16
function uniqueCharacters(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    if (!result.includes(str[i])) {
      result.push(str[i]);
    }
  }
  return result.join("");
}
//console.log(uniqueCharacters("thequickbrownfoxjumpsoverthelazydog"));

//Q17
function countLetters(str) {
  let result = {};
  for (let i = 0; i < str.length; i++) {
    if (result[str[i]]) {
      result[str[i]]++;
    } else {
      result[str[i]] = 1;
    }
  }
  return result;
}

//Q18
function binarySearch(arr, x) {
  let start = 0,
    end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === x) {
      return mid;
    } else if (arr[mid] < x) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
}

//Q19
function largerThanNumber(arr, n) {
  return arr.filter((item) => item > n);
}
//console.log(largerThanNumber([1,2,3,4,5,6,7,8,9,10],5));

//Q20
function generateId(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

//Q21
function getFixedLengthSubset(array, length) {
  let result = [];
  function helper(arr, temp, index) {
    if (temp.length === length) {
      result.push(temp);
      return;
    }
    for (let i = index; i < arr.length; i++) {
      helper(arr, temp.concat(arr[i]), i + 1);
    }
  }

  helper(array, [], 0);
  return result;
}
//console.log(getFixedLengthSubset([1,2,3],2));

//Q22
function countOccurrences(str, n) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === n) {
      count++;
    }
  }
  return count;
}
//console.log(countOccurrences('microsoft.com', 'o'));

//Q23
function getFirstNotRepeatLetter(str) {
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    if (str.indexOf(char) === i && str.indexOf(char, i + 1) === -1) {
      return char;
    }
  }
  return null;
}
//console.log(getFirstNotRepeatLetter('abacddbec'));

//Q24
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
//console.log(bubbleSort([5, 3, 8, 4, 6]));

//Q25
function Longest_Country_Name(arr) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].length > result.length) {
      result = arr[i];
    }
  }
  return result;
}
//console.log(Longest_Country_Name(["Australia", "Germany", "United States of America"]));

//Q26
function longestSubstr(str) {
  let result = "";
  let temp = "";

  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    let index = temp.indexOf(char);
    if (index > -1) {
      temp = temp.substring(index + 1);
    }
    temp += char;
    if (temp.length > result.length) {
      result = temp;
    }
  }
  return result;
}
//console.log(longestSubstr("abcabcbb"));

//Q27
function longestPalindrome(str) {
  let result = "";
  function isPalidrome(s) {
    return s === s.split("").reverse().join("");
  }
  for (let i = 0; i < str.length; i++) {
    for (j = i + 1; j <= str.length; j++) {
      let sub = str.substring(i, j);
      if (isPalidrome(sub) && sub.length > result.length) {
        result = sub;
      }
    }
  }
  return result;
}
//console.log(longestPalindrome("bananas"));

//Q28
function helloworld(name) {
  return "Hello World from " + name;
}
function process(func, value) {
  console.log(func(value));
}
//process(helloworld, "Brendan Eich");

//Q29
function getFunctionName(func) {
  return func.name;
}

function example() {}
//console.log(getFunctionName(example));

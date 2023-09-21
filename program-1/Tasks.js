////////////////////////////////////////////1/////////////////////////////////////////

// Write a program to sort a string according to the frequency of character and return the final string.
function sortString(str) {
  let freq = {};
  let arr = str.split("");
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    // Count the frequency of each character in the string
    if (freq[arr[i]]) {
      freq[arr[i]]++;
    } else {
      freq[arr[i]] = 1;
    }
  }
  // Sort the characters in descending order of frequency
  let sortedArr = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  // Build the final string by repeating each character according to its frequency
  for (let i = 0; i < sortedArr.length; i++) {
    result += sortedArr[i][0].repeat(sortedArr[i][1]);
  }
  return result;
}

// Create test script covering all scenarios (min 5 test cases)
// Test cases for different input strings
console.log(sortString("hello")); // should return llohe
console.log(sortString("good")); // should return oodg
console.log(sortString("Programming")); // should return gggrrmmPaino
console.log(sortString("Javascript")); // should return aijJpstvrc
console.log(sortString("Web Development")); // should return eeeevWblopmtDn

////////////////////////////////////////2/////////////////////////////////////

// Define a function to find the best days to buy and sell stocks to maximize profit, given an array of stock prices. Return the maximum profit that can be made. If no profit can be made, return -1.
function maxProfit(arr) {
  let profit = 0;
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    // Find the minimum stock price so far
    if (arr[i] < min) min = arr[i];
    // Calculate the maximum profit that can be made by selling the stock on the current day
    if (arr[i] - min > profit) profit = arr[i] - min;
  }
  // If no profit can be made, return -1
  if (profit === 0) return -1;
  return profit;
}

// Create test script covering all scenarios (min 5 test cases)
// Test cases for different input arrays
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // should return 5
console.log(maxProfit([7, 6, 4, 3, 1])); // should return -1
console.log(maxProfit([2, 4, 1])); // should return 2
console.log(maxProfit([3, 2, 6, 5, 0, 3])); // should return 4
console.log(maxProfit([1, 2])); // should return 1

///////////////////////////////////////3/////////////////////////////////////////

// Write a program to validate an IP address. Given a string, write a function to check if it is a valid IP address or not. If valid, return true, otherwise return false.
function validateIP(str) {
  try {
    let arr = str.split(".");
    // Check if the IP address has 4 parts
    if (arr.length !== 4) throw new Error("Invalid IP address");
    for (let i = 0; i < arr.length; i++) {
      // Check if each part is a number between 0 and 255
      if (arr[i] < 0 || arr[i] > 255) throw new Error("Invalid IP address");
    }
    return true;
  } catch (err) {
    // Log the error message to the console
    console.error(err.message);
    return false;
  }
}

// Create test script covering all scenarios (min 5 test cases)
// Test cases for different input strings
console.log(validateIP("192.168.0.1")); // should return true
console.log(validateIP("255.255.255.0")); // should return true
console.log(validateIP("0.0.0.0")); // should return true
console.log(validateIP("256.0.0.0")); // should return false
console.log(validateIP("192.168.0")); // should return false

//////////////////////////////4////////////////////////////

// Write a program to sort the given array of numbers in ascending order. Return the sorted array. Initial array size will be a maximum of 500 elements.
function sortArray(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  // Use a stack to keep track of subarrays to be sorted
  const stack = [[0, arr.length - 1]];
  while (stack.length) {
    const [left, right] = stack.pop();
    if (left >= right) {
      continue;
    }
    // Choose a pivot element and partition the subarray around it
    const pivot = arr[Math.floor(Math.random() * (right - left + 1)) + left];
    let i = left;
    let j = right;
    while (i <= j) {
      while (arr[i] < pivot) {
        i++;
      }
      while (arr[j] > pivot) {
        j--;
      }
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }
    // Push the left and right subarrays onto the stack
    stack.push([left, j]);
    stack.push([i, right]);
  }
  return arr;
}

// Generate an array of 50000 random numbers and test the performance of the sortArray function
const arr = Array.from({ length: 50000 }, () =>
  Math.floor(Math.random() * 100000)
);

console.time("sortArray");
sortArray(arr);
console.timeEnd("sortArray");

// Create test script covering all scenarios (min 5 test cases)
// Test cases for different input arrays
// Test case 1: Sort an array of 5 elements in ascending order
const arr1 = [5, 3, 1, 4, 2];
const expected1 = [1, 2, 3, 4, 5];
const result1 = sortArray(arr1);
console.log(JSON.stringify(result1) === JSON.stringify(expected1)); // should return true

// Test case 2: Sort an array of 1 element
const arr2 = [1];
const expected2 = [1];
const result2 = sortArray(arr2);
console.log(JSON.stringify(result2) === JSON.stringify(expected2)); // should return true

// Test case 3: Sort an array of 500 elements in descending order
const arr3 = Array.from({ length: 500 }, (_, i) => 500 - i);
const expected3 = Array.from({ length: 500 }, (_, i) => i + 1);
const result3 = sortArray(arr3);
console.log(JSON.stringify(result3) === JSON.stringify(expected3)); // should return true

// Test case 4: Sort an array of 500 identical elements
const arr4 = Array.from({ length: 500 }, () => 1);
const expected4 = Array.from({ length: 500 }, () => 1);
const result4 = sortArray(arr4);
console.log(JSON.stringify(result4) === JSON.stringify(expected4)); // should return true

// Test case 5: Sort an empty array
const arr5 = [];
const expected5 = [];
const result5 = sortArray(arr5);
console.log(JSON.stringify(result5) === JSON.stringify(expected5)); // should return true
